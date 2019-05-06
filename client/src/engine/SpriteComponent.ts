import Component from './Component'
import Graphics, { CubeSprite } from './Graphics'
import Entity from './Entity'

export default class SpriteComponent extends Component {
  public sprite: CubeSprite

  public constructor(size: number = 1) {
    super('sprite')
    this.sprite = Graphics.addCube(size)
  }

  public onPreRender(entity: Entity): void {
    this.sprite.setTransform(entity.transform.x, entity.transform.y, entity.transform.r)
  }
}
