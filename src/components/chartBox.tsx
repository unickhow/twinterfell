import type { Component } from 'solid-js';
import { createSignal, onMount } from 'solid-js';
import store from '../utils/store';
import Chart from 'chart.js/auto';
import { numbers } from '../utils/helper';

const MessageBox: Component = () => {
  const style = {
    background: 'rgba(0, 0, 0, 0.3)',
    'backdrop-filter': 'blur(5px)',
    transform: 'translate(calc(-50% - 400px), calc(-50% - 200px))',
    'transform-origin': 'center center',
    'max-width': '300px',
    'box-sizing': 'border-box'
  }

  const [cardInfo, setCardInfo] = createSignal({
    labels: ['月流量', '評價', '平均消費'],
    datasets: [{
      data: [],
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
  })
  // store.on('update:info', (info: LandMark) => {
  //   setCardInfo(info)
  //   reset()
  // })

  const [show, setShow] = createSignal(false)

  onMount(() => {
    const ctx = document.getElementById('chart-container') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: cardInfo(),
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    store.on('rotateStart', () => {
      setTimeout(() => {
        setShow(true)
        myChart.data.datasets.forEach(dataset => {
          dataset.data = numbers({count: myChart.data.labels.length, min: 0, max: 100});
        });
        myChart.update();
      }, 1500)
    })
    store.on('rotateEnd', () => {
      setShow(false)
      myChart.data.datasets.forEach(dataset => {
        dataset.data = numbers({count: myChart.data.labels.length, min: 0, max: 0});
      });
      myChart.update();
    })
  })


  return (
    <div
      class={
        `fixed z-10 w-full top-[50%] left-[50%] px-6 py-4 border text-white transition-opacity duration-700 ${show() ? 'opacity-100' : 'opacity-0'}`
      }
      style={style}>
      <canvas id="chart-container" height="200"></canvas>
    </div>
  )
}

export default MessageBox
