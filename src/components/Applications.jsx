import { Box, Checkbox, Divider, Grid, IconButton, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteApplication,
  updateApplicationCompleted
} from '../slices/applicationsSlice'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useEffect } from 'react'
import { getAllDispatcherInvocations } from '../api/network'

export const Applications = () => {
  const applications = useSelector((state) => state.applications.value)
  const dispatch = useDispatch()

  useEffect(() => {
    getAllDispatcherInvocations(dispatch)
  }, [])

  return (
    <Box
      sx={{
        border: '3px solid black',
        width: '100%',
        height: '80dvh',
        paddingLeft: '10px',
        paddingRight: '10px'
      }}
    >
      Модуль с заявками!
      <Stack spacing={2}>
        {applications.map((application) => {
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: 1,
                borderRadius: 1,
                borderColor: '#424242',
                gap: '10px',
                p: '10px',
                mt: 1
              }}
              key={application.id}
            >
              <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
              <Box sx={{ display: 'flex', flexGrow: 1 }}>
                {application.title}
              </Box>
              <Box
                sx={{
                  display: 'flex'
                }}
              >
                <Checkbox
                  checked={application.completed}
                  onClick={() => {
                    dispatch(
                      updateApplicationCompleted({
                        id: application.id,
                        userId: application.userId
                      })
                    )
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex'
                }}
              >
                <IconButton
                  type='button'
                  sx={{ p: '10px' }}
                  aria-label='delete'
                  onClick={() => {
                    dispatch(
                      deleteApplication({
                        id: application.id,
                        userId: application.userId
                      })
                    )
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}
