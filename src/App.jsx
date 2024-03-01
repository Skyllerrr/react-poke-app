import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import DetailPage from './pages/DetailPage'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'

const Layout = () => {
  return (
    <>
      <NavBar />
      <br />
      <br />
      <br />
      <Outlet />
    </>
  )
}

// 중첩 라우터 기능을 사용하여 Outlet이라는 컴포넌트를 이용하고, Layout이라는 컴포넌트를 새로 생성하여 최상위층에 넣어주게 되면 Layout함수에 있는 Outlet 컴포넌트에 MainPage, LoginPage, DetailPage 등이 포함되는 것이다.
// 따라서, 예를 들어 홈페이지 실행 후에 localhost:????/login을 하게되면 LoginPage에 들어오게 된다.
// 밑에 MainPage의 index는 path='/'과 같다.
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<MainPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='/pokemon/:id' element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App