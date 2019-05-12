import Behavior from './behaviors/Behavior'
import Game from './Game'
import Transform from './util/Transform'

export interface EntityOptions {
  x?: number
  y?: number
  r?: number
  behavior?: Behavior[]
}

export default class Entity {
  public readonly transform: Transform = new Transform()
  private behaviors: Behavior[]

  public constructor(options: EntityOptions = {}) {
    if (options.x) this.transform.x = options.x
    if (options.y) this.transform.y = options.y
    if (options.r) this.transform.r = options.r

    this.behaviors = options.behavior || []
    for (let i = 0; i < this.behaviors.length; i++) {
      this.behaviors[i].onCreate(this)
    }
  }

  public getComponent(name: string): Behavior | undefined {
    return this.behaviors.find(c => c.name === name)
  }

  public onUpdate(): void {
    for (let i = 0; i < this.behaviors.length; i++) {
      this.behaviors[i].onUpdate(this)
    }
  }

  public onPreRender(): void {
    for (let i = 0; i < this.behaviors.length; i++) {
      this.behaviors[i].onPreRender(this)
    }
  }

  public onDestroy(): void {
    for (let i = 0; i < this.behaviors.length; i++) {
      this.behaviors[i].onDestroy(this)
    }
  }
}
