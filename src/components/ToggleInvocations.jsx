import { ToggleButton, ToggleButtonGroup } from '@mui/material'

export const ToggleInvocationStatus = ({
  applicationStatus,
  setApplicationStatus
}) => {
  const handleChange = (event, newAlignment) => {
    setApplicationStatus(newAlignment)
  }

  return (
    <ToggleButtonGroup
      color='primary'
      value={applicationStatus}
      exclusive
      onChange={handleChange}
      aria-label='Platform'
    >
      <ToggleButton value='incoming'>Входящие</ToggleButton>
      <ToggleButton value='accepted'>Принятые</ToggleButton>
      <ToggleButton value='inWork'>В работе</ToggleButton>
      <ToggleButton value='closed'>Отменённые</ToggleButton>
    </ToggleButtonGroup>
  )
}
