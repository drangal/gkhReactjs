import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import RoofingIcon from '@mui/icons-material/Roofing'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { router } from '../router/router'

export function MainPageHeader() {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const userInfo = useSelector((state) => state.userInfo.value)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenuMap = () => {
    router.navigate('/maps')
    setAnchorElNav(null)
  }

  const handleCloseNavMenuApplications = () => {
    router.navigate('/applications')
    setAnchorElNav(null)
  }

  const handleCloseNavMenuWorkers = () => {
    router.navigate('/workers')
    setAnchorElNav(null)
  }

  const handleCloseNavMenuJobs = () => {
    router.navigate('/jobs')
    setAnchorElNav(null)
  }

  const handleCloseNavMenu = () => {
    router.navigate('/maps')
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenUserProfile = () => {
    handleCloseUserMenu()
    router.navigate('/profile')
  }

  const handleLogout = () => {
    setAnchorElUser(null)
    sessionStorage.removeItem('access_token')
    router.navigate('/login')
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <RoofingIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            ЖКХ
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              <MenuItem onClick={handleCloseNavMenuMap}>
                <Typography textAlign='center'>Карта</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenuApplications}>
                <Typography textAlign='center'>Заявки</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenuWorkers}>
                <Typography textAlign='center'>Бригады</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenuJobs}>
                <Typography textAlign='center'>Трудоустройство</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <RoofingIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            ЖКХ
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={() => {
                router.navigate('/maps')
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Карта
            </Button>
            <Button
              onClick={() => {
                router.navigate('/applications')
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Заявки
            </Button>
            <Button
              onClick={() => {
                router.navigate('/workers')
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Бригады
            </Button>

            <Button
              onClick={() => {
                router.navigate('/jobs')
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Трудоустройство
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Настройки'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Dispatcher' src={userInfo.photo} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleOpenUserProfile}>
                <Typography textAlign='center'>Профиль</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign='center'>Выйти</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
