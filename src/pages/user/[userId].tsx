import { createProxySSGHelpers } from '@trpc/react/ssg'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import superjson from 'superjson'
import { createContextTRPC } from '../../server/context-trpc'
import { appRouter } from '../../server/routers/_app'
import { trpc } from '../../util/trpc'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) throw new Error('Wrong param type')

  const userId = params.userId

  if (typeof userId !== 'string') throw new Error('Wrong param type')

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextTRPC(),
    transformer: superjson,
  })

  // comment this out to also make the error go away
  await ssg.user.byUserId.prefetch({ userId })

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 5 * 60,
  }
}

const Home: NextPage = () => {
  const { data, isLoading, isError } = trpc.user.byUserId.useQuery({
    userId: '123',
  })
  return <div>test 1</div>
}

export default Home
