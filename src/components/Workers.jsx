import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { useSelector } from 'react-redux'

export const Workers = () => {
  const freeWorkers = useSelector((state) => state.freeWorkers.value)

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label='worker table'>
        <TableHead>
          <TableRow>
            <TableCell>id&nbsp;Работника</TableCell>
            <TableCell>Должность&nbsp;работника</TableCell>
            <TableCell>id&nbsp;Организации&nbsp;работника</TableCell>
            <TableCell>Занятость</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {freeWorkers.map((freeWorker) => (
            <TableRow
              key={freeWorker.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{freeWorker.user_id}</TableCell>
              <TableCell component='th' scope='row'>
                {freeWorker.position}
              </TableCell>
              <TableCell>{freeWorker.organization_id}</TableCell>
              <TableCell component='th' scope='row'>
                {freeWorker.is_free ? 'Свободен' : 'В работе'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
