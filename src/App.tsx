import type { Component } from 'solid-js';
import { onMount } from 'solid-js';
// import initMap from './components/normalMap';
import initMap from './components/modelMap';
import MessageBox from './components/messageBox';

const App: Component = () => {
  onMount(() => {
    initMap()
  });

  return (
    <>
      <div id="map" class="h-screen w-screen"></div>
      <MessageBox />
    </>
  );
};

export default App;
