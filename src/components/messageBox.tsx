import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import store from '../utils/store';
import { LandMark } from '../types';

const MessageBox: Component = () => {
  const style = {
    background: 'rgba(0, 0, 0, 0.3)',
    'backdrop-filter': 'blur(5px)',
    top: '50%',
    left: '50%',
    transform: 'translate(-150%, -250%)',
    'transform-origin': 'center center',
    'max-width': '300px'
  }

  const [cardInfo, setCardInfo] = createSignal({
    name: '',
    desc: ''
  })
  store.on('update:info', (info: LandMark) => {
    setCardInfo(info)
  })

  const [show, setShow] = createSignal(false)
  store.on('rotateStart', () => {
    setShow(true)
  })
  store.on('rotateEnd', () => {
    setShow(false)
  })

  // TODO: typed js will be more nerdy cool
  return (
    <div
      class={
        `fixed px-6 py-2 rounded border text-white transition-opacity duration-700 ${show() ? 'opacity-100' : 'opacity-0'}`
      }
      style={style}>
      <h2>{ cardInfo().name }</h2>
      <p>{ cardInfo().desc }</p>
    </div>
  )
}

export default MessageBox
