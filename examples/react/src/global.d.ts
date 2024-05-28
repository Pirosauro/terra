import type { Handler } from 'hono'
import type {} from 'react'
import type {} from '@terra/react'

declare module 'hono' {
  interface DefaultRenderer {
    (children: ReactElement, props?: Props): Promise<Response>
  }
}

declare module '@terra/react' {
  interface Props {
    title: string
  }
}

declare module 'virtual:terra-routes' {
  const routes: Record<string, Handler>

  export default routes
}
