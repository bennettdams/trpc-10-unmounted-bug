import type { AppProps } from 'next/app'
import Link from 'next/link'
import '../styles/globals.css'
import { trpc } from '../util/trpc'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="h-full">
      <span
        style={{ background: 'lightgrey', margin: '20px', padding: '10px' }}
      >
        <Link href="/">Home</Link>
      </span>
      <span
        style={{ background: 'lightgrey', margin: '20px', padding: '10px' }}
      >
        <Link href="/user">Static subroute</Link>
      </span>
      <span
        style={{ background: 'lightgrey', margin: '20px', padding: '10px' }}
      >
        <Link href="/user/123">Dynamic subroute</Link>
      </span>

      {/* OPTION 1: Not wrapped in div */}
      <Component {...pageProps} />

      {/* OPTION 2: Wrapped in div */}
      {/* <div>
        <Component {...pageProps} />
      </div> */}
    </main>
  )
}

export default trpc.withTRPC(MyApp)
