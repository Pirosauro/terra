import type { Context } from 'hono'
import { withHydration } from '@terra/react'
import Counter from '~/components/counter.island.js'
import User from '~/components/user.island.js'

// enable islands architecture
const CounterIsland = withHydration(Counter)
const UserIsland = withHydration(User)

export default (ctx: Context) => ctx.render(
  <div>
    <div style={{ backgroundColor: 'aquamarine', padding: '20px' }}><UserIsland client:load /></div>
    <div style={{ padding: '30px 5px 5px' }}>This island is hydrated on <b>load</b></div>
    <div style={{ backgroundColor: 'aliceblue', padding: '20px' }}>
      <CounterIsland client:load count={10} />
    </div>
    <div style={{ padding: '30px 5px 5px' }}>This island is hydrated on <b>idle</b></div>
    <div style={{ backgroundColor: 'wheat', padding: '20px' }}>
      <CounterIsland client:idle count={20} />
    </div>
    <div style={{ padding: '30px 5px 5px' }}>This island is hydrated on <b>screen size &lt;= 600px</b>. Resize the screen to hydrate</div>
    <div style={{ backgroundColor: 'gold', padding: '20px' }}>
      <CounterIsland client:media="(max-width: 600px)" count={30} />
    </div>
    <div style={{ padding: '30px 5px 5px', lineHeight: '1.5em' }}>This island is hydrated on <b>visible</b>. Scroll down to see it <span style={{ fontSize: '1.5em', lineHeight: '1em' }}>&darr;</span></div>
    <div style={{ marginTop: '1000px', padding: '20px' }}>
      <CounterIsland client:visible count={30} />
    </div>
  </div>,
  { title: 'Terra | Hono renderer example' }
)
