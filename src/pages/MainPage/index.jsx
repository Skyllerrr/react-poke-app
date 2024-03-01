import { useState, useEffect } from 'react'
import axios from 'axios'
import PokeCard from '../../components/PokeCard'
import AutoComplete from '../../components/AutoComplete'
//import { useDebounce } from './hooks/useDebounce'

function MainPage() {
  // 자동완성 검색기능(AutoComplete)을 만들기 위해 리팩토링
  // 기존에 있던 App.jsx는 Test.jsx에 있음

  // 모든 포켓몬 데이터를 가지고 있는 state
  const [allPokemons, setAllPokemons] = useState([])

  // 실제 리스트로 보여주는 포켓몬 데이터를 가지고 있는 state
  const [displayedPokemons, setDisplayedPokemons] = useState([])

  // 한번에 보여주는 포켓몬 수
  const limitNum = 20
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`

  //const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    fetchPokeData()
  }, [])

  /*
  useEffect(() => {
    handleSearchInput(debouncedSearchTerm)
  }, [debouncedSearchTerm])
  */
  
  const filterDisplayedPokemonData = (allPokemonsData, displayedPokemons = []) => {
    const limit = displayedPokemons.length + limitNum
    // 모든 포켓몬 데이터에서 limitNum 만큼 더 가져오기
    const array = allPokemonsData.filter((pokemon, index) => index + 1 <= limit)
    return array
  }
  
  
  const fetchPokeData = async () => {
    try {
      // 1008개의 포켓몬 데이터 받아오기
      const response = await axios.get(url)
      // 모든 포켓몬 데이터 기억하기
      setAllPokemons(response.data.results)
      // 실제로 화면에 보여줄 포켓몬 리스트 기억하는 state : 20개
      setDisplayedPokemons(filterDisplayedPokemonData(response.data.results))
    } catch (error) {
      console.error(error)
    }
  }

  // 검색 기능을 위한 함수
  // 검색 내용이 0보다 클 때(검색 할 때)의 결과와, 작을 때(검색 하지 않았을 때)의 결과를 나눠 정리한다.
  // 검색 할 때는 검색 결과에 따라 pokemon의 사진과 이름이 보여질 수 있도록 만든다.
  // 검색 하지 않았을 때는 원래 기존 화면(포켓몬 20개가 나오는 화면)으로 지정해준다.
  /*
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
  */

  return (
    <article className='pt-6'>
      <header className='flex flex-col gap-2 w-ful px-4 z-50'>
        <AutoComplete
          allPokemons={allPokemons}
          setDisplayedPokemons={setDisplayedPokemons}
        />
      </header>
      <section className='pt-6 flex flex-col justify-content items-center overflow-auto z-0'>
        <div className='flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl'>
          {displayedPokemons.length > 0 ?
            (
              displayedPokemons.map(({ url, name }, index) => (
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
        {/* 더 보기 버튼을 보여주려면 */}
        {/* 모든 포켓몬 수가 보여주고 있는 포켓몬 수보다 많고, 보여주는 게 하나일 때가 아니어야 함.(검색 결과를 볼 때) */}
        {/* 더 보기 버튼을 누를 때 마다 20개씩 추가 */}
        {(allPokemons.length > displayedPokemons.length) && (displayedPokemons.length !== 1) &&
          (
            <button
                onClick={() => setDisplayedPokemons(filterDisplayedPokemonData(allPokemons, displayedPokemons))}
                className='bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white'>
                더 보기
            </button>
          )
        }
      </div>
    </article>
  )
}

export default MainPage
