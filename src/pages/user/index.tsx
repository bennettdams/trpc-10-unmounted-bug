import { createProxySSGHelpers } from '@trpc/react/ssg'
import type { GetStaticProps, NextPage } from 'next'
import superjson from 'superjson'
import { createContextTRPC } from '../../server/context-trpc'
import { appRouter } from '../../server/routers/_app'
import { trpc } from '../../util/trpc'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextTRPC(),
    transformer: superjson,
  })
  await ssg.user.byUserId.prefetch({ userId: '123' })

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
