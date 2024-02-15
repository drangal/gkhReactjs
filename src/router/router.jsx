import { Login } from '../components/Login/Login'
import { MainPage } from '../components/MainPage'
import { UserTicketMap } from '../components/UserTicketMap'
import { Applications } from '../components/Applications'
import { Workers } from '../components/Workers'
import { UserInfo } from '../components/UserInfo'
import { Link, createBrowserRouter } from 'react-router-dom'
import { ChatUI } from '../components/Chat'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: 'maps',
        element: <UserTicketMap />
      },
      {
        path: 'applications',
        element: <Applications />
      },
      {
        path: 'applications/chat',
        element: <ChatUI />
      },
      {
        path: 'workers',
        element: <Workers />
      },
      {
        path: 'profile',
        element: <UserInfo />
      }
    ],
    errorElement: (
      <Link to='/'>
        <h1>404 Not Found!</h1>
      </Link>
    )
  },
  {
    path: 'login/',
    element: <Login />
  }
])
