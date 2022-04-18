import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import store from '../utils/store';
import { LandMark } from '../types';
import { useTypeIt } from '../utils/typeit';

const MessageBox: Component = () => {
  const style = {
    background: 'rgba(0, 0, 0, 0.3)',
    'backdrop-filter': 'blur(5px)',
    transform: 'translate(-50%, calc(-50% + 158px))',
    'transform-origin': 'center center',
    'max-width': '500px',
    'box-sizing': 'border-box'
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
    <div
      class={
        `fixed z-10 w-full top-[50%] left-[50%] px-6 py-4 border text-white transition-opacity duration-700 ${show() ? 'opacity-100' : 'opacity-0'}`
      }
      style={style}>
      <div id="card_content"></div>
    </div>
  )
}

export default MessageBox
