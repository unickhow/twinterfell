import type { Component } from 'solid-js';
import { onMount } from 'solid-js';
// import initMap from './components/normalMap';
import initMap from './components/modelMap';

const App: Component = () => {
  onMount(() => {
    initMap()
  });

  return (
    <>
      <div id="map"></div>
    </>
  );
};

export default App;
