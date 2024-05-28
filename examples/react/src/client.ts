import { createClient } from '@terra/islands/client'
import react from '@terra/react'

// import islands
import islands from 'virtual:terra-islands'

createClient({
  islands,
  integrations: {
    react,
  },
})
