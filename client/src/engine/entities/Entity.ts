import Behavior from '../behaviors/Behavior'
import Transform from '../util/Transform'
import GameObject from '../GameObject'
import Game from '../Game'

export interface EntityOptions {
  x?: number
  y?: number
  r?: number
  behavior?: Behavior[]
}

export default class Entity extends GameObject {
  public readonly transform: Transform = new Transform()
  private behaviors: Behavior[]

  public constructor(options: EntityOptions = {}) {
    super()

    if (options.x) this.transform.x = options.x
    if (options.y) this.transform.y = options.y
    if (options.r) this.transform.r = options.r

    this.behaviors = options.behavior || []
    for (let i = 0; i < this.behaviors.length; i++) {
      this.behaviors[i].onCreate(this)
    }

    Game.addEntity(this)
  }

  public getBehavior<T extends Behavior>(behavior: new () => T): T | undefined {
    const instance = this.behaviors.find(c => c instanceof behavior)

    if (instance) {
      return instance as T
    }

    return undefined
  }

  public onUpdate(): void {
    for (let i = 0; i < this.behaviors.length; i++) {
      this.behaviors[i].onUpdate(this)
    }
  }

  public onLateUpdate(): void {
    for (let i = 0; i < this.behaviors.length; i++) {
      this.behaviors[i].onLateUpdate(this)
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
