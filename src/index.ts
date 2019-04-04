import * as BABYLON from 'babylonjs'

const el: HTMLDivElement = document.getElementById('app') as HTMLDivElement
const canvas: HTMLCanvasElement = document.createElement('canvas')
el.appendChild(canvas)
Object.assign(canvas.style, {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
})

const engine = new BABYLON.Engine(canvas, false)
const scene = new BABYLON.Scene(engine)

BABYLON.MeshBuilder.CreateBox('cube', { size: 1 })
const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 0), scene)
camera.attachControl(canvas, true)

new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene)

window.addEventListener('resize', (): void => {
  engine.resize()
})

engine.runRenderLoop((): void => {
  scene.render()
})
