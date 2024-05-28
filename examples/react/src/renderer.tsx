import { reactRenderer } from '@terra/react'

export const renderer = reactRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
      </head>
      <body>{children}</body>
      {import.meta.env.PROD ? (
        <script type="module" src="/static/client.js" defer async></script>
      ) : (
        <script type="module" src="/src/client.ts" defer async></script>
      )}
    </html>
  )
})
