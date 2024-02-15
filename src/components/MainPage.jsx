import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { MainPageHeader } from './MainPageHeader'
import { Box, Container } from '@mui/material'
import { getFreeWorkers, getUserInfo } from '../api/network'
import { useDispatch } from 'react-redux'
import { router } from '../router/router'

export const MainPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!sessionStorage.getItem('access_token')) router.navigate('/login')
    else {
      getFreeWorkers(dispatch)
      getUserInfo(dispatch)
      router.navigate('/applications')
    }
  }, [])

  return (
    <Box sx={{ bgcolor: '#06c3', overflow: 'auto', height: '100vh' }}>
      <MainPageHeader />
      {/*<h1>Основная страница</h1>*/}
      <Container maxWidth='xl'>
        <Outlet />
      </Container>
      {/*<Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        TEXT?
  </Paper>*/}
    </Box>
  )
}
