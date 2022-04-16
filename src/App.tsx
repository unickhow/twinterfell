import type { Component } from 'solid-js';
import { onMount } from 'solid-js';
import initMap from './components/normalMap';

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
