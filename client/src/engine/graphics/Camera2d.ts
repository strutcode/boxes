import * as twgl from 'twgl.js'
import Game from '../Game'
import Transform from '../util/Transform'

export default class Camera2d {
  public transform: Transform = new Transform()
  public zoom: number = 1
  public viewProjection: twgl.m4.Mat4 = twgl.m4.identity()

  public constructor() {
    Game.graphics.setActiveCamera(this)
  }

  public render(gl: WebGLRenderingContext): void {
    const h = 10 / this.zoom
    const w = h * (gl.canvas.width / gl.canvas.height)

    const projection = twgl.m4.ortho(-w, w, h, -h, 0, 10)
    const camera = twgl.m4.lookAt(
      [this.transform.x, this.transform.y, 0],
      [this.transform.x, this.transform.y, -1],
      [0, 1, 0],
    )
    const view = twgl.m4.inverse(camera)

    this.viewProjection = twgl.m4.multiply(projection, view)

    gl.clearColor(0.5, 0.5, 0.5, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    twgl.resizeCanvasToDisplaySize(gl.canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  }
}
