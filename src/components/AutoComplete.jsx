import React, { useState } from 'react'

const AutoComplete = ({ allPokemons, setDisplayedPokemons }) => {
  const [searchTerm, setSearchTerm] = useState("")
  
  // 모두 소문자로 만들어주는데, 이것이 모든 포켓몬 데이터에서 사용자가 검색한 이름이 포함이 되면 화면에 보여주고 아니면, 빈 배열을 보여준다. (예를 들어, 피카츄인 pikachu를 모두 타이핑하지 않고, pika만 타이핑해도 피카츄가 나오게끔 한다.)
  const filterNames = (input) => {
    const value = input.toLowerCase()
    return value ? allPokemons.filter((e) => e.name.includes(value)) : []
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // 빈칸들을 지워줌
    let text = searchTerm.trim()
    // 검색결과에 맞는 포켓몬을 filterNames()라는 함수로 화면에 띄워줌
    setDisplayedPokemons(filterNames(text))
    // 검색을 하게 되면 다시 빈칸으로 만들어줌
    setSearchTerm('')
  }

  
  const CheckEqualName = (input) => {
    const filteredArray = filterNames(input)
    
    return filteredArray[0]?.name === input ? [] : filteredArray
  }

  return (
    <div className='relative z-50'>
        <form
            onSubmit={handleSubmit}
            className='relative flex justify-center items-center w-[20.5rem] h-6 rounded-lg m-auto'
          >
            <input
              
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='text-xs w-[20.5rem] h-6 px-2 py-1 bg-[hsl(214,13%,47%)] rounded-lg text-gray-300 text-center'
            />
            <button
              type='submit'
              className='text-xs bg-slate-900 text-slate-300 w-[2.5rem] h-6 px-2 py-1 rounded-r-lg text-center absolute right-0 hover:bg-slate-700'    
            >
              검색
            </button>
        </form>
        {CheckEqualName(searchTerm).length > 0 && (
          <div
            className={
              `w-full flex bottom-0 h-0 flex-col absoulte justify-center items-center translate-y-2`
            }
          >
            <div className={
              `w-0 h-0 bottom-0 border-x-transparent border-x-8 border-b-[8px] border-gray-700 -translate-y-1/2`
            }>
            </div>
          
            <ul
              className={
                `w-40 max-h-[134px] py-1 bg-gray-700 rounded-lg absolute top-0 overflow-auto scrollbar-none`
              }
            >
            {CheckEqualName(searchTerm).map((e, i) => (
              <li key={`button-${i}`}>
                <button
                  onClick={() => setSearchTerm(e.name)}
                  className={
                    `text-base w-full hover:bg-gray-600 p-[2px] text-gray-100`
                  }
                >
                  {e.name}
                </button>
              </li>
            ))}
            </ul>

          </div>
        )}


        </div>
  )
}

export default AutoComplete