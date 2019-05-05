import Component from './Component'
import Game from './Game'
import Transform from './Transform'

interface EntityOptions {
  x?: number
  y?: number
  r?: number
}

export default class Entity {
  private components: Component[]
  public readonly transform: Transform = new Transform()

  public constructor(components: Component[], options: EntityOptions = {}) {
    const defaults: EntityOptions = {
      x: 0,
      y: 0,
      r: 0,
    }

    Object.assign(this.transform, defaults, options)

    this.components = components
    for (let i = 0; i < this.components.length; i++) {
      this.components[i].onCreate(this)
    }

    Game.$addEntity(this)
  }

  public getComponent(name: string): Component | undefined {
    return this.components.find(c => c.name === name)
  }

  public destroy(): void {
    Game.$remEntity(this)
  }

  public onUpdate(): void {
    for (let i = 0; i < this.components.length; i++) {
      this.components[i].onUpdate(this)
    }
  }

  public onPreRender(): void {
    for (let i = 0; i < this.components.length; i++) {
      this.components[i].onPreRender(this)
    }
  }

  public onDestroy(): void {
    for (let i = 0; i < this.components.length; i++) {
      this.components[i].onDestroy(this)
    }
  }
}
