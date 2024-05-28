import type { Context } from 'hono'
import { withHydration } from '@terra/react'
import Counter from '~/components/counter.island.js'

// enable islands architecture
const CounterIsland = withHydration(Counter)

export default (ctx: Context) => ctx.render(
  <div>
    <div style={{ backgroundColor: 'aliceblue', padding: '20px' }}>
      <CounterIsland client:load count={10} />
    </div>
    <div style={{ backgroundColor: 'wheat', padding: '20px' }}>
      <CounterIsland client:idle count={20} />
    </div>
    <div style={{ backgroundColor: 'gold', padding: '20px' }}>
      <CounterIsland client:media="(max-width: 600px)" count={30} />
    </div>
    <div style={{ marginTop: '1000px', padding: '20px' }}>
      <CounterIsland client:visible count={30} />
    </div>
  </div>,
  { title: 'Terra | Hono renderer example' }
)
