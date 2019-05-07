import Component from './Component'
import Graphics, { CubeSprite } from './Graphics'
import Entity from './Entity'
import Vector from './Vector'

interface SpriteComponentOptions {
  size?: number | Vector
}

export default class SpriteComponent extends Component {
  public sprite: CubeSprite

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
