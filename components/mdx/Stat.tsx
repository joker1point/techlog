/**
 * 单个数据点：大号 tabular-nums 数值 + 标签 + 可选注脚。
 * 必须放在 <StatGrid> 里（它提供分隔线与底色）。
 * 用法（MDX）：<Stat value="45%" label="短路省下的 token" note="三方对比实测" />
 */
export default function Stat({
  value,
  label,
  note,
}: {
  value: string
  label: string
  note?: string
}) {
  return (
    <div className="bg-white px-5 py-4 dark:bg-gray-950">
      <div className="font-mono text-[1.75rem] leading-none font-semibold tracking-tight text-gray-900 tabular-nums dark:text-gray-50">
        {value}
      </div>
      <div className="mt-2 text-[13px] font-medium text-gray-600 dark:text-gray-300">{label}</div>
      {note && (
        <div className="mt-1 text-[12.5px] leading-5 text-gray-500 dark:text-gray-400">{note}</div>
      )}
    </div>
  )
}
