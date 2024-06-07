import type { FC } from 'react'
import type { ClientDirective } from '@terra/islands/types'
import { getHydrationData } from '@terra/islands'

/**
 * Wrap the component into an island
 *
 * @param {FC<P>} Component - The component to wrap
 * @return {((props: P & ClientDirective) => JSX.Element)}
 */
export function withHydration<P>(Component: FC<P>): (props: P & ClientDirective) => JSX.Element {
  const island = (props: P & ClientDirective) => {
    const data = getHydrationData(Component, props)

    // not hydratable, render static
    if (!data.strategy) {
      return <Component {...data.props} />
    }

    // render
    return (
      <terra-island style={{ display: 'contents' }}>
        <Component {...data.props} />
        <script
          type="application/json"
          data-island
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        ></script>
      </terra-island>
    )
  }

  return island
}
