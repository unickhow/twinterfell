import type { Component } from 'solid-js';

const MessageBox: Component = () => {
  const style = {
    background: 'rgba(0, 0, 0, 0.3)',
    'backdrop-filter': 'blur(5px)',
    top: '50%',
    left: '50%',
    transform: 'translate(-200%, -250%)',
  }
  return (
    <div
      class="fixed px-6 py-2 rounded border text-white"
      style={style}>
      <h2>Taipei 101</h2>
      <p>the hightest building of Taiwan.</p>
    </div>
  )
}

export default MessageBox
