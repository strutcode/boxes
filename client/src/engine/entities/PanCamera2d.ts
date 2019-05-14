import Entity from './Entity'
import CameraBehavior from '../behaviors/CameraBehavior'
import InputBehavior from '../behaviors/InputBehavior'
import Vector from '../util/Vector'

export default class PanCamera2d extends Entity {
  private speed = 0.025

  public constructor() {
    super({
      behavior: [
        new CameraBehavior(),
        new InputBehavior({
          keymap: {
            pan: 'mouse0',
          },
        }),
      ],
    })
  }

  public onUpdate(): void {
    const input = this.getBehavior(InputBehavior) as InputBehavior
    const camera = this.getBehavior(CameraBehavior) as CameraBehavior

    if (input.inputActive('pan')) {
      const scrollRatio = 1 / camera.zoom

      camera.move(new Vector(
        -input.getAxis('mousex') * this.speed * scrollRatio,
        -input.getAxis('mousey') * this.speed * scrollRatio,
      ))
    }

    const zoomIncrement = 0.1
    camera.zoom *= 1 - (input.getAxis('mousez') * zoomIncrement)
  }
}
