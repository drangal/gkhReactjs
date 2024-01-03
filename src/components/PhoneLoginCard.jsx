import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  InputLabel
} from '@mui/material'

export const PhoneLoginCard = ({ onIsContinuedChange, setPhoneNumber }) => {
  const phoneRegex = /^\+7\d{10}$/

  const fetchCodeByPhone = async () => {
    try {
      const response = await fetch(
        `https://enotgpt-authserver.serveo.net/auth/create_code_dispatcher`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            number: document.getElementById('phone-number').value
          })
        }
      )

      if (response.ok) {
        setPhoneNumber(document.getElementById('phone-number').value)
        onIsContinuedChange()
      } else {
        console.log(response.statusText)
      }
    } catch (error) {
      console.log('Ошибки сети или чё-то такое')
    }
  }

  const onButtonClick = async () => {
    if (phoneRegex.test(document.getElementById('phone-number').value)) {
      await fetchCodeByPhone()
    } else {
      alert('Номер телефона неверный.')
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
        subheader='Введите свой номер телефона, чтобы продолжить'
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
        <Box sx={{ marginTop: '0.5rem' }}>
          <InputLabel htmlFor='phone-number'>Номер телефона</InputLabel>
          <Input
            fullWidth
            id='phone-number'
            placeholder='+7(949)000-00-00'
            required
            type='tel'
          />
        </Box>
        <Button
          variant='contained'
          color='primary'
          sx={{
            width: '100%'
          }}
          type='button'
          onClick={onButtonClick}
        >
          Продолжить
        </Button>
      </CardContent>
    </Card>
  )
}
