import type { Hono, Env } from 'hono'
import type { H, NotFoundHandler, ErrorHandler } from 'hono/types'
const validMethods = [
  'get',
  'post',
  'put',
  'delete',
]

/**
 * Organize files
 *
 * @param {string[]} files - The list of files
 * @return {Promise<Record<string, string[]>>}
 */
const organizePaths = async (files: string[]): Promise<Record<string, string[]>> => {
  const result: Record<string, string[]> = {}

  // organize files by folder
  for (let i = 0; i < files.length; i++) {
    const path = files[i]
    const parts = path.split('/')
    const file = parts.pop()
    const directory = parts.join('/')

    if (!result[directory]) {
      result[directory] = []
    }

    if (file) {
      result[directory].push(file)
    }
  }

  // sort the files in each directory
  for (const [directory, file] of Object.entries(result)) {
    const sorted = file.sort(([a], [b]) => {
      if (a[0] === '[' && b[0] !== '[') {
        return 1
      }

      if (a[0] !== '[' && b[0] === '[') {
        return -1
      }

      return a.localeCompare(b)
    })

    result[directory] = sorted
  }

  return result
}

/**
 * Register routes
 *
 * @param {Hono<T>} app - The Hono instance
 * @param {Record<string, H | ErrorHandler>} routes - The routes resolver
 */
export const registerRoutes = async <T extends Env>(
  app: Hono<T>,
  routes: Record<string, H | ErrorHandler>
) => {
  let count = 0
  // organize files
  const paths = await organizePaths(Object.keys(routes))

  console.log("\u001B[34mRegistering routes\u001B[0m")

  for (const [directory, files] of Object.entries<string[]>(paths)) {
    for (let i = 0; i < files.length; i++) {
      const route = directory ? directory + '/' + files[i] : files[i]
      const handler = routes[route]
      // normalize file name
      const file = files[i].toLowerCase()
      let [partial, method = 'get'] = file.split('.')

      // custom 404 page
      if (directory === '' && partial === '_404') {
        app.notFound(handler as NotFoundHandler)
        console.log('404')

        count++

        continue
      }

      // error handling
      if (directory === '' && partial === '_500') {
        app.onError(handler as ErrorHandler)
        console.log('500')

        count++

        continue
      }

      // ignore files starting with underscore or invalid
      if (file.startsWith('_') || !method || !handler) continue

      // normalize method and allow file with extensions on path
      if (!validMethods.includes(method)) {
        partial = file
        method = 'get'
      }

      // remove "index" from URL
      if (partial === 'index') {
        partial = ''
      }

      partial = '/' + `${directory ? '/' + directory : ''}/${partial}`.replace(/^\/|\/$/g, '')

      app.on(method, partial, handler as H)
      console.log(method.toUpperCase(), partial)

      count++
    }
  }

  console.log("\u001B[33m[OK] " + count + " routes registered\u001B[0m")
}
