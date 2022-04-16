import mapboxgl from 'mapbox-gl'
import { disableAll } from '../utils/helper';

export default function () {
  mapboxgl.accessToken = 'pk.eyJ1IjoidW5pY2tob3ciLCJhIjoiY2wyMG55aGhuMDIyajNicHBkbWRwMzQydyJ9.e9Y-71ja4OrSRqaDzN1AOQ';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
  })

  disableAll(map)

  map.flyTo({  center: [-74.50, 40]})
  map.once('moveend', () => {
    fly()
  })
  function fly () {
    return map.flyTo({
      center: [
        121,
        23.55
      ],
      zoom: 9,
      speed: 1,
      curve: .6,
      easing(t) {
        return t
      }
    }, {
      lngLat: {
        lng: 23.55,
        lat: 121
      }
    })
  }

  // rotateCamera()
  // function rotateCamera(timestamp) {
  //   map.rotateTo((timestamp /360) % 360, { duration: 0 })
  //   requestAnimationFrame(rotateCamera)
  // }
}
