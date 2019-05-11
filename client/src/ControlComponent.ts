import Component from './engine/Component'
import Entity from './engine/Entity'
import PhysicsComponent from './engine/PhysicsComponent'
import Vector from './engine/Vector'

interface ActiveMap {
  [key: string]: boolean
}

export default class ControlComponent extends Component {
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
    const physics = entity.getComponent('physics') as PhysicsComponent

    if (this.active.a) {
      physics.addForce(new Vector(-this.speed, 0))
    }
    if (this.active.d) {
      physics.addForce(new Vector(this.speed, 0))
    }
  }
}
