import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { trpc } from '../util/trpc'

const Home: NextPage = () => {
  // comment out fetching here to make the error go away
  const { data, isLoading, isError } = trpc.user.byUserId.useQuery({
    userId: '123',
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>Index page</main>
    </div>
  )
}

export default Home
