import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Login } from './components/Login/Login'
import { MainPage } from './components/MainPage'
import { UserTicketMap } from './components/UserTicketMap'
import { Applications } from './components/Applications'
import { Workers } from './components/Workers'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}>
          <Route path='maps' element={<UserTicketMap />} />
          <Route path='applications' element={<Applications />} />
          <Route path='workers' element={<Workers />} />
        </Route>
        <Route path='login/*' element={<Login />} />
        <Route path='*' element={<Link to='/'>404 Not Found!</Link>} />
      </Routes>
    </BrowserRouter>
  )
}
