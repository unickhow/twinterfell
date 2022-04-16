import mapboxgl from 'mapbox-gl'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { disableAll } from '../utils/helper'

const BASE_GEO = [121.540, 24.9855316]

export default function () {
  mapboxgl.accessToken = 'pk.eyJ1IjoidW5pY2tob3ciLCJhIjoiY2wyMG55aGhuMDIyajNicHBkbWRwMzQydyJ9.e9Y-71ja4OrSRqaDzN1AOQ'
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 16.5,
    center: BASE_GEO,
    pitch: 50,
    antialias: true, // create the gl context with MSAA antialiasing, so custom layers are antialiased
  })

  disableAll(map)

  // parameters to ensure the model is georeferenced correctly on the map
  const modelOrigin = BASE_GEO
  const modelAltitude = 0
  const modelRotate = [Math.PI / 2, 0, 0]

  const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
  )

  // transformation parameters to position, rotate and scale the 3D model onto the map
  const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    /* Since the 3D model is in real world meters, a scale transform needs to be
     * applied since the CustomLayerInterface expects units in MercatorCoordinates.
     */
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 5
  }

  // configuration of the custom layer for a 3D model per the CustomLayerInterface
  const customLayer = {
    id: '3d-model',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, gl) {
      this.camera = new THREE.Camera()
      this.scene = new THREE.Scene()

      // create two three.js lights to illuminate the model
      const directionalLight = new THREE.DirectionalLight(0xffffff)
      directionalLight.position.set(0, -70, 100).normalize()
      this.scene.add(directionalLight)

      const directionalLight2 = new THREE.DirectionalLight(0xffffff)
      directionalLight2.position.set(0, 70, 100).normalize()
      this.scene.add(directionalLight2)

      // use the three.js GLTF loader to add the 3D model to the three.js scene
      const loader = new GLTFLoader()
      loader.load(
        // '/src/assets/unickhow_logo.glb',
        'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
        (gltf) => {
          this.scene.add(gltf.scene)
        }
      )
      this.map = map

      // use the Mapbox GL JS map canvas for three.js
      this.renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true,
      })

      this.renderer.autoClear = false
    },
    render: function (gl, matrix) {
      const rotationX = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(1, 0, 0),
        modelTransform.rotateX
      )
      const rotationY = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 1, 0),
        modelTransform.rotateY
      )
      const rotationZ = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 0, 1),
        modelTransform.rotateZ
      )

      const m = new THREE.Matrix4().fromArray(matrix)
      const l = new THREE.Matrix4()
        .makeTranslation(
          modelTransform.translateX,
          modelTransform.translateY,
          modelTransform.translateZ
        )
        .scale(
          new THREE.Vector3(
            modelTransform.scale,
            -modelTransform.scale,
            modelTransform.scale
          )
        )
        .multiply(rotationX)
        .multiply(rotationY)
        .multiply(rotationZ)

      this.camera.projectionMatrix = m.multiply(l)
      this.renderer.resetState()
      this.renderer.render(this.scene, this.camera)
      this.map.triggerRepaint()
    },
  }

  map.on('style.load', () => {
    map.addLayer(customLayer, 'waterway-label')
    rotateCamera(0)
  })

  function rotateCamera(timestamp) {
    map.rotateTo((timestamp /360) % 360, { duration: 0 })
    requestAnimationFrame(rotateCamera)
  }
}
