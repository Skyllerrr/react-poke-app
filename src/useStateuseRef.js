import logo from './logo.svg'
import './App.css'
import React, { useState, useRef, useEffect } from 'react'

// useRef 란?
// 1. 변수 관리를 할 때 사용
// 2. 특정 DOM을 선택 할 때 사용

// useState는 state가 변하면 컴포넌트가 다시 렌더링 되지만, useRef의 ref는 렌더링이 되지 않는다.
  
// ex) const ref =  useRef(안녕하세요)
// { current: value }
// ref.current === '안녕하세요'


const App = () => {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState('')
  const countRef = useRef(0)

  // let 변수를 사용하면, 컴포넌트가 다시 랜더링 될 때 숫자값이 초기화가 된다. (예를 들어, countVariable 값을 5까지 + 시켜준다음에 다른 작업(State를 누름)을 진행한 후, 다시 Variable을 누르면(다시 랜더링 시킴) Variable의 5까지 올라간 값이 0으로 초기화가 된다.)
  let countVariable = 0


  // 종속성 배열이 없으면(뒤에 , []를 없애면), 어떤 state든 변경될 때 useEffect가 실행 (버튼을 누르던, 밑에 input창에 채팅을 하나씩 치던 useEffect안의 내용이 실행됨)
  // 따라서, 몇번 랜더링이 되었는지 useRef와 useEffect의 종속성 배열 제거를 통해 알 수 있다.
  const renderCountRef = useRef(0)

  useEffect(() => {
    renderCountRef.current++;
  })
  

  const increaseRef = () => {
    countRef.current++;
    console.log("Ref + :", countRef.current)
  }

  const increaseState = () => {
    setCount(prev => prev + 1)
  }

  const increaseVariable = () => {
    countVariable++;
    console.log("Var + :", countVariable)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Ref {countRef.current}</p>
        <p>State {count}</p>
        <p>Variable {countVariable}</p>
        <p>I rendered {renderCountRef.current} times</p>

        <input onChange={(e) => setValue(e.target.value)} value={ value} />

        <div>
          <button onClick={increaseRef}>Ref +</button>
          <button onClick={increaseState}>State +</button>
          <button onClick={increaseVariable}>Variable +</button>
        </div>
      </header>
    </div>
  )
}

export default App