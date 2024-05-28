import type { FunctionComponent } from 'react'
import { useState } from 'react'
import style from './counter.module.css'

export type Props = {
  count: number
}

const Counter: FunctionComponent<Props> = (props) => {
  const [count, setCount] = useState(props.count)
  const onClickHandler = () => {
    const log = 'Click ' + count

    setCount(count + 1)
    console.log(log + ' -> ' + count)
  }

  return (
    <>
      <p className={style.counter}>Count: {count}</p>
      <button onClick={onClickHandler}>Increment</button>
    </>
  )
}

export default Counter
