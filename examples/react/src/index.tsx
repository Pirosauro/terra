import { Hono } from 'hono'
import { registerRoutes } from '@terra/islands'
import { renderer } from './renderer.jsx'

// import routes
import routes from 'virtual:terra-routes'

const app = new Hono()

// non-HTML output (API) should go here

// HTML rendered output
app.use(renderer)

registerRoutes(app, routes)

export default app
