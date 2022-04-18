import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import store from '../utils/store';

const CoverLoading: Component = () => {
  const [isLoading, setIsLoading] = createSignal(true);

  const brandStyle = {
    'background-image': 'url(https://media.giphy.com/media/QaFKMVEP8FvSo/giphy.gif)',
    'background-size': 'cover',
    'background-position': 'center 58%',
    'background-repeat': 'no-repeat',
    'background-clip': 'text',
    '-webkit-background-clip': 'text',
    'font-family': "'Changa One', cursive",
    'letter-spacing': '1rem'
  }

  store.on('mapLoaded', () => {
    setIsLoading(false)
  })

  return (
    <div class={`
      ${ isLoading() ? '' : 'done' }
      cover-loading fixed w-screen h-screen top-0 left-0 bg-[#141414] z-50 flex items-center justify-center
    `}>
      <h1 class="cover-loading__title color-transparent font-bold p-16 text-8xl sm:text-9xl" style={ brandStyle }>TW<wbr />INTER<wbr />FELL</h1>
    </div>
  )
}

export default CoverLoading;
