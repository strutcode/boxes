import Graphics from './Graphics'
import Physics from './Physics'
import Log from './Log'
import Entity from './Entity'

export enum GameState {
  MAINMENU,
  LOADING,
  RUNNING,
  PAUSED
}

export default class Game {
  private static $state: GameState = GameState.MAINMENU
  private static lastTime: number = performance.now()
  private static entities: Entity[] = []

  public static initialize(): void {
    Log.info('Game starting')
    Graphics.initialize()
    Physics.initialize()

    window.requestAnimationFrame((): void => {
      this.update()
    })
  }

  private static update(): void {
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
    Graphics.render()

    this.lastTime = currentTime

    window.requestAnimationFrame((): void => {
      this.update()
    })
  }

  public static $addEntity(ent: Entity): void {
    this.entities.push(ent)
  }

  public static $remEntity(ent: Entity): void {
    this.entities = this.entities.filter(e => e !== ent)
  }
}
