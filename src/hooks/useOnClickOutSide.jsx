import { useEffect } from "react"

export default function useOnclickOutside(ref, handler) {

  useEffect(() => {
    const listener = (e) => {
      //console.log(e.target)

      // 모달 안을 클릭했는지
      // 만약, ref.current 즉, 흰 배경으로 되어있는 div 부분일 때 (안쪽)
      // 즉, 모달이 닫히지 않는다.
      if (!ref.current || ref.current.contains(e.target)) {
        return 
      }

      // 모달 밖을 클릭했는지
      // 그 부분이 아닐 때 (바깥쪽)
      // 여기서 이 handler()는 DamageModal 컴포넌트에 useOnclickOutside() 함수를 실행 시키는데, setIsModalOpen(false)가 적용 된다.
      // 즉, setIsModalOpen(false)니까 모달이 닫힌다.
      handler()
    }

      document.addEventListener('mousedown', listener)
      
    return () => {
      document.removeEventListener('mousedown', listener)

    }
  }, [ref, handler])
  
}