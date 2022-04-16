enum Interactions {
  scrollZoom,
  boxZoom,
  dragRotate,
  dragPan,
  keyboard,
  doubleClickZoom,
  touchZoomRotate,
}

export const disableAll = (map) => {
  Object.values(Interactions)
    .filter(type => isNaN(Number(type)))
    .forEach((interaction) => {
      map[interaction].disable()
    })
}
