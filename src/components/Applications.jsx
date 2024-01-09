import { Box, Checkbox, Divider, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteApplication,
  updateApplicationCompleted
} from '../slices/applicationsSlice'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export const Applications = () => {
  const applications = useSelector((state) => state.applications.value)
  const dispatch = useDispatch()

  return (
    <>
      {applications.map((application) => {
        if (application.userId !== 1) return
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
            <Box sx={{ display: 'flex', flexGrow: 1 }}>{application.title}</Box>
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
    </>
  )
}
