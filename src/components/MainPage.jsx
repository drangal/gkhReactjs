import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { MainPageHeader } from './MainPageHeader'

export const MainPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!sessionStorage.getItem('access_token')) navigate('/login')
  }, [])

  return (
    <div>
      <MainPageHeader />
      <h1>Основная страница</h1>
      <Outlet />
    </div>
  )
}
