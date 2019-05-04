import { Engine, Scene, Vector3 } from 'babylonjs'
import PanCamera2d from './PanCamera2d'
import Log from './Log'

export default class Graphics {
  private static engine: Engine
  private static scene: Scene

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

    const camera = new PanCamera2d('camera', new Vector3(0, 0, -20), this.scene)
    camera.attachControl(canvas, true)

    window.addEventListener('resize', (): void => {
      this.engine.resize()
    })

    this.engine.runRenderLoop((): void => {
      this.scene.render()
    })
  }
}
