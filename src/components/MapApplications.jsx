// import React, { useEffect, useMemo } from 'react'
// import { features, LOCATION } from './helpers'

// function Map() {
//   const [data, setData] = useState()

//   const {
//     YMap
//     // ...other components
//   } = useMemo(() => {
//     if (data?.reactify) {
//       return reactify.module(data.ymap)
//     }
//   }, [data])

//   useEffect(() => {
//     const script = document.createElement('script')
//     document.body.appendChild(script)
//     script.type = 'text/javascript'
//     script.src = `https://api-maps.yandex.ru/v3/?apikey=${key}&lang=${lang}`
//     script.onload = async () => {
//       const ymaps = window.ymaps3
//       await ymaps.ready
//       const ymaps3Reactify = await ymaps.import('@yandex/ymaps3-reactify')
//       const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM)
//       const {
//         YMap,
//         YMapDefaultSchemeLayer,
//         YMapDefaultFeaturesLayer,
//         YMapMarker
//       } = reactify.module(ymaps3Reactify)

//       setData({
//         reactify,
//         ymaps
//       })
//       /*
//       and other logic which is not connected with rendering
//       to load ymap modules like YMapDefaultMarker
//       */
//     }
//   }, [])

//   if (!YMap) {
//     return null
//   }

//   return (
//     <YMap location={location}>
//       <YMapDefaultSchemeLayer />
//       <YMapDefaultFeaturesLayer />
//       <YMapDefaultMarker coordinates={LOCATION.coordinates} />
//     </YMap>
//   )
// }
