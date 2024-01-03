import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './components/Login'
import { MainPage } from './components/MainPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login/*' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
