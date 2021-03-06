import mapboxgl from 'mapbox-gl'
import { disableAll } from '../utils/helper'
import { initModel } from '../utils/initModel'
import landMarks from '../assets/landMarks'
import store from '../utils/store';
import BezierEasing from 'bezier-easing'
import 'mapbox-gl/dist/mapbox-gl.css'

const easing = BezierEasing(.785, .135, .15, .86)
const BASE_GEO = [121.5644, 25.0341]
const config = {
  rotateAngle: 180,
  rotateDuration: 18,
  flyToConfig: {
    zoom: 16,
    speed: 0.7,
  },
  initConfig: {
    pitch: 77,
    zoom: 5,
    center: BASE_GEO
  }
}

export default function () {
  mapboxgl.accessToken = 'pk.eyJ1IjoidW5pY2tob3ciLCJhIjoiY2wyMG55aGhuMDIyajNicHBkbWRwMzQydyJ9.e9Y-71ja4OrSRqaDzN1AOQ'
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/unickhow/cl21feoqz00gn14o9djcbszg1',
    antialias: true, // create the gl context with MSAA antialiasing, so custom layers are antialiased
    attributionControl: false,
    ...config.initConfig
  })
  map.addControl(new mapboxgl.AttributionControl(), 'bottom-left');
  disableAll(map)

  map.on('load', () => {
    //* later than 'style.load'
    store.emit('mapLoaded')
  })

  map.on('style.load', () => {
    //* faster than 'load'
    landMarks.forEach(landMark => {
      map.addLayer(initModel(landMark), 'waterway-label')
    })
    playFlyingAnimation()
  })

  async function playFlyingAnimation () {
    console.count('play loop')
    for (const landMark of landMarks) {
      await doFly(landMark)
    }
  }

  let timeout
  function doFly (landMark, options = {}) {
    // TODO: custom hook to prevent update before card fade out
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      store.emit('update:info', landMark)
    }, 1000)
    const center = [landMark.lng, landMark.lat]
    const pitch = Math.floor(Math.random() * (70 - 40) + 30)
    return new Promise((resolve) => {
      map.flyTo({
        center,
        pitch,
        bearing: 0,
        curve: 1,
        easing: (t: number) => t,
        ...config.flyToConfig,
        ...options
      })
      map.once('moveend', async () => {
        store.emit('rotateStart')
        await rotateCamera()
        store.emit('rotateEnd')
        resolve('done')

        if (isLastLandMark(landMark)) {
          playFlyingAnimation()
        }
      })
    })
  }

  function isLastLandMark (landMark) {
    return landMark === landMarks[landMarks.length - 1]
  }

  function rotateCamera() {
    return new Promise((resolve) => {
      map.easeTo({
        bearing: config.rotateAngle,
        duration: config.rotateDuration * 1000,
        easing: (t: number) => easing(t),
      })
      map.once('moveend', () => {
        resolve('Done rotate')
      })
    })
  }
}
