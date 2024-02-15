import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  failureJob,
  getJobApplicationsByStatus,
  successJob
} from '../api/network'
import { useEffect } from 'react'

export const Jobs = () => {
  const dispatch = useDispatch()
  const jobs = useSelector((state) => state.jobs.value)

  useEffect(() => {}, [dispatch])

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label='worker table'>
        <TableHead>
          <TableRow>
            <TableCell>id&nbsp;Соискателя</TableCell>
            <TableCell>Должность</TableCell>
            <TableCell>Решение</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((worker) => (
            <TableRow
              key={worker.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{worker.user_id}</TableCell>
              <TableCell component='th' scope='row'>
                {worker.position}
              </TableCell>
              <TableCell>
                <Stack spacing={'2px'}>
                  <Button
                    variant='outlined'
                    onClick={() => {
                      successJob(worker.id)
                      getJobApplicationsByStatus(dispatch)
                    }}
                  >
                    Принять
                  </Button>
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={() => {
                      failureJob(worker.id)
                      getJobApplicationsByStatus(dispatch)
                    }}
                  >
                    Отказать
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
