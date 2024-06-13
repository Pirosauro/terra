import { createClient } from '@terra/islands/client'
import react from '@terra/react'
// import islands
import islands from 'virtual:terra-islands'

const debug = false

createClient({
  debug,
  islands,
  integrations: {
    react,
  },
})
