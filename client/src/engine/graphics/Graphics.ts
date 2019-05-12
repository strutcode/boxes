import * as twgl from 'twgl.js'
import Log from '../util/Log'
import Vector from '../util/Vector'
import Sprite from './Sprite'

const { m4 } = twgl

export default class Graphics {
  private element: HTMLDivElement

  private gl: WebGLRenderingContext
  private sprites: Sprite[] = []

  public constructor() {
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
    const ctx = canvas.getContext('webgl')
    if (!ctx) {
      throw new Error('Failed to initialize webgl')
    }
    this.gl = ctx
  }

  public render(time: number): void {
    const { gl } = this

    gl.clearColor(0.5, 0.5, 0.5, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    twgl.resizeCanvasToDisplaySize(gl.canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    for (let i = 0; i < this.sprites.length; i++) {
      this.sprites[i].render(gl)
    }
  }

  public getWebglContext(): WebGLRenderingContext {
    return this.gl
  }

  public getViewProjection(): twgl.m4.Mat4 {
    const h = 20
    const w = h * (this.gl.canvas.width / this.gl.canvas.height)

    const projection = m4.ortho(-w, w, h, -h, 0, 10)
    const camera = m4.lookAt([0, 0, 0], [0, 0, -1], [0, 1, 0])
    const view = m4.inverse(camera)

    return m4.multiply(projection, view)
  }

  public createSprite(size: Vector): Sprite {
    const sprite = new Sprite(this, size.x, size.y)

    this.sprites.push(sprite)

    return sprite
  }

  public getDomElement(): HTMLDivElement {
    return this.element
  }
}
