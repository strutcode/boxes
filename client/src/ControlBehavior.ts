import Behavior from './engine/behaviors/Behavior'
import Entity from './engine/Entity'
import PhysicalBehavior from './engine/behaviors/PhysicalBehavior'
import Vector from './engine/util/Vector'

interface ActiveMap {
  [key: string]: boolean
}

export default class ControlBehavior extends Behavior {
  public speed = 10
  private active: ActiveMap = {}

  public constructor() {
    super('control')
  }

  public onCreate(entity: Entity): void {
    window.addEventListener('keydown', (ev: KeyboardEvent) => {
      this.active[ev.key.toLowerCase()] = true
    })

    window.addEventListener('keyup', (ev: KeyboardEvent) => {
      this.active[ev.key.toLowerCase()] = false
    })
  }

  public onUpdate(entity: Entity): void {
    const physics = entity.getComponent('physics') as PhysicalBehavior

    if (this.active.a) {
      physics.addForce(new Vector(-this.speed, 0))
    }
    if (this.active.d) {
      physics.addForce(new Vector(this.speed, 0))
    }
  }
}
