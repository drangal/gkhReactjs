import { Box } from '@mui/material'
import { CodeCheckCard } from './CodeCheckCard'
import { PhoneLoginCard } from './PhoneLoginCard'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()
  const [isContinued, setIsContinued] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleIsContinuedChange = () => {
    setIsContinued(!isContinued)
  }

  useEffect(() => {
    if (sessionStorage.getItem('access_token')) navigate('/')
  }, [])

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100dvh'}
    >
      {isContinued ? (
        <CodeCheckCard
          onIsContinuedChange={handleIsContinuedChange}
          phoneNumber={phoneNumber}
        />
      ) : (
        <PhoneLoginCard
          onIsContinuedChange={handleIsContinuedChange}
          setPhoneNumber={setPhoneNumber}
        />
      )}
    </Box>
  )
}
