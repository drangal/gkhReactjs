import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'

export const ToggleInvocations = ({ alignment, setAlignment }) => {
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment)
  }

  return (
    <ToggleButtonGroup
      color='primary'
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label='Platform'
    >
      <ToggleButton value='all'>Все</ToggleButton>
      <ToggleButton value='incoming'>Входящие</ToggleButton>
      <ToggleButton value='closed'>Отменённые</ToggleButton>
    </ToggleButtonGroup>
  )
}
