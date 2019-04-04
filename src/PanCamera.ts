import { FreeCamera } from 'babylonjs'

export default class PanCamera extends FreeCamera {
  public attachControl(element: HTMLCanvasElement, preventDefault: boolean): void {
    console.log('attach control')

    document.addEventListener('mousedown', (): void => {
      console.log('mouse down')

      const onMove = (ev: MouseEvent): void => {
        this.pan(ev.movementX, ev.movementY)
      }

      const onRelease = (): void => {
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onRelease)
      }

      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onRelease)
    })
  }

  public pan(deltaX: number, deltaY: number): void {
    this.position.x += deltaX
    this.position.y += deltaY
  }
}
