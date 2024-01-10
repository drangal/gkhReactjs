import { Box } from '@mui/material'
import { Clusterer, Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import { useSelector } from 'react-redux'

export const UserTicketMap = () => {
  const applications = useSelector((state) => state.applications.value)

  return (
    <YMaps
      query={{
        ns: 'use-load-option',
        load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon'
      }}
    >
      <Box
        sx={{
          border: '3px solid black',
          width: '100%',
          height: '80dvh',
          paddingLeft: '10px',
          paddingRight: '10px'
        }}
      >
        <Map
          defaultState={{
            center: [48.023, 37.8022],
            zoom: 12,
            controls: ['zoomControl', 'fullscreenControl']
          }}
          modules={['control.ZoomControl', 'control.FullscreenControl']}
          style={{ height: '90%' }}
        >
          <Clusterer
            options={{
              preset: 'islands#invertedVioletClusterIcons',
              groupByCoordinates: false
            }}
          >
            {applications.map((application) => {
              return (
                <Placemark
                  modules={['geoObject.addon.balloon']}
                  defaultGeometry={application.coordinates}
                  properties={{
                    balloonContentBody: 'text'
                  }}
                  key={application.id}
                />
              )
            })}
          </Clusterer>
        </Map>
      </Box>
    </YMaps>
  )
}
