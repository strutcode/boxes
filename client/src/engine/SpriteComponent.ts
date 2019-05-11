import Component from './Component'
import Graphics from './Graphics'
import Entity from './Entity'
import Vector from './Vector'
import Sprite from './Sprite'

interface SpriteComponentOptions {
  size?: number | Vector
}

export default class SpriteComponent extends Component {
  public sprite: Sprite

  public constructor(options: SpriteComponentOptions = {}) {
    super('sprite')

    let { size } = options
    if (typeof size === 'number') {
      size = new Vector(size, size)
    }
    if (typeof size === 'undefined') {
      size = new Vector(1, 1)
    }

    this.sprite = Graphics.addCube(size)
  }

  public onPreRender(entity: Entity): void {
    this.sprite.setTransform(entity.transform.x, entity.transform.y, entity.transform.r)
  }
}
