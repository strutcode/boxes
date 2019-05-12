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
  private behaviors: Behavior[]
  public readonly transform: Transform = new Transform()

  public constructor(options: EntityOptions = {}) {
    const defaults: EntityOptions = {
      x: 0,
      y: 0,
      r: 0,
    }

    Object.assign(this.transform, defaults, options)

    this.behaviors = options.behavior || []
    for (let i = 0; i < this.behaviors.length; i++) {
      this.behaviors[i].onCreate(this)
    }

    Game.$addEntity(this)
  }

  public getComponent(name: string): Behavior | undefined {
    return this.behaviors.find(c => c.name === name)
  }

  public destroy(): void {
    Game.$remEntity(this)
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
