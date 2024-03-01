// 검색 기능부분에서 현재는 타이핑을 할때마다 즉, 한 글자씩 칠때 마다 데이터가 전송이 되는데 useDebounce를 사용하면 글자를 완전히 쳤을 때 데이터가 전송이 되면서 좀 더 효율성을 높일 수 있다.
import { useState, useEffect } from 'react'

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  // setTimeout 호출 도중에 value나 delay가 바뀌어서 다시 호출되면 clearTimeout으로 없애준다.
  // 예를 들어, 사용자가 1,2를 입력해서 넘겨줄려다가 그 사이에 3,4를 입력하게 되면 기존에 있던 1,2만 넘길려는 데이터를 clearTimeout으로 없애버리고 새롭게 들어온 1,2,3,4를 넘겨줘야 하기 때문이다.
  // 다시 실행이 되려면, value나 delay값이 바뀌어야 해서 [value, delay]로 지정해준다.
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay]
  )
  return debouncedValue
}