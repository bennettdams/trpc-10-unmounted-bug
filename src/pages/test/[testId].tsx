import { createProxySSGHelpers } from '@trpc/react/ssg'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import superjson from 'superjson'
import { createContextTRPC } from '../../server/context-trpc'
import { appRouter } from '../../server/routers/_app'
import { trpc } from '../../util/trpc'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // TODO most popular users
    paths: [
      // { params: { id: '1' } },
      // { params: { id: '2' } }
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if(!params) throw new Error("Wrong param type")
    
    const userId = params.testId
    
    if(typeof userId !== "string") throw new Error("Wrong param type")
    
    const ssg = createProxySSGHelpers({
      router: appRouter,
      ctx: await createContextTRPC(),
      transformer: superjson,
    })
     await ssg.user.byUserId.prefetch({ userId })

    return {
      props: {
        trpcState: ssg.dehydrate(),
      },
      revalidate: 5 * 60,
    }
}

const Home: NextPage = () => {
  const { data, isLoading, isError } = trpc.user.byUserId.useQuery(
    { userId: 'userid123' },
  )
  return (
    <div>test 1</div>
  )
}

export default Home
