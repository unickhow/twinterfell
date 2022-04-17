import TypeIt from 'typeit'

export const useTypeIt = (el: string) => {
  let typingInstance: any

  function init (info) {
    typingInstance = new TypeIt(el, {
      speed: 100,
      startDelay: 1000
    })

    typingInstance
      .type(`<h2 style="display: inline-block; margin-bottom: .5rem; margin-top: 0">${info.name}</h2><br>`)
      .pause(500)
      .type(`<p style="display: inline">${info.desc}</p>`)
      .go()
  }

  function destroy () {
    typingInstance.destroy()
  }

  function reset () {
    typingInstance.reset()
  }

  return {
    init,
    destroy,
    reset
  }
}
