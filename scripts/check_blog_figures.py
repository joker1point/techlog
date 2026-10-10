"""TechLog 文章图文密度检查（规范：faq/writing-standards.md，2026-10-10 起）。

2026-10-10 自 frontend-works/_deploy/_qa/ 迁入仓库：本地自查与 CI 门禁共用这一份。

规则：正文每 500 汉字至少 1 个合格视觉元素（下限 = ceil(汉字数 / 500)，不满 500 按 1 个计）。
  合格形态：Figure 组件引用（截图 / GIF / 图表）、mermaid 代码围栏、LabEmbed。
  不计：frontmatter、代码块（含 mermaid 块本身）、图注、Callout/Stat/StatGrid/PullQuote 等排版组件。

用法：
  python scripts/check_blog_figures.py <mdx 路径>
  python scripts/check_blog_figures.py --all        # 检查 data/blog 下全部（存量文章会大面积 FAIL，属预期）
"""
import argparse
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = ROOT / "data" / "blog"

CJK = re.compile(r"[\u4e00-\u9fff]")
FENCE = re.compile(r"```[\s\S]*?```")


def body_chars(text: str) -> int:
    """正文字符计数：去 frontmatter、去围栏代码块，只数汉字。"""
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            text = parts[2]
    text = FENCE.sub("\n", text)          # 代码块（含 mermaid）整体不计字
    return len(CJK.findall(text))


def count_figures(text: str) -> dict:
    return {
        "figure": len(re.findall(r"<Figure\b", text)),
        "mermaid": len(re.findall(r"```mermaid", text)),
        "lab": len(re.findall(r"<LabEmbed\b", text)),
    }


def check(p: Path) -> int:
    text = p.read_text(encoding="utf-8")
    zh = body_chars(text)
    need = max(1, -(-zh // 500))          # ceil(zh/500)，不满 500 按 1
    figs = count_figures(text)
    got = sum(figs.values())
    ok = got >= need

    print(f"\n{'=' * 66}\n{p.name}\n{'=' * 66}")
    print(f"[1] 正文字数    汉字 {zh} → 需视元素 {need} 个")
    detail = " + ".join(f"{k} {v}" for k, v in figs.items())
    print(f"[2] 视觉元素    {detail} = {got} 个")
    if ok:
        print(f"[3] 图文密度    ✅ PASS（富余 {got - need} 个）")
    else:
        print(f"[3] 图文密度    🔴 FAIL（缺 {need - got} 个；规范见 faq/writing-standards.md）")
    return 0 if ok else 1


def main() -> int:
    ap = argparse.ArgumentParser(description="TechLog 图文密度检查")
    ap.add_argument("mdx", nargs="?", help="mdx 路径")
    ap.add_argument("--all", action="store_true", help="检查 data/blog 全部文章")
    a = ap.parse_args()

    if a.all:
        files = sorted(BLOG_DIR.glob("*.mdx"))
        failed = [p for p in files if check(p) != 0]
        print(f"\n{'=' * 66}\n汇总：{len(files)} 篇，{len(failed)} 篇 FAIL"
              f"（存量不追溯，仅新文按规范执行）")
        return 0
    if not a.mdx:
        ap.print_help()
        return 2
    return check(Path(a.mdx))


if __name__ == "__main__":
    sys.exit(main())
