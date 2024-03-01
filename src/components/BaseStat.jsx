import React, { useRef, useEffect } from 'react'

const BaseStat = ({ valueStat, nameStat, type }) => {
  const bg = `bg-${type}`

  // useRef 란?
  // 1. 변수 관리를 할 때 사용
  // 2. 특정 DOM을 선택 할 때 사용

  // useState는 state가 변하면 컴포넌트가 다시 렌더링 되지만, useRef의 ref는 렌더링이 되지 않는다.
  
  // ex) const ref =  useRef(안녕하세요)
  // { current: value }
  // ref.current === '안녕하세요'
  const ref = useRef()

  useEffect(() => {
    const setValueStat = ref.current
    const calc = valueStat * (100 / 255)
    setValueStat.style.width = calc + '%'
  }, [])

  return (
    <tr className='w-full text-white'>
      <td className='sm:px-5'>{nameStat}</td>
      <td className='px-2 sm:px-3'>{valueStat}</td>
      <td>
        <div
          className={
            `flex items-start h-2 min-w-[10rem] overflow-hidden rounded bg-gray-600`
          }
        >
          <div ref={ref} className={`h-3 ${bg}`}></div>
        </div>
      </td>
      <td className='px-2 sm:px-5'>255</td>
    </tr>
  )
}

export default BaseStat