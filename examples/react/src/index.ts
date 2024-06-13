import { Server } from '@terra/islands'
import { renderer } from './renderer.js'
// import routes
import routes from 'virtual:terra-routes'

const app = new Server()

// non-HTML output (API) should go here

// HTML rendered output
app.use(renderer)
app.registerRoutes(routes)

export default app
