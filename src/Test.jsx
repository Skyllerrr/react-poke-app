import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import PokeCard from './components/PokeCard'
import { useDebounce } from './hooks/useDebounce'

function App() {
  const [pokemons, setPokemons] = useState([])
  // offset - 처음 개수, limit - 최대 개수
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(20)
  const [searchTerm, setSearchTerm] = useState("")

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    fetchPokeData(true) 
  }, [])

  useEffect(() => {
    handleSearchInput(debouncedSearchTerm)
  }, [debouncedSearchTerm])
  
  
  const fetchPokeData = async (isFirstFetch) => {
    try {
      // isFirstFetch가 true면 0개 추가, 아니면 기존의 개수 + 20개씩 추가
      const offsetValue = isFirstFetch ? 0 : offset + limit
      const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offsetValue}`
      const response = await axios.get(url)
      //console.log(response.data.results)
      // 기존의 pokemons배열에 20개씩 추가되는 포켓몬들 나열
      setPokemons([...pokemons, ...response.data.results])
      setOffset(offsetValue)
    } catch (error) {
      console.error(error)
    }
  }

  // 검색 기능을 위한 함수
  // 검색 내용이 0보다 클 때(검색 할 때)의 결과와, 작을 때(검색 하지 않았을 때)의 결과를 나눠 정리한다.
  // 검색 할 때는 검색 결과에 따라 pokemon의 사진과 이름이 보여질 수 있도록 만든다.
  // 검색 하지 않았을 때는 원래 기존 화면(포켓몬 20개가 나오는 화면)으로 지정해준다.
  const handleSearchInput = async (searchTerm) => {
    if (searchTerm.length > 0) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
        const pokemonData = {
          url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
          name: searchTerm
        }
        setPokemons([pokemonData])
      } catch (error) {
        setPokemons([])
        console.error(error)
      }
    } else {
      fetchPokeData(true)
    }
  }

  return (
    <article className='pt-6'>
      <header className='flex flex-col gap-2 w-ful px-4 z-50'>
        <div className='relative z-50'>
        <form
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
        </div>
      </header>
      <section className='pt-6 flex flex-col justify-content items-center overflow-auto z-0'>
        <div className='flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl'>
          {pokemons.length > 0 ?
            (
              pokemons.map(({ url, name }, index) => (
                <PokeCard key={url} url={url} name={name}/>
              ))
            ) :
            (
              <h2 className='font-medium text-lg text-slate-900 mb-1'>
                포켓몬이 없습니다.
              </h2>
            )}
        </div>
      </section>
            <div className='text-center'>
              <button
                onClick={() => fetchPokeData(false)}
                className='bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white'>
                더 보기
              </button>
            </div>

    </article>
  )
}

export default App
