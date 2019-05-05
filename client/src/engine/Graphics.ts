import {
  Engine, Scene, Vector3, MeshBuilder, Mesh, HemisphericLight,
} from 'babylonjs'
import PanCamera2d from './PanCamera2d'
import Log from './Log'

export class CubeSprite {
  private mesh: Mesh

  public constructor(size: number) {
    this.mesh = MeshBuilder.CreateBox('cube', { size })
  }

  public setTransform(x: number, y: number, z: number): void {
    this.mesh.position.x = x
    this.mesh.position.y = y
    this.mesh.rotation.z = z
  }
}

export default class Graphics {
  private static engine: Engine
  private static scene: Scene
  public static camera: PanCamera2d

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

    Log.debug('- Starting engine')
    this.engine = new Engine(canvas, false)
    this.scene = new Scene(this.engine)

    new HemisphericLight('light1', new Vector3(1, 1, 0), this.scene)

    this.camera = new PanCamera2d('camera', new Vector3(0, 0, -20), this.scene)
    this.camera.attachControl(canvas, true)

    window.addEventListener('resize', (): void => {
      this.engine.resize()
    })

    // this.engine.runRenderLoop((): void => {
    //   this.scene.render()
    // })
  }

  public static render(): void {
    this.scene.render()
  }

  public static addCube(size: number): CubeSprite {
    return new CubeSprite(size)
  }
}
