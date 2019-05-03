import { FreeCamera, Observable } from 'babylonjs'

interface ZoomEvent {
  camera: FreeCamera
  delta: number
}

export default class PanCamera extends FreeCamera {
  public unitRatio: number = 0.04
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
      const delta = Math.sign(deltaY) * (this.invertZ ? 1 : -1)

      this.position.z *= 1 - (delta * this.zoomRatio)
      this.onZoomObservable.notifyObservers({
        camera: this,
        delta,
      })

      if (preventDefault) ev.preventDefault()
    })
  }

  public pan(deltaX: number, deltaY: number): void {
    const scrollRatio = Math.abs(this.position.z * this.unitRatio)
    this.position.x += deltaX * scrollRatio * this.unitRatio * (this.invertX ? 1 : -1)
    this.position.y += deltaY * scrollRatio * this.unitRatio * (this.invertY ? 1 : -1)
  }
}
