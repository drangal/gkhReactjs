import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { MainPageHeader } from './MainPageHeader'
import { Box } from '@mui/material'
import { getAllDispatcherInvocations } from '../api/network'
import { useDispatch } from 'react-redux'

export const MainPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!sessionStorage.getItem('access_token')) navigate('/login')
    getAllDispatcherInvocations(dispatch)
  }, [])

  return (
    <Box sx={{ bgcolor: '#06c3' }}>
      <MainPageHeader />
      <h1>Основная страница</h1>
      <Outlet />
    </Box>
  )
}
