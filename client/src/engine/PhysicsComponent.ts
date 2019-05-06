import Component from './Component'
import Physics, { PhysicsBody } from './Physics'
import Entity from './Entity'

export default class PhysicsComponent extends Component {
  public body: PhysicsBody

  public constructor(size: number = 1, fixed: boolean = false) {
    super('physics')
    this.body = Physics.createBox(size, fixed)
  }

  public onCreate(entity: Entity): void {
    this.body.setTransform(entity.transform)
  }

  public onUpdate(entity: Entity): void {
    const { transform } = this.body

    entity.transform.x = transform.x
    entity.transform.y = transform.y
    entity.transform.r = transform.r
  }
}
