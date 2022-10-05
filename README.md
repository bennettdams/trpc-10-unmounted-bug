# Reproduction of tRPC (`v10`) bug

Steps:

1. npm i
2. npm run dev
3. Go to <http://localhost:3000>
4. Click on "Dynamic Subroute"
5. Error in console:
   ```
   Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
   at Home
   ```

Weird stuff, that will make the error go away (see `_app.tsx`):

- Adding an additional `<Link />`
- Wrapping the main component (`<Component {...pageProps} />`) in a div
