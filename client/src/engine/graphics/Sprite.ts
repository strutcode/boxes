import * as twgl from 'twgl.js'

import Graphics from './Graphics'
import Transform from '../util/Transform'
import vs from './vs.glsl'
import fs from './fs.glsl'

const { m4 } = twgl

export default class Sprite {
  public transform: Transform = new Transform()
  private graphics: Graphics
  private programInfo: twgl.ProgramInfo
  private bufferInfo: twgl.BufferInfo
  private tex: WebGLTexture
  // private mesh: Mesh

  public constructor(graphics: Graphics, width: number, height: number) {
    this.graphics = graphics
    const gl = graphics.getWebglContext()
    // this.mesh = MeshBuilder.CreateBox('cube', { width, height })
    this.programInfo = twgl.createProgramInfo(gl, [vs, fs])

    this.tex = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: [
        255, 255, 255, 255,
        192, 192, 192, 255,
        192, 192, 192, 255,
        255, 255, 255, 255,
      ],
    })

    const hw = width / 2
    const hh = height / 2

    const arrays = {
      position: [-hw, -hh, 0, hw, -hh, 0, -hw, hh, 0, -hw, hh, 0, hw, -hh, 0, hw, hh, 0],
      texcoord: [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
    }
    this.bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
  }

  public setTransform(x: number, y: number, r: number): void {
    this.transform.x = x
    this.transform.y = y
    this.transform.r = r
    // this.mesh.position.x = x
    // this.mesh.position.y = y
    // this.mesh.rotation.z = z
  }

  public render(gl: WebGLRenderingContext): void {
    const world = m4.rotateZ(
      m4.translate(
        m4.identity(),
        [this.transform.x, this.transform.y, 0],
      ),
      this.transform.r,
    )

    const uniforms = {
      worldViewProjection: m4.multiply(this.graphics.getViewProjection(), world),
      diffuseTex: this.tex,
    }

    gl.useProgram(this.programInfo.program)
    twgl.setBuffersAndAttributes(gl, this.programInfo, this.bufferInfo)
    twgl.setUniforms(this.programInfo, uniforms)
    twgl.drawBufferInfo(gl, this.bufferInfo)
  }
}
