import Entity from '../entities/Entity'

export default abstract class Behavior {
  public readonly name: string

  public constructor(name: string) {
    this.name = name
  }

  /* eslint-disable class-methods-use-this, @typescript-eslint/no-unused-vars */
  public onCreate(entity: Entity): void {}
  public onUpdate(entity: Entity): void {}
  public onPreRender(entity: Entity): void {}
  public onLateUpdate(entity: Entity): void {}
  public onDestroy(entity: Entity): void {}
}
