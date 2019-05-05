import Component from './Component'

export default class Entity {
  private components: Component[]

  public constructor(components: Component[], options: object) {
    this.components = components
  }
}
