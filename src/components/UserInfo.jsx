import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { setUserEdit } from '../api/network'

export const UserInfo = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const userInfo = useSelector((state) => state.userInfo.value)

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      setSelectedPhoto(e.target.result)
    }

    reader.readAsDataURL(file)
  }

  const handleSaveInfoClick = () => {
    console.log('save click')
    setUserEdit()
  }

  return (
    <Card className='w-full max-w-2xl'>
      <CardHeader
        title='Редактировать профиль'
        subheader='Эта информация не является публичной и будет видна только вам.'
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label='Фамилия'
              id='surname'
              placeholder={userInfo.surname}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField label='Имя' id='name' placeholder={userInfo.name} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Отчество'
              id='patronymic'
              placeholder={userInfo.patronymic}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField label='Город' id='city' placeholder={userInfo.city} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Улица'
              id='street'
              placeholder={userInfo.street}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label=' Дома'
              id='houseNumber'
              placeholder={userInfo.house}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Квартира'
              id='apartmentNumber'
              placeholder={userInfo.apartment_number}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Фото</Typography>
            <Stack spacing={1}>
              <label htmlFor='file'>
                <Avatar
                  alt='Photo'
                  className='rounded'
                  src={selectedPhoto}
                  sx={{ width: 82, height: 82 }}
                />
              </label>
              <div>
                <TextField
                  accept='image/*'
                  id='file'
                  type='file'
                  onChange={handlePhotoUpload}
                />
              </div>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button color='success' onClick={handleSaveInfoClick}>
          Сохранить
        </Button>
      </CardActions>
    </Card>
  )
}
