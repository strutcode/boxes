import Behavior from './Behavior'
import Graphics from '../graphics/Graphics'
import Entity from '../Entity'
import Vector from '../util/Vector'
import Sprite from '../graphics/Sprite'

interface VisualBehaviorOptions {
  size?: number | Vector
}

export default class VisualBehavior extends Behavior {
  public sprite: Sprite

  public constructor(options: VisualBehaviorOptions = {}) {
    super('sprite')

    let { size } = options
    if (typeof size === 'number') {
      size = new Vector(size, size)
    }
    if (typeof size === 'undefined') {
      size = new Vector(1, 1)
    }

    this.sprite = Graphics.createSprite(size)
  }

  public onPreRender(entity: Entity): void {
    this.sprite.setTransform(entity.transform.x, entity.transform.y, entity.transform.r)
  }
}
