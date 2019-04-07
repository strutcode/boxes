import { FreeCamera, Observable } from 'babylonjs'

interface ZoomEvent {
  camera: FreeCamera
  delta: number
}

export default class PanCamera extends FreeCamera {
  public unitRatio: number = 0.01
  public zoomRatio: number = 0.1
  public invertX: boolean = false
  public invertY: boolean = false
  public invertZ: boolean = false

  public onZoomObservable: Observable<ZoomEvent> = new Observable<ZoomEvent>()

  public attachControl(element: HTMLCanvasElement, preventDefault: boolean): void {
    element.addEventListener('pointerdown', (ev: MouseEvent): void => {
      const onMove = (mvEv: MouseEvent): void => {
        this.pan(mvEv.movementX, mvEv.movementY)
        if (preventDefault) mvEv.preventDefault()
      }

      const onRelease = (): void => {
        element.removeEventListener('pointermove', onMove)
        element.removeEventListener('pointerup', onRelease)
      }

      element.addEventListener('pointermove', onMove)
      element.addEventListener('pointerup', onRelease)

      if (preventDefault) ev.preventDefault()
    })

    element.addEventListener('wheel', (ev: WheelEvent): void => {
      const { deltaY } = ev
      const delta = deltaY * (this.invertZ ? 1 : -1)

      this.position.z += delta * this.zoomRatio
      this.onZoomObservable.notifyObservers({
        camera: this,
        delta,
      })

      if (preventDefault) ev.preventDefault()
    })
  }

  public pan(deltaX: number, deltaY: number): void {
    this.position.x += deltaX * this.unitRatio * (this.invertX ? 1 : -1)
    this.position.y += deltaY * this.unitRatio * (this.invertY ? 1 : -1)
  }
}
