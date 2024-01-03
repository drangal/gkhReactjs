import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  InputAdornment,
  InputLabel,
  Link
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined'

export const CodeCheckCard = ({ onIsContinuedChange, phoneNumber }) => {
  const navigate = useNavigate()
  const [inputError, setInputError] = useState(false)
  const [inputTextValue, setInputTextValue] = useState('')

  const validateInput = (event) => {
    const result = event.target.value.replace(/\D/g, '')
    setInputTextValue(result)
  }

  const fetchDispatcherToken = async () => {
    try {
      const response = await fetch(
        `https://enotgpt-authserver.serveo.net/auth/get_token_dispatcher`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            number: phoneNumber,
            code: +inputTextValue
          })
        }
      )

      if (response.ok) {
        const json = await response.json()
        sessionStorage.setItem('access_token', json.access_token)
        navigate('/')
      } else {
        setInputError(true)
        console.log(response.statusText)
      }
    } catch (error) {
      console.log('Ошибки сети или чё-то такое')
    }
  }

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: '28rem'
      }}
    >
      <CardHeader
        title='Вход'
        titleTypographyProps={{ textAlign: 'center', color: '#2196f3' }}
        subheader='Введите полученный код, чтобы войти'
        subheaderTypographyProps={{ textAlign: 'center' }}
      />
      <CardContent
        sx={{
          display: 'flex',
          marginTop: '1rem',
          gap: 2,
          flexDirection: 'column'
        }}
      >
        <Link component='button' variant='body2' onClick={onIsContinuedChange}>
          Изменить номер телефона
        </Link>
        <Box sx={{ marginTop: '0.5rem' }}>
          <InputLabel htmlFor='code-checker'>Код из смс</InputLabel>
          <Input
            fullWidth
            id='code-checker'
            placeholder='123456'
            value={inputTextValue}
            inputProps={{ maxLength: 6 }}
            required
            type='text'
            onChange={validateInput}
            error={inputError}
            onKeyUp={() => setInputError(false)}
            startAdornment={
              <InputAdornment position='start'>
                <KeyOutlinedIcon />
              </InputAdornment>
            }
          />
        </Box>
        <Button
          variant='contained'
          color='primary'
          sx={{
            width: '100%'
          }}
          type='button'
          onClick={fetchDispatcherToken}
        >
          Войти
        </Button>
      </CardContent>
    </Card>
  )
}
