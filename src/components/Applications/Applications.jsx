import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import { useEffect, useState } from 'react'
import {
  assignAnEmployee,
  closeInvocation,
  getAcceptedDispatcherInvocations,
  getCancelInvocations,
  getInWorkDispatcherInvocations,
  getIncomingDispatcherInvocations
} from '../../api/network'
import { ToggleInvocationStatus } from './ToggleInvocations'
import { setApplicationList } from '../../slices/applicationsSlice'
import { useNavigate } from 'react-router-dom'

export const Applications = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const applications = useSelector((state) => state.applications.value)
  const [openDialog, setOpenDialog] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertText, setAlertText] = useState('Заявка отклонена успешно!')
  const [severityValue, setSeverityValue] = useState('success')
  const [expanded, setExpanded] = useState(false)
  const [applicationStatus, setApplicationStatus] = useState('incoming')
  const [selectedApplicationId, setSelectedApplication] = useState()
  const [checked, setChecked] = useState([])

  const handleClickOpenDialog = (event) => {
    setSelectedApplication(
      +event.currentTarget.parentNode.parentNode.parentNode.parentNode.id.match(
        /\d+/
      )
    )
    setOpenDialog(true)
  }

  const handleClickAssign = (event) => {
    setSelectedApplication(
      +event.currentTarget.parentNode.parentNode.parentNode.parentNode.id.match(
        /\d+/
      )
    )
    assignAnEmployee(selectedApplicationId, checked)
    getIncomingDispatcherInvocations(dispatch)
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
    if (applicationStatus === 'incoming')
      getIncomingDispatcherInvocations(dispatch)
    else if (applicationStatus === 'accepted')
      getAcceptedDispatcherInvocations(dispatch)
    else if (applicationStatus === 'inWork')
      getInWorkDispatcherInvocations(dispatch)
    else if (applicationStatus === 'closed') getCancelInvocations(dispatch)
    else dispatch(setApplicationList([]))
  }, [applicationStatus])

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
      <Button
        variant='outlined'
        startIcon={<ChatOutlinedIcon />}
        sx={{ alignSelf: 'flex-end' }}
        onClick={() => navigate('/chat')}
      >
        Чат
      </Button>
      <ToggleInvocationStatus
        applicationStatus={applicationStatus}
        setApplicationStatus={setApplicationStatus}
      />
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
            {applicationStatus === 'incoming' ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  alignSelf: 'flex-end'
                }}
              >
                <CheckboxListSecondary
                  checked={checked}
                  setChecked={setChecked}
                />
                <Stack direction={'row'} gap={'2px'}>
                  <Tooltip title='Назначить рабочих' placement='top' arrow>
                    <Button
                      variant='outlined'
                      startIcon={<AssignmentIndOutlinedIcon />}
                      onClick={handleClickAssign}
                    >
                      Назначить
                    </Button>
                  </Tooltip>
                  <Tooltip title='Отменить заявку' placement='top' arrow>
                    <Button
                      variant='outlined'
                      startIcon={<ThumbDownOffAltIcon />}
                      onClick={handleClickOpenDialog}
                    >
                      Отклонить
                    </Button>
                  </Tooltip>
                </Stack>
              </Box>
            ) : (
              ''
            )}

            {applicationStatus === 'accepted' ? (
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
            ) : (
              ''
            )}
            {applicationStatus === 'inWork' ? (
              <Tooltip
                title='Открыть чат с пользователем'
                placement='top'
                arrow
              >
                <Button
                  variant='outlined'
                  startIcon={<ChatOutlinedIcon />}
                  sx={{ alignSelf: 'flex-end' }}
                  onClick={() => navigate('/chat')}
                >
                  Чат
                </Button>
              </Tooltip>
            ) : (
              ''
            )}
            {applicationStatus === 'closed' ? (
              <Box sx={{ alignSelf: 'flex-start', flexGrow: 1 }}>
                <Typography variant='h5'>Причина закрытия:</Typography>
                <Typography>{application.problem_status[0].comment}</Typography>
              </Box>
            ) : (
              ''
            )}
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

export default function CheckboxListSecondary({ checked, setChecked }) {
  const freeWorkers = useSelector((state) => state.freeWorkers.value)

  const handleToggle = (value) => () => {
    const currentIndexChecked = checked.indexOf(value)

    const newChecked = [...checked]

    if (currentIndexChecked === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndexChecked, 1)
    }
    console.log(newChecked)
    setChecked(newChecked)
  }

  return (
    <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {freeWorkers.map((worker) => {
        const labelId = `${worker.user_id}`
        return (
          <ListItem
            key={worker.user_id}
            secondaryAction={
              <Checkbox
                edge='end'
                onChange={handleToggle(worker.user_id)}
                checked={checked.indexOf(worker.user_id) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemText
                id={labelId}
                primary={`${worker.user_id} ${worker.position}`}
                onClick={handleToggle(worker.user_id)}
              />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}
