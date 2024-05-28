import type { Plugin } from 'vite'
import { resolve } from 'node:path'
import { fdir } from 'fdir'

type Options = {
  path?: string
}

export const terraRoutes = (options?: Options): Plugin => {
  const virtualModuleId = 'virtual:terra-routes'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  const path = options?.path || './src/views'
  const routes = new fdir()
    .withRelativePaths()
    .withMaxDepth(10)
    .crawl(path)
    .sync()

  console.log(`[terra] ${routes.length} routes found`)

  return {
    name: '@terra/vite-routes',

    resolveId(id) {
      if (id.startsWith(virtualModuleId)) {
        const route = id.substring(virtualModuleId.length)

        // resolve esplicit route
        if (route) {
          return {
            external: false,
            id: resolve(path + route),
          }
        }

        return '\0' + id
      }
    },

    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const code: string[] = []

        code.push(...routes.map((r, i) => `import r${i.toString(16)} from '${virtualModuleId}/${r}'`))
        code.push('export default {')
        code.push(...routes.map((r, i) => `'${r.substring(0, r.lastIndexOf('.'))}': r${i.toString(16)},`))
        code.push('}')

        return code.join("\n")
      }
    },
  }
}
