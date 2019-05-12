import Behavior from './Behavior'
import Entity from '../Entity'
import Vector from '../util/Vector'
import Sprite from '../graphics/Sprite'

interface VisualBehaviorOptions {
  size?: number | Vector
}

export default class VisualBehavior extends Behavior {
  public sprite: Sprite | undefined
  private options: VisualBehaviorOptions

  public constructor(options: VisualBehaviorOptions = {}) {
    super('sprite')

    this.options = options
  }

  public onCreate(entity: Entity): void {
    const { size } = this.options
    let vecSize

    if (size instanceof Vector) {
      vecSize = size
    }
    else if (typeof size === 'number') {
      vecSize = new Vector(size, size)
    }
    else {
      vecSize = new Vector(1, 1)
    }

    this.sprite = entity.game.graphics.createSprite(vecSize)
  }

  public onPreRender(entity: Entity): void {
    (this.sprite as Sprite).setTransform(entity.transform.x, entity.transform.y, entity.transform.r)
  }
}
