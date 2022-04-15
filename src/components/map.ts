import mapboxgl from 'mapbox-gl';

export default function () {
  mapboxgl.accessToken = 'pk.eyJ1IjoidW5pY2tob3ciLCJhIjoiY2wyMG55aGhuMDIyajNicHBkbWRwMzQydyJ9.e9Y-71ja4OrSRqaDzN1AOQ';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
  });
}
