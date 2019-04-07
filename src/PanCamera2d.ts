import { Vector3, Scene, Camera } from 'babylonjs'
import PanCamera from './PanCamera'

interface PanCamera2dOptions {
  name?: string
  distance: number
}

export default class PanCamera2d extends PanCamera {
  public constructor(
    name: string,
    position: Vector3,
    scene: Scene,
    setActiveOnSceneIfNoneActive?: boolean,
  ) {
    super(name, position, scene, setActiveOnSceneIfNoneActive)

    const engine = this.getEngine()

    const setAspect = (): void => {
      const size = Math.abs(position.z)
      const aspect = engine.getScreenAspectRatio()

      this.orthoTop = -size
      this.orthoBottom = size
      this.orthoLeft = -size * aspect
      this.orthoRight = size * aspect
    }

    this.onZoomObservable.add((ev) => {
      setAspect()
    })

    this.mode = Camera.ORTHOGRAPHIC_CAMERA
    engine.onResizeObservable.add(setAspect)
    setAspect()
  }
}
