import type { FunctionComponent, PropsWithChildren } from 'react'
import { useState } from 'react'
import { withHydration } from '@terra/react'
import Badge from './badge.island.js'
import style from './counter.module.css'

export type Props = {
  count: number
}

// test island inside island
const BadgeIsland = withHydration(Badge)

const Counter: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const [count, setCount] = useState(props.count)
  const onClickHandler = () => {
    const log = 'Click ' + count

    setCount(count + 1)
    console.log(log + ' -> ' + count)
  }

  return (
    <>
      <BadgeIsland client:load client="hydrated" server="SSR" />
      <p className={style.counter}>Count: {count}</p>
      <button onClick={onClickHandler}>Increment</button>
    </>
  )
}

export default Counter
