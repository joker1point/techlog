"""CI 门禁入口（pages.yml 前置步骤）：对 push 变更的 mdx 跑两类检查。

分流口径（与 faq/writing-standards.md 一致）：
  - 机械检查（check_blog_post）：**所有变更**的 mdx（新增/修改/重命名）——失败即红，拦部署。
  - 图文密度（check_blog_figures）：**新增**的 mdx 强制（失败拦）；**修改**的 mdx 只打
    GitHub ::warning:: 提醒（存量欠账不追溯、不拦人）。
  - before/after 不可用（手动触发 / 首推 / 浅克隆）时降级：全量机械检查 + 密度跳过。

用法：
  python scripts/ci_check.py --before <sha> --after <sha>    # CI：git diff 变更集
  python scripts/ci_check.py --files a.mdx b.mdx             # 本地自查：两查全跑、全强制
"""
import argparse
import subprocess
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_blog_post import BLOG_DIR, ROOT, check as check_post
from check_blog_figures import check as check_figures


def git_diff_entries(before: str, after: str) -> list:
    """返回 [(status, 相对路径)]，只含 data/blog 下 .mdx。status 取 A/M/R（D 已过滤）。"""
    out = subprocess.run(
        ["git", "diff", "--name-status", "-M", "--diff-filter=d",
         before, after, "--", "data/blog"],
        capture_output=True, text=True, encoding="utf-8", check=True, cwd=str(ROOT),
    ).stdout
    entries = []
    for line in out.splitlines():
        parts = line.split("\t")
        if len(parts) < 2:
            continue
        status, path = parts[0][0], parts[-1]      # rename 行（R100\told\tnew）取新路径
        if path.endswith(".mdx"):
            entries.append((status, path))
    return entries


def check_diff(entries: list) -> int:
    changed = [p for s, p in entries if s in "AMR"]
    added = [p for s, p in entries if s == "A"]
    if not changed:
        print("本次 push 无变更的 data/blog/*.mdx —— 检查通过")
        return 0
    print(f"变更 mdx：{len(changed)} 篇（其中新增 {len(added)} 篇）")

    fails = 0
    for p in changed:                              # 机械检查：变更全查
        fails += check_post(ROOT / p)
    for p in changed:                              # 密度检查：新增强制 / 修改只警告
        if p in added:
            fails += check_figures(ROOT / p)
        elif check_figures(ROOT / p) != 0:
            print(f"::warning file={p}::图文密度未达新规范（存量欠账，不拦截；建议改版时补齐）")

    tag = "❌ 有问题需处理" if fails else "✅ 全部通过"
    print(f"\n{'=' * 66}\nCI 检查合计：变更 {len(changed)} 篇 / 新增 {len(added)} 篇 / 失败项 {fails} —— {tag}")
    return 1 if fails else 0


def check_all_report() -> int:
    files = sorted(BLOG_DIR.glob("*.mdx"))
    print(f"⚠️ 无法取得 push 前基线（手动触发/首推/浅克隆）→ 降级："
          f"全量机械检查 {len(files)} 篇（密度检查跳过——无法区分新增/存量）")
    fails = sum(check_post(p) for p in files)
    tag = "❌ 需处理" if fails else "✅ 全部通过"
    print(f"\n{'=' * 66}\n全量机械检查：{len(files)} 篇 / 问题 {fails} 项 —— {tag}")
    return 1 if fails else 0


def check_files(explicit: list) -> int:
    fails = 0
    for p in explicit:
        fails += check_post(p)
        fails += check_figures(p)
    tag = "❌ 需处理" if fails else "✅ 全部通过"
    print(f"\n{'=' * 66}\n本地自查：{len(explicit)} 篇 / 失败项 {fails} —— {tag}")
    return 1 if fails else 0


def main() -> int:
    ap = argparse.ArgumentParser(description="TechLog CI 门禁 / 本地自查入口")
    ap.add_argument("--before", default="", help="push 前 sha（CI 传入 github.event.before）")
    ap.add_argument("--after", default="", help="push 后 sha（CI 传入 github.sha）")
    ap.add_argument("--files", nargs="*", help="显式文件列表（本地自查；两查全跑全强制）")
    a = ap.parse_args()

    if a.files:
        return check_files([Path(f) for f in a.files])
    if not a.before or not a.after or set(a.before) == {"0"} or set(a.after) == {"0"}:
        return check_all_report()
    try:
        entries = git_diff_entries(a.before, a.after)
    except subprocess.CalledProcessError as e:
        print(f"⚠️ git diff 失败（{e.stderr or e}）→ 降级为全量机械检查")
        return check_all_report()
    return check_diff(entries)


if __name__ == "__main__":
    sys.exit(main())
