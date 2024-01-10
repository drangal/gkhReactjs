import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography
} from '@mui/material'
import { useSelector } from 'react-redux'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'

export const Applications = () => {
  const applications = useSelector((state) => state.applications.value)
  const [expanded, setExpanded] = useState(false)

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box
      sx={{
        width: '100%',
        padding: '10px'
      }}
    >
      {applications.map((application) => {
        return (
          <Accordion
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
            <AccordionDetails>
              <Box
                component='img'
                sx={{
                  width: 800,
                  height: 600,
                  objectFit: 'contain',
                  maxHeight: { xs: 320, md: 800 },
                  maxWidth: { xs: 240, md: 600 }
                }}
                alt='Фото проблемы.'
                src={application.photo}
              />
              <Typography>{application.description}</Typography>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Box>
  )
}
