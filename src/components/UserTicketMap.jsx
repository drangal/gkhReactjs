import { Box } from '@mui/material'
import { Clusterer, Map, Placemark, YMaps } from '@pbe/react-yandex-maps'

export const UserTicketMap = () => {
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
        Модуль с картой!
        <Map
          defaultState={{
            center: [48.023, 37.8022],
            zoom: 11,
            controls: ['zoomControl', 'fullscreenControl']
          }}
          modules={['control.ZoomControl', 'control.FullscreenControl']}
          style={{ width: '100%', height: '90%' }}
        >
          <Clusterer
            options={{
              preset: 'islands#invertedVioletClusterIcons',
              groupByCoordinates: false
            }}
          >
            <Placemark
              modules={['geoObject.addon.balloon']}
              defaultGeometry={[48.023, 37.8022]}
              properties={{
                balloonContentBody: 'Текст при нажатии на метку'
              }}
            />
            <Placemark
              modules={['geoObject.addon.balloon']}
              defaultGeometry={[48.024, 37.8018]}
              properties={{
                balloonContentBody: 'Текст при нажатии на метку'
              }}
            />
          </Clusterer>
        </Map>
      </Box>
    </YMaps>
  )
}
