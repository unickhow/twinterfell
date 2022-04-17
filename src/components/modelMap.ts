import mapboxgl from 'mapbox-gl'
import { disableAll } from '../utils/helper'
import { initModel } from '../utils/initModel'
import landMarks from '../assets/landMarks'
import store from '../utils/store';

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
    pitch: 80,
    antialias: true, // create the gl context with MSAA antialiasing, so custom layers are antialiased
    attributionControl: false,
    ...mapStarter
  })
  disableAll(map)

  map.on('style.load', async () => {
    landMarks.forEach(landMark => {
      map.addLayer(initModel(landMark), 'waterway-label')
    })
    for (const landMark of landMarks) {
      await doFly(landMark)
    }
  })

  let timeout
  function doFly (landMark, options = {}, cb = null) {
    // TODO: custom hook to prevent update before card fade out
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      store.emit('update:info', landMark)
    }, 1000)
    const center = [landMark.lng, landMark.lat]
    const pitch = Math.floor(Math.random() * (70 - 30) + 30)
    return new Promise((resolve, reject) => {
      map.flyTo({
        center,
        zoom: 16,
        pitch,
        bearing: 0,
        speed: 0.5,
        curve: 1,
        ...options
      })
      map.once('moveend', async () => {
        store.emit('rotateStart')
        await rotateCamera()
        store.emit('rotateEnd')
        resolve('done')
      })
    })
  }

  function rotateCamera() {
    return new Promise((resolve, reject) => {
      map.rotateTo(180, { duration: 25000 })
      map.once('moveend', () => {
        resolve('Done rotate')
      })
    })
  }
}
