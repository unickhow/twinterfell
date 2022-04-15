import type { Component } from 'solid-js';
import { onMount } from 'solid-js';
import initMap from './components/map';

const App: Component = () => {
  onMount(() => {
    initMap()
  });

  return (
    <>
      <p class="text-4xl text-green-700 text-center">
        Winter is Coming
      </p>
      <div id="map" class="h-[500px]"></div>
    </>
  );
};

export default App;
