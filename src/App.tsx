import type { Component } from 'solid-js';
import { onMount } from 'solid-js';
// import initMap from './components/normalMap';
import initMap from './components/modelMap';
import MessageBox from './components/messageBox';
import ChartBox from './components/chartBox';
import CoverLoading from './components/coverLoading';

const App: Component = () => {
  onMount(() => {
    initMap()
  });

  return (
    <>
      <CoverLoading />
      <div id="map" class="h-screen w-screen"></div>
      <MessageBox />
      <ChartBox />
    </>
  );
};

export default App;
