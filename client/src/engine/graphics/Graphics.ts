import * as twgl from 'twgl.js'
import Log from '../util/Log'
import Vector from '../util/Vector'
import Sprite from './Sprite'
import Camera2d from './Camera2d'

const { m4 } = twgl

export default class Graphics {
  private element: HTMLDivElement
  private gl: WebGLRenderingContext
  private activeCamera: Camera2d | null = null
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

  public createSprite(size: Vector): Sprite {
    const sprite = new Sprite(this, size.x, size.y)

    this.sprites.push(sprite)

    return sprite
  }

  public setActiveCamera(camera: Camera2d): void {
    this.activeCamera = camera
  }

  public render(time: number): void {
    const { gl } = this

    if (this.activeCamera) {
      this.activeCamera.render(gl)

      for (let i = 0; i < this.sprites.length; i++) {
        this.sprites[i].render(gl)
      }
    }
    else {
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
    }
  }

  public getWebglContext(): WebGLRenderingContext {
    return this.gl
  }

  public getViewProjection(): twgl.m4.Mat4 {
    if (!this.activeCamera) return m4.identity()
    return this.activeCamera.viewProjection
  }

  public getDomElement(): HTMLDivElement {
    return this.element
  }
}
