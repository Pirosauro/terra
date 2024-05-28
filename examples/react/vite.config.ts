import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import build from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { terraRoutes, terraIslands } from '@terra/islands/vite'

export default defineConfig(({ mode }) => {
  const alias = {
    '~': resolve(__dirname, './src'),
  }

  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: [
            './src/client.ts',
          ],
          output: {
            entryFileNames: 'static/client.js',
            chunkFileNames: 'static/assets/[name]-[hash].js',
            assetFileNames: 'static/assets/[name].[ext]',
          }
        },
        emptyOutDir: true,
      },
      resolve: {
        alias,
      },
      plugins: [
        terraIslands({
          framework: 'react',
        }),
      ],
    }
  }

  return {
    ssr: {
      external: ['react', 'react-dom'],
    },
    resolve: {
      alias,
    },
    plugins: [
      build(),
      devServer({
        adapter,
        entry: 'src/index.tsx'
      }),
      terraIslands({
        framework: 'react',
      }),
      terraRoutes(),
    ],
  }
})
