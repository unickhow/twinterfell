import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import store from '../utils/store';
import { LandMark } from '../types';
import { useTypeIt } from '../utils/typeit';

const MessageBox: Component = () => {
  const style = {
    background: 'rgba(0, 0, 0, 0.3)',
    'backdrop-filter': 'blur(5px)',
    transform: 'translateY(150px)',
    'transform-origin': 'top left',
    'max-width': '500px'
  }

  const { init, destroy, reset} = useTypeIt('#card_content');
  const [cardInfo, setCardInfo] = createSignal({
    name: '',
    desc: ''
  })
  store.on('update:info', (info: LandMark) => {
    setCardInfo(info)
    reset()
  })

  const [show, setShow] = createSignal(false)
  store.on('rotateStart', () => {
    init(cardInfo())
    setShow(true)
  })
  store.on('rotateEnd', () => {
    destroy()
    setShow(false)
  })

  // TODO: typed js will be more nerdy cool
  return (
    <div class="card-container fixed top-0 left-0 flex items-center justify-center w-full h-full">
      <div
        class={
          `fixed px-6 py-4 border text-white transition-opacity duration-700 ${show() ? 'opacity-100' : 'opacity-0'}`
        }
        style={style}>
        <div id="card_content"></div>
      </div>
    </div>
  )
}

export default MessageBox
