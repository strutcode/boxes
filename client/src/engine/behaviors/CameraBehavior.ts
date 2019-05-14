import Behavior from './Behavior'
import Camera2d from '../graphics/Camera2d'
import Vector from '../util/Vector'

interface CameraBehaviorOptions {
  zoom?: number
}

export default class CameraBehavior extends Behavior {
  private camera: Camera2d

  public constructor(options: CameraBehaviorOptions = {}) {
    super('camera')

    this.camera = new Camera2d()

    if (options.zoom) {
      this.camera.zoom = options.zoom
    }
  }

  public move(delta: Vector): void {
    this.camera.transform.translate(delta)
  }

  public get zoom(): number {
    return this.camera.zoom
  }

  public set zoom(value: number) {
    this.camera.zoom = value
  }
}
