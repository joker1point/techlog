import Image from './Image'
import Link from './Link'

const badgeTones = {
  green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',
  blue: 'bg-sky-50 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300',
  amber: 'bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',
  gray: 'bg-gray-100 text-gray-600 dark:bg-gray-500/15 dark:text-gray-300',
}

type CardProps = {
  title: string
  description: string
  badge?: string
  badgeTone?: keyof typeof badgeTones
  repo?: string
  tags?: string[]
  links?: { label: string; href: string }[]
  note?: string
  imgSrc?: string
  imgAlt?: string
  term?: string[]
  /** 兼容旧用法：整卡的外链 */
  href?: string
}

const Card = ({
  title,
  description,
  badge,
  badgeTone = 'gray',
  repo,
  tags = [],
  links = [],
  note,
  imgSrc,
  imgAlt,
  term,
  href,
}: CardProps) => (
  <div className="w-full max-w-[544px] min-w-0 p-4 md:w-1/2">
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200/70 dark:border-gray-700/60">
      {imgSrc ? (
        <Image
          alt={imgAlt || title}
          src={imgSrc}
          width={1600}
          height={900}
          className="aspect-[16/9] w-full border-b border-gray-200/70 object-cover object-top dark:border-gray-700/60"
        />
      ) : term ? (
        <div className="flex aspect-[16/9] w-full flex-col justify-center gap-1.5 border-b border-gray-200/70 bg-gray-900 px-6 font-mono text-[12.5px] leading-relaxed dark:border-gray-700/60">
          {term.map((line) => (
            <span
              key={line}
              className={`truncate ${line.startsWith('$') ? 'text-gray-100' : 'text-gray-500'}`}
            >
              {line}
            </span>
          ))}
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl leading-8 font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          {badge && (
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${badgeTones[badgeTone]}`}
            >
              {badge}
            </span>
          )}
        </div>
        {repo && <p className="mt-1 font-mono text-xs text-gray-400 dark:text-gray-500">{repo}</p>}
        <p className="mt-3 text-[15px] leading-7 text-gray-600 dark:text-gray-400">{description}</p>
        {tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-[11.5px] text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium"
              aria-label={link.label}
            >
              {link.label} &rarr;
            </Link>
          ))}
          {links.length === 0 && note && (
            <span className="text-xs text-gray-400 dark:text-gray-500">{note}</span>
          )}
        </div>
      </div>
    </div>
  </div>
)

export default Card
