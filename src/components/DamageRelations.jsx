import { useState, useEffect } from 'react'
import Type from './Type'

// 포켓몬 간의 Damage관계 데이터
const DamageRelations = ({ damages }) => {
  //console.log(damages)

  const [damagePokemonForm, setDamagePokemonForm] = useState()
  console.log(damagePokemonForm)

  useEffect(() => { 
    const arrayDamage = damages.map((damage) => 
      separateObjectBetweenToAndFrom(damage))
    //console.log(arrayDamage)
    
    if (arrayDamage.length === 2) {
      // 합치는 부분
      const obj = joinDamageRelations(arrayDamage)
      setDamagePokemonForm(reduceDuplicateValues(postDamageValue(obj.from)))
      postDamageValue(obj.from)
    } else {
      setDamagePokemonForm(postDamageValue(arrayDamage[0].from))
    }
    
  }, [])

  const joinDamageRelations = (props) => {
    return {
      to: joinObjects(props, 'to'),
      from: joinObjects(props, 'from')
    }
  }

  const reduceDuplicateValues = (props) => {
    
    const duplicateValues = {
      double_damage: '4x',
      half_damage: '1/4x',
      no_damage: '0x'
    }

    return Object.entries(props)
      .reduce((acc, [key, value]) => {
        const keys = key
        //console.log([key, value])

        const verifiedValue = filterForUniqueValues(
          value,
          duplicateValues[keys]
        )

        return (acc = {[key]: verifiedValue, ...acc})
      }, {})
  }

  const filterForUniqueValues = (valueForFiltering, damageValue) => {

    return valueForFiltering.reduce((acc, currentValue) => {
      const { url, name } = currentValue
      //console.log(url, name)

      const filterACC = acc.filter((a) => a.name !== name)
      
      return filterACC.length === acc.length
        ? (acc = [currentValue, ...acc])
        : (acc = [{damageValue: damageValue, name, url}, ...filterACC])
    }, [])
  }

  const joinObjects = (props, string) => {
    const key = string
    const firstArrayValue = props[0][key]
    const secondArrayValue = props[1][key]
    //console.log('props', props)
    //console.log('firstArrayValue', firstArrayValue)
    //console.log('secondArrayValue', secondArrayValue)

    const result = Object.entries(secondArrayValue)
      .reduce((acc, [key, value]) => {
        //console.log(acc, [key, value])

        // key : double_damage 또는 half_damage 또는 no_damage
        // concat을 사용해서 firstArrayValue와 secondArrayValue를 더해줌
        const result = firstArrayValue[key].concat(value)

        return (acc = {[key]: result, ...acc})

      }, {})
    
    return result
    //console.log(result)
  }

  const postDamageValue = (props) => {
    const result = Object.entries(props)
      .reduce((acc, [key, value]) => {

        const valuesOfKeyName = {
          double_damage: '2x',
          half_damage: '1/2x',
          no_damage: '0x'
        }

        return (acc = {[key]: value.map(i => ({
          damageValue: valuesOfKeyName[key],
          ...i
          })),
          ...acc
        })

      }, {})
    
    return result
    //console.log(result)
  }

  // DamageRelations에서 to와 from 종류의 차이
  // to는 포켓몬이 상대 포켓몬한테 가하는 데미지 속성
  // from은 포켓몬이 상대 포켓몬한테 받는 데미지 속성
  const separateObjectBetweenToAndFrom = (damage) => {
    const from = filterDamageRelations('_from', damage)
    //console.log('from :', from)
    const to = filterDamageRelations('_to', damage)
    //console.log('to :', to)

    return { from, to }
  }
  
  const filterDamageRelations = (valueFilter, damage) => {
    const result = Object.entries(damage)
      .filter(([key, value]) => {
        // key : 각 damage 종류의 from과 to
        //console.log('key :', key)
        // value : 각 damage 종류의 from과 to의 상세 정보
        //console.log('value :', value)
        // valueFilter : from 또는 to
        return key.includes(valueFilter)
      })
      .reduce((acc, [key, value]) => {

        const keyWithValueFilterRemove = key.replace(
          valueFilter,
          ''
        )

        //console.log(acc, [key, value])
        return (acc = {[keyWithValueFilterRemove]: value, ...acc})
      }, {})
    
    return result
  }

  return (
    <div className="flex gap-2 flex-col">
      {damagePokemonForm ? (
        <>
        {Object.entries(damagePokemonForm)
          .map(([key, value]) => {
          const keys = key;
          const valuesOfKeyName = {
            double_damage:'Weak',
            half_damage:'Resitant',
            no_damage:'Immune'
          }

          return(
            <div key={keys}>
              <h3 className="capitalize font-medium text-sm md:text-base text-slate-500 text-center">
                {valuesOfKeyName[keys]}
              </h3>
              <div className='flex flex-wrap gap-1 justify-center'>
                {value.length > 0 ? (
                  value.map(({name,url,damageValue}) => {
                    return(
                      <Type
                        type={name}
                        key={url}
                        damageValue={damageValue}
                      />
                  )
                })
              ):(
                <Type type={'none'} key={'none'} />
              )}
              </div>
            </div>
          )
        })}

        </>
      ):<div></div>

      }

    </div>
  )
}

export default DamageRelations