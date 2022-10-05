import type { AppProps } from 'next/app'
import NextLink from "next/link"
import { ReactNode } from 'react'
import '../styles/globals.css'
import { trpc } from '../util/trpc'

export function Link({
  to,
  children,
  disablePrefetch = false,
}: {
  to: string
  children: ReactNode
  /**
   * By default, Next.js' links will be prefetched when they come into viewport or when they're hovered.
   */
  disablePrefetch?: boolean
}): JSX.Element {
  return disablePrefetch ? (
    <a href={to}>
      <div className="cursor-pointer">{children}</div>
    </a>
  ) : (
    <NextLink href={to}>
      <div className="cursor-pointer">{children}</div>
    </NextLink>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return   <main className="h-full">
  <Link to="/">Home</Link>
  <Link to="/test/userid123">Test 1</Link>
  <Component {...pageProps} />
</main>
}

export default trpc.withTRPC(MyApp)