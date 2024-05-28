declare module 'virtual:terra-island' {
  const islands: Record<string, () => Promise<unknown>>

  export default islands
}

declare module 'virtual:terra-routes' {
  const routes: Record<string, Handler>

  export default routes
}
