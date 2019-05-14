import Graphics from './graphics/Graphics'
import Physics from './physics/Physics'
import Log from './util/Log'
import Entity from './entities/Entity'
import Scene from './Scene'
import GameEvent from './GameEvent'
import GameObject from './GameObject'
import GameEventType, { domEventName } from './GameEventType'

export default class Game extends GameObject {
  private static lastTime: number = performance.now()
  private static entities: Entity[] = []
  private static activeScene: Scene | null = null

  public static graphics: Graphics
  public static physics: Physics

  public static initialize(): void {
    Log.info('Game starting')
    this.graphics = new Graphics()
    this.physics = new Physics()

    window.requestAnimationFrame((t) => {
      this.update(t)
    })
  }

  private static update(time: number): void {
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

    for (i = 0; i < this.entities.length; i++) {
      this.entities[i].onLateUpdate()
    }
    this.lastTime = currentTime

    window.requestAnimationFrame((t) => {
      this.update(t)
    })
  }

  public static on(event: GameEventType, callback: (event: GameEvent) => void): void {
    const eventName = domEventName(event)
    this.graphics.getDomElement().addEventListener(eventName, () => {
      callback(new GameEvent(event, this))
    })
  }

  public static addEntity(entity: Entity): void {
    this.entities.push(entity)
  }
}
