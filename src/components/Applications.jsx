import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Snackbar,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import { useEffect, useState } from 'react'
import {
  closeInvocation,
  getIncomingDispatcherInvocations
} from '../api/network'
import { ToggleInvocations } from './ToggleInvocations'

//TODO исправить "успешное отклонение заявки" при ошибке запроса, попробовать обновить страницу

export const Applications = () => {
  const dispatch = useDispatch()
  const applications = useSelector((state) => state.applications.value)
  const [openDialog, setOpenDialog] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertText, setAlertText] = useState('Заявка отклонена успешно!')
  const [severityValue, setSeverityValue] = useState('success')
  const [expanded, setExpanded] = useState(false)
  const [alignment, setAlignment] = useState('incoming')
  const [selectedApplicationId, setSelectedApplication] = useState()

  const handleClickOpenDialog = (event) => {
    setSelectedApplication(
      +event.currentTarget.parentNode.parentNode.id.match(/\d+/)
    )
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    getIncomingDispatcherInvocations(dispatch)
  }

  const handleClickDialogActionButton = () => {
    const closeResult = closeInvocation(selectedApplicationId)
    closeResult.then(
      () => {
        setAlertText('Заявка отклонена успешно!')
        setSeverityValue('success')
        setOpenAlert(true)
        handleCloseDialog()
      },
      () => {
        setAlertText('Не удалось отклонить заявку.')
        setSeverityValue('warning')
        setOpenAlert(true)
        handleCloseDialog()
      }
    )
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenAlert(false)
  }

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  useEffect(() => {
    getIncomingDispatcherInvocations(dispatch)
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        paddingTop: 2,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1
      }}
    >
      <ToggleInvocations alignment={alignment} setAlignment={setAlignment} />
      {applications.map((application) => (
        <Accordion
          sx={{ alignSelf: 'flex-start', width: '100%' }}
          expanded={expanded === `panel${application.id}`}
          onChange={handleChangeAccordion(`panel${application.id}`)}
          key={application.id}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${application.id}bh-content`}
            id={`panel${application.id}bh-header`}
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              {application.title}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {application.address}
            </Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: { xs: 'center' },
              gap: { xs: 2 }
            }}
          >
            <Box
              component='img'
              sx={{
                width: 800,
                height: 600,
                objectFit: 'contain',
                maxHeight: { xs: 320, md: 500 },
                maxWidth: { xs: 240, md: 400 }
              }}
              alt='Фото проблемы.'
              src={application.photo}
            />
            <Box sx={{ alignSelf: 'flex-start', flexGrow: 1 }}>
              <Typography variant='h5'>Описание:</Typography>
              <Typography>{application.description}</Typography>
            </Box>
            <Tooltip title='Отменить заявку' placement='top' arrow>
              <Button
                variant='outlined'
                startIcon={<ThumbDownOffAltIcon />}
                sx={{ alignSelf: 'flex-end' }}
                onClick={handleClickOpenDialog}
              >
                Отклонить
              </Button>
            </Tooltip>
          </AccordionDetails>
        </Accordion>
      ))}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Внимание!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Вы уверены что хотите отменить заявку? Опишите причину:
            <TextField
              id='delete-reason'
              label='Причина'
              fullWidth
              margin='dense'
              multiline
              defaultValue='Неудовлетворительная заявка.'
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            Отменить
          </Button>
          <Button onClick={handleClickDialogActionButton}>Удалить</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={severityValue}
          sx={{ width: '100%' }}
        >
          {alertText}
        </Alert>
      </Snackbar>
    </Box>
  )
}
