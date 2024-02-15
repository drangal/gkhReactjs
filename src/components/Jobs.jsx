import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import { useSelector } from 'react-redux'

export const Jobs = () => {
  const jobs = useSelector((state) => state.jobs.value)

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label='worker table'>
        <TableHead>
          <TableRow>
            <TableCell>id&nbsp;Соискателя</TableCell>
            <TableCell>Должность</TableCell>
            <TableCell>Принять</TableCell>
            <TableCell>Отклонить</TableCell>
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
                <Button
                  variant='outlined'
                  startIcon={<ThumbUpOffAltIcon />}
                  sx={{ alignSelf: 'flex-end' }}
                  onClick={() => console.log('Приняли)')}
                >
                  Да
                </Button>
              </TableCell>
              <TableCell component='th' scope='row'>
                <Button
                  variant='outlined'
                  startIcon={<ThumbDownOffAltIcon />}
                  sx={{ alignSelf: 'flex-end' }}
                  onClick={() => {}}
                >
                  Отклонить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
