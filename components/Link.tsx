/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'

// CloudStudio static server does NOT support clean URLs (no auto .html resolution).
// In production builds we append .html to internal links so the server can locate
// the actual static files (e.g. /about.html instead of /about).
const isStaticExport = process.env.NODE_ENV === 'production'

const CustomLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    // Append .html for static export, but keep root '/' as-is.
    const resolved = isStaticExport && href !== '/' ? href + '.html' : href
    return <Link className="break-words" href={resolved} {...rest} />
  }

  if (isAnchorLink) {
    return <a className="break-words" href={href} {...rest} />
  }

  return (
    <a className="break-words" target="_blank" rel="noopener noreferrer" href={href} {...rest} />
  )
}

export default CustomLink
