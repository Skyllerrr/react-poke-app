import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth'
import app from '../firebase'

// 지금까지 기존의 화면 스타일링은 Tailwind로 적용했지만,
// NavBar는 styled-components 적용해봄

// localStorage를 이용하여 로그인 한 정보를 localStorage에 저장한 후에 이 정보를 initialUserData라는 함수를 통해 이제 새로고침을 계속해서 진행해도 사진 정보가 뜰 수 있도록(전에는 새로고침을 하게되면 "상헌"이라는 구글 계정 사진이 깨져서 나옴) 만든다.
const initialUserData = localStorage.getItem('userData') ?
  JSON.parse(localStorage.getItem('userData')) : {}

const NavBar = () => {

  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()

  // show라는 useState를 생성하여, 스크롤을 내리고 올릴때마다 Navbar(피카츄 로고있는 부분)의 배경색이 내리면 검정색으로 바뀌고 다시 올리면 흰색으로 바뀌는 현상을 구현
  const [show, setShow] = useState(false)
  //console.log(show)

  // 처음에 말했듯이 localStorage를 이용하여 로그인 정보를 저장한 후에 초기값에 지정해주면 나의 로그인 정보가 계속해서 남아있음(사진이 안깨지고 계속해서 보임)
  const [userData, setUserData] = useState(initialUserData)

  const { pathname } = useLocation()
  const navigate = useNavigate()

    // 유저가 로그인이 된 상태일 때, user의 정보가 맞지 않으면 login페이지로 넘어가고 반대로, user의 정보가 맞거나 pathname이 '/login'으로 되어있으면 메인화면('/')으로 넘어가게끔 만들었다.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //console.log(user)
      if (!user) {
        navigate('/login')
      } else if (user && pathname === '/login') {
        navigate('/')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])
  
  // 로그인 함수 (signInWithPopup함수를 firebase에서 제공)
  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        //console.log(result)
        setUserData(result.user)
        // 로그인을 하게되면, 사용자의 로그인 정보를 localStorage에 저장을 시켜준다.
        localStorage.setItem("userData", JSON.stringify(result.user))
      })
      .catch(error => {
        console.error(error)
      })
  }

  // 로그아웃 함수 (signOut함수를 firebase에서 제공)
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUserData({})
    })
    .catch(error => {
      alert(error.message)
    })
  }

  // EventListener의 scroll 이벤트를 이용하여 window.scrollY(실제로 스크롤을 맨 위로 올렸을 때는 수치가 0, 조금씩 내릴수록 수치가 올라간다)가 50이상일때, 배경은 검정색 반대는 배경은 원래대로 흰색으로 바뀌게 된다.
  const listener = () => {
    if (window.scrollY > 50) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listener)
  
    return () => {
      window.removeEventListener('scroll', listener)
    }
  }, [])
  

  return (
    // scroll 이벤트를 구현한 show 상태를 prop으로 전달
    <NavWrapper show={show}>
      <Logo>
        <Image
          alt='Poke logo'
          src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
          onClick={() => (window.location.href = "/")}
        />
      </Logo>

      {pathname === '/login' ?
        (
          <Login onClick={handleAuth}>LOGIN</Login>
        ) : 

        <SignOut>
          <UserImg
            src={userData.photoURL}
            alt="user photo"
          />
          <Dropdown>
            <span onClick={handleLogout}>Sign out</span>
          </Dropdown>
        </SignOut>
      }

    </NavWrapper>
  )
}

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  color: white;
`

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  
  &:hover {
    ${Dropdown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1.55px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  color: white;
  
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`

const Image = styled.img`
  cursor: pointer;

  img {
    width: 100%;
  }
`

const Logo = styled.a`
  padding: 0;
  width: 50px;
  margin-top: 4px;
`

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  background-color: ${props => props.show ? "#090b13" : "transparent"};
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 100;
`

export default NavBar