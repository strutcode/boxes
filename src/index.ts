import * as BABYLON from 'babylonjs'
import * as box2d from '@flyover/box2d'
import PanCamera2d from './PanCamera2d'

/*
 * Graphics setup
 */
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

const cube = BABYLON.MeshBuilder.CreateBox('cube', { size: 2 })
const bounds = BABYLON.MeshBuilder.CreateBox('cube', { width: 100, height: 20 })
const mat = new BABYLON.StandardMaterial('wire', scene)
mat.wireframe = true
bounds.material = mat

const camera = new PanCamera2d('camera', new BABYLON.Vector3(0, 0, -20), scene)
camera.attachControl(canvas, true)

new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene)

window.addEventListener('resize', (): void => {
  engine.resize()
})

/*
 * Physics setup
 */
/* eslint-disable new-cap */
const gravity = new box2d.b2Vec2(0, 9.87)
const world = new box2d.b2World(gravity)

// Create a ground box
const groundBodyDef: box2d.b2BodyDef = new box2d.b2BodyDef()
const groundBody: box2d.b2Body = world.CreateBody(groundBodyDef)
const groundBox: box2d.b2PolygonShape = new box2d.b2PolygonShape()
groundBox.SetAsBox(10, 10)
groundBody.CreateFixture(groundBox, 0)
groundBody.SetPositionXY(0, 20)

// Create a dynamic box
const bodyDef: box2d.b2BodyDef = new box2d.b2BodyDef()
bodyDef.type = box2d.b2BodyType.b2_dynamicBody
const body: box2d.b2Body = world.CreateBody(bodyDef)

const dynamicBox: box2d.b2PolygonShape = new box2d.b2PolygonShape()
dynamicBox.SetAsBox(1, 1)

const fixtureDef: box2d.b2FixtureDef = new box2d.b2FixtureDef()
fixtureDef.shape = dynamicBox
fixtureDef.density = 1
fixtureDef.friction = 0.3
body.CreateFixture(fixtureDef)

body.SetAngle(Math.PI / 8)

/*
 * Main loop
 */

const timeStep: number = 1 / 30
const velocityIterations = 6
const positionIterations = 2

let frames = 0

setInterval((): void => {
  world.Step(timeStep, velocityIterations, positionIterations)
}, timeStep)

engine.runRenderLoop((): void => {
  const position: box2d.b2Vec2 = body.GetPosition()
  const angle: number = body.GetAngle()

  cube.position.copyFromFloats(position.x, position.y, 0)
  cube.rotation.z = angle
  bounds.position.copyFromFloats(groundBody.GetPosition().x, groundBody.GetPosition().y, 0)

  scene.render()
  frames++
})

// setInterval(() => {
//   console.log('framerate:', frames)
//   frames = 0
// }, 1000)
