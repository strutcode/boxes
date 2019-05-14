import Game from '../Game'
import Behavior from './Behavior'
import Entity from '../entities/Entity'
import Vector from '../util/Vector'
import Sprite from '../graphics/Sprite'

interface VisualBehaviorOptions {
  size?: number | Vector
}

export default class VisualBehavior extends Behavior {
  public sprite: Sprite | undefined

  public constructor(options: VisualBehaviorOptions = {}) {
    super('sprite')

    const { size } = options
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

    this.sprite = Game.graphics.createSprite(vecSize)
  }

  public onPreRender(entity: Entity): void {
    (this.sprite as Sprite).setTransform(entity.transform.x, entity.transform.y, entity.transform.r)
  }
}
