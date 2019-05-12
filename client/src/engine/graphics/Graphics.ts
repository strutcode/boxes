// import {
//   Engine, Scene, Vector3, MeshBuilder, Mesh, HemisphericLight,
// } from 'babylonjs'
// import PanCamera2d from './PanCamera2d'
import * as twgl from 'twgl.js'
import Log from '../util/Log'
import Vector from '../util/Vector'
import Sprite from './Sprite'

const { m4 } = twgl

export default class Graphics {
  // private static engine: Engine
  // private static scene: Scene
  private static element: HTMLDivElement
  // public static camera: PanCamera2d

  private static gl: WebGLRenderingContext
  private static sprites: Sprite[] = []

  public static initialize(): void {
    Log.info('Initializing graphics')
    Log.debug('- Creating canvas')

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

    this.element = el

    Log.debug('- Starting engine')
    // this.engine = new Engine(canvas, false)
    // this.scene = new Scene(this.engine)

    // new HemisphericLight('light1', new Vector3(1, 1, 0), this.scene)

    // this.camera = new PanCamera2d('camera', new Vector3(0, 0, -20), this.scene)
    // this.camera.attachControl(canvas, true)

    // window.addEventListener('resize', () => {
    //   this.engine.resize()
    // })
    const ctx = canvas.getContext('webgl')
    if (!ctx) {
      throw new Error('Failed ot initialize webgl')
    }
    this.gl = ctx
  }

  public static render(time: number): void {
    // this.scene.render()

    const { gl } = this

    gl.clearColor(0.5, 0.5, 0.5, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    twgl.resizeCanvasToDisplaySize(gl.canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    for (let i = 0; i < this.sprites.length; i++) {
      this.sprites[i].render(gl)
    }
  }

  public static getViewProjection(): twgl.m4.Mat4 {
    const h = 20
    const w = h * (this.gl.canvas.width / this.gl.canvas.height)

    const projection = m4.ortho(-w, w, h, -h, 0, 10)
    const camera = m4.lookAt([0, 0, 0], [0, 0, -1], [0, 1, 0])
    const view = m4.inverse(camera)

    return m4.multiply(projection, view)
  }

  public static createSprite(size: Vector): Sprite {
    const sprite = new Sprite(this.gl, size.x, size.y)

    this.sprites.push(sprite)

    return sprite
  }

  public static getDomElement(): HTMLDivElement {
    return this.element
  }
}
