import Graphics from './graphics/Graphics'
import Physics from './physics/Physics'
import Log from './util/Log'
import Entity, { EntityOptions } from './Entity'
import Scene from './Scene'

export default class Game {
  private static lastTime: number = performance.now()
  private static entities: Entity[] = []
  private static activeScene: Scene | null = null

  public static initialize(): void {
    Log.info('Game starting')
    Graphics.initialize()
    Physics.initialize()

    window.requestAnimationFrame((t) => {
      this.update(t)
    })
  }

  public static runScene(scene: Scene): void {}

  private static update(time: number): void {
    const currentTime = performance.now()
    const dt = (currentTime - this.lastTime) / 1000

    let i
    for (i = 0; i < this.entities.length; i++) {
      this.entities[i].onUpdate()
    }

    Physics.update(dt)

    for (i = 0; i < this.entities.length; i++) {
      this.entities[i].onPreRender()
    }
    Graphics.render(time)

    this.lastTime = currentTime

    window.requestAnimationFrame((t) => {
      this.update(t)
    })
  }

  public static on(event: string, callback: (event: Event) => void): void {
    window.addEventListener(event, callback)
  }

  public static createEntity(options: EntityOptions): Entity {
    return new Entity(options)
  }

  public static $addEntity(ent: Entity): void {
    this.entities.push(ent)
  }

  public static $remEntity(ent: Entity): void {
    this.entities = this.entities.filter(e => e !== ent)
  }
}
