import { FreeCamera } from 'babylonjs'

export default class PanCamera extends FreeCamera {
  public unitRatio: number = 0.01
  public invertX: boolean = true
  public invertY: boolean = false

  public attachControl(element: HTMLCanvasElement, preventDefault: boolean): void {
    document.addEventListener('pointerdown', (): void => {
      const onMove = (ev: MouseEvent): void => {
        this.pan(ev.movementX, ev.movementY)
      }

      const onRelease = (): void => {
        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerup', onRelease)
      }

      document.addEventListener('pointermove', onMove)
      document.addEventListener('pointerup', onRelease)
    })
  }

  public pan(deltaX: number, deltaY: number): void {
    this.position.x += deltaX * this.unitRatio * (this.invertX ? -1 : 1)
    this.position.y += deltaY * this.unitRatio * (this.invertY ? -1 : 1)
  }
}
