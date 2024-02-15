import { Box, Card, CardContent } from '@mui/material'
import { Clusterer, Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import { useSelector } from 'react-redux'

export const UserTicketMap = () => {
  const applications = useSelector((state) => state.applications.value)

  // todo сделать отдельное состояние для входящих

  return (
    <Card>
      <CardContent>
        <YMaps
          query={{
            ns: 'use-load-option',
            load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon'
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100dvh'
            }}
          >
            <Map
              defaultState={{
                center: [48.023, 37.8022],
                zoom: 12,
                controls: ['zoomControl', 'fullscreenControl']
              }}
              modules={['control.ZoomControl', 'control.FullscreenControl']}
              style={{ height: '100%', width: '100%' }}
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
                      defaultGeometry={application.coordinates.toReversed()}
                      properties={{
                        balloonContentBody: application.description
                      }}
                      key={application.id}
                    />
                  )
                })}
              </Clusterer>
            </Map>
          </Box>
        </YMaps>
      </CardContent>
    </Card>
  )
}
