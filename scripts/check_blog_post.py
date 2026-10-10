"""TechLog 文章上线前检查（MDX 陷阱 + 泄漏扫描）。

2026-10-10 自 frontend-works/_deploy/_qa/ 迁入仓库：本地自查与 CI 门禁
（pages.yml 前置步骤）共用这一份，规则单一来源。
组件白名单动态跟随 components/MDXComponents.tsx——加新语义组件无需手动同步。

为什么需要它 —— 每一条都是真会踩的：
  1. **CRLF**：博客 .mdx 惯例是纯 LF（既有文章全部如此）。Windows 上写文件
     默认 CRLF，直接提交会和 prettier 打架。
  2. **裸的 `<tag>` 会被 MDX 当 JSX 解析** —— 正文里写一句「HTML 里有 <p> 标签」
     就能让整站构建失败。所有尖括号内容必须包在反引号里。
  3. **裸 `{` `}` 会被当表达式**。
  4. **围栏代码块必须成对**。
  5. **泄漏扫描**：对外材料不能含服务器 IP / 路径 / 凭据（本项目的既定纪律）。

用法：
  python scripts/check_blog_post.py <mdx 路径>
  python scripts/check_blog_post.py --all                    # 检查 data/blog 下全部文章（报告模式）
  python scripts/ci_check.py --before <sha> --after <sha>    # CI 门禁：只查变更文章
"""
import argparse
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = ROOT / "data" / "blog"

LEAK_RULES = [
    ("公网 IP", r"\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b"),
    ("服务器路径", r"/root/|/home/|C:\\\\Users|/etc/|/var/"),
    ("SSH/密钥", r"\.pem|id_ed25519|IdentityFile|paramiko"),
    # 只认「赋值形态」，且排除占位符：实测宽松规则有两类误报 ——
    # ① 讨论 "API Key" 这个概念的文章（2 篇）；② 文档里的 `TOKEN="<token>"`。
    # ⚠️ 前瞻必须放在可选引号**之前** —— 否则量词会回溯：引擎放弃匹配引号，
    # 前瞻看到的就是 `"` 而不是 `<`，占位符照样命中（踩过）。
    ("凭据赋值", r"(?:API[_ ]?KEY|SECRET|PASSWORD|TOKEN)\s*[:=]\s*"
                 r"(?![\"']?(?:<|\*|x{3,}|your_|\.\.\.))[\"']?\S{8,}"),
    ("sk- 密钥", r"sk-[A-Za-z0-9]{16,}"),
    ("内部代号", r"users\.db|interest_log|chroma_persist|_backup_chroma"),
]

# 内嵌快照（2026-10-10）：仅在 MDXComponents.tsx 解析失败时兜底，正常情况不参与。
FALLBACK_KNOWN = [
    "BlogNewsletterForm", "Callout", "CustomLink", "Figure", "Image", "LabEmbed",
    "Mermaid", "Pre", "PullQuote", "Stat", "StatGrid", "TableWrapper", "TOCInline",
]


def load_known_components() -> list:
    """从 components/MDXComponents.tsx 解析全部 default import 的组件名（单一来源）。

    历史：白名单曾手写维护（2026-10-10 首篇用组件的文章触发误报后加入），
    同日对账发现已与注册表漂移（缺 CustomLink/TableWrapper）——改为动态解析：
    注册表即白名单，加新组件自动跟随。
    """
    src = ROOT / "components" / "MDXComponents.tsx"
    try:
        text = src.read_text(encoding="utf-8")
    except OSError as e:
        print(f"⚠️ 读取 {src} 失败（{e}）→ 使用内嵌快照白名单", file=sys.stderr)
        return list(FALLBACK_KNOWN)
    names = sorted(set(re.findall(r"^import\s+([A-Z][A-Za-z0-9]*)\s+from\s+['\"]", text, re.M)))
    if not names:
        print(f"⚠️ 未从 {src} 解析到组件导入 → 使用内嵌快照白名单", file=sys.stderr)
        return list(FALLBACK_KNOWN)
    return names


# 已注册的 MDX 语义组件：正文里合法，不算"危险内容"（2026-10-10 起动态解析）。
KNOWN_RE = r"</?(?:" + "|".join(load_known_components()) + r")\b"


def check(p: Path) -> int:
    raw = p.read_bytes()
    text = raw.decode("utf-8", "replace")
    lines = text.split("\n")
    print(f"\n{'=' * 66}\n{p.name}  ({len(raw)} B / {len(lines)} 行)\n{'=' * 66}")

    fails = 0

    crlf = raw.count(b"\r\n")
    print(f"[1] 行尾            CRLF={crlf} → {'✅ 纯 LF' if crlf == 0 else '🔴 必须转 LF'}")
    fails += 1 if crlf else 0

    in_fence, probs = False, []
    for i, line in enumerate(lines, 1):
        s = line.strip()
        if s.startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        nocode = re.sub(r"`[^`]*`", "", line)     # 行内代码里的尖括号是安全的
        for m in re.finditer(r"<[A-Za-z/][^>]*>", nocode):
            if re.match(KNOWN_RE, m.group(0)):
                continue                          # 已注册组件标签，放行
            probs.append((i, "疑似 JSX 标签", m.group(0)[:40]))
        # JSX 属性里的 {} 是合法语法（如 width={820}）：纯属性行、
        # 或含已注册组件标签的行，整行放行大括号检查（2026-10-10 校准）
        is_attr_line = re.match(r"^\s*[\w-]+=\{[^{}]*\}\s*$", line) is not None
        if not (is_attr_line or re.search(KNOWN_RE, line)):
            for m in re.finditer(r"[{}]", nocode):
                probs.append((i, "裸大括号", m.group(0)))
    print(f"[2] MDX 危险内容    {len(probs)} 处 → {'✅' if not probs else '🔴'}")
    for ln, k, h in probs[:10]:
        print(f"      L{ln}: {k} {h!r}")
        print(f"           {lines[ln - 1].strip()[:90]}")
    fails += 1 if probs else 0

    fences = sum(1 for l in lines if l.strip().startswith("```"))
    print(f"[3] 围栏代码块      {fences} → {'✅ 成对' if fences % 2 == 0 else '🔴 不成对'}")
    fails += 1 if fences % 2 else 0

    fm = text.split("---")[1] if text.startswith("---") else ""
    missing = [k for k in ("title:", "date:", "tags:", "draft:", "summary:") if k not in fm]
    print(f"[4] frontmatter     {'✅ 齐全' if not missing else '🔴 缺 ' + str(missing)}")
    fails += 1 if missing else 0

    leaks = []
    for name, pat in LEAK_RULES:
        for m in re.finditer(pat, text, re.I):
            leaks.append((text[:m.start()].count("\n") + 1, name, m.group(0)))
    print(f"[5] 泄漏扫描        {len(leaks)} 处 → {'✅' if not leaks else '⚠️ 人工确认'}")
    for ln, name, h in leaks[:10]:
        print(f"      L{ln} [{name}] {h!r}")
    fails += 1 if leaks else 0

    print(f"\n结论: {'✅ 通过' if fails == 0 else f'🔴 {fails} 项需处理'}")
    return fails


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("path", nargs="?")
    ap.add_argument("--all", action="store_true")
    a = ap.parse_args()
    if a.all:
        total = sum(check(p) for p in sorted(BLOG_DIR.glob("*.mdx")))
        print(f"\n{'=' * 66}\n全部文章合计问题项: {total}")
        return 0
    if not a.path:
        return sys.exit("用法: check_blog_post.py <mdx 路径> | --all")
    return 0 if check(Path(a.path)) == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
