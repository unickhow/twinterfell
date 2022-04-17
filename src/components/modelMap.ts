import mapboxgl from 'mapbox-gl'
import { disableAll } from '../utils/helper'
import { initModel } from '../utils/initModel'
import landMarks from '../assets/landMarks'

const BASE_GEO = [121.5644, 25.0341]
const mapStarter = {
  zoom: 9,
  center: BASE_GEO
}

export default function () {
  mapboxgl.accessToken = 'pk.eyJ1IjoidW5pY2tob3ciLCJhIjoiY2wyMG55aGhuMDIyajNicHBkbWRwMzQydyJ9.e9Y-71ja4OrSRqaDzN1AOQ'
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/unickhow/cl21feoqz00gn14o9djcbszg1',
    pitch: 50,
    antialias: true, // create the gl context with MSAA antialiasing, so custom layers are antialiased
    attributionControl: false,
    ...mapStarter
  })
  disableAll(map)

  map.on('style.load', async () => {
    landMarks.forEach(landMark => {
      map.addLayer(initModel(landMark), 'waterway-label')
    })
    for (const mark of landMarks) {
      const center = [mark.lng, mark.lat]
      await doFly(center)
    }
  })

  function doFly (center, options = {}, cb = null) {
    return new Promise((resolve, reject) => {
      map.flyTo({
        center,
        zoom: 16,
        pitch: 50,
        bearing: 0,
        speed: 0.5,
        curve: 1,
        ...options
      })
      map.once('moveend', async () => {
        await rotateCamera()
        resolve('done')
      })
    })
  }

  function rotateCamera() {
    return new Promise((resolve, reject) => {
      map.rotateTo(180, { duration: 20000 })
      map.once('moveend', () => {
        resolve('Done rotate')
      })
    })
  }
}
