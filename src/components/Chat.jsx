import { Box, TextField, Button, Typography, Grid, Paper } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'

let messages = []

export const ChatUI = () => {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim() !== '') {
      messages.push({
        id: +Math.random().toString(16).slice(2),
        text: input,
        sender: 'Me'
      })
      setInput('')
    }
  }

  const handleInputChange = (event) => {
    setInput(event.target.value)
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'grey.200'
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </Box>
      <Box
        sx={{ p: 2, backgroundColor: 'background.default', overflow: 'auto' }}
      >
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <TextField
              fullWidth
              size='small'
              placeholder='Напишите сообщение...'
              variant='outlined'
              value={input}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              fullWidth
              size='large'
              color='primary'
              variant='contained'
              endIcon={<SendIcon />}
              onClick={handleSend}
            ></Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

const Message = ({ message }) => {
  const isOpponent = message.sender !== 'Me'

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isOpponent ? 'flex-start' : 'flex-end',
        mb: 2
      }}
    >
      <Paper
        variant='outlined'
        sx={{
          p: 2,
          backgroundColor: isOpponent ? 'primary.light' : 'secondary.light',
          borderRadius: isOpponent ? '20px 20px 20px 5px' : '20px 20px 5px 20px'
        }}
      >
        <Typography variant='body1'>{message.text}</Typography>
      </Paper>
    </Box>
  )
}
