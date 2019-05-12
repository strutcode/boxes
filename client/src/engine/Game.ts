import Graphics from './graphics/Graphics'
import Physics from './physics/Physics'
import Log from './util/Log'
import Entity, { EntityOptions } from './Entity'
import Scene from './Scene'

export default class Game {
  private lastTime: number = performance.now()
  private entities: Entity[] = []
  private activeScene: Scene | null = null

  public readonly graphics: Graphics
  public readonly physics: Physics

  public constructor() {
    Log.info('Game starting')
    this.graphics = new Graphics()
    this.physics = new Physics()

    window.requestAnimationFrame((t) => {
      this.update(t)
    })
  }

  private update(time: number): void {
    const currentTime = performance.now()
    const dt = (currentTime - this.lastTime) / 1000

    let i
    for (i = 0; i < this.entities.length; i++) {
      this.entities[i].onUpdate()
    }

    this.physics.update(dt)

    for (i = 0; i < this.entities.length; i++) {
      this.entities[i].onPreRender()
    }
    this.graphics.render(time)

    this.lastTime = currentTime

    window.requestAnimationFrame((t) => {
      this.update(t)
    })
  }

  // public on(event: string, callback: (event: Event) => void): void {
  //   window.addEventListener(event, callback)
  // }

  public createEntity(options: EntityOptions): Entity {
    const entity = new Entity(this, options)

    this.entities.push(entity)

    return entity
  }
}
