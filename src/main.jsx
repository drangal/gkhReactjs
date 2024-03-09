import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { YMaps } from '@pbe/react-yandex-maps'

ReactDOM.createRoot(document.getElementById('root')).render(
  <YMaps
    query={{
      ns: 'use-load-option',
      load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon'
    }}
  >
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </YMaps>
)
