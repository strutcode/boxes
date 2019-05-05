import Graphics, { CubeSprite } from './Graphics'
import Physics, { PhysicsBody } from './Physics'
import Log from './Log'

export enum GameState {
  MAINMENU,
  LOADING,
  RUNNING,
  PAUSED
}

export default class Game {
  public readonly state: GameState = GameState.MAINMENU
  private lastTime: number = performance.now()
  private box: PhysicsBody
  private sprite: CubeSprite

  public constructor() {
    Log.info('Game starting')
    Graphics.initialize()
    Physics.initialize()

    const floor = Physics.createBox(20, true)
    floor.setPosition(0, 20)

    this.box = Physics.createBox(1)
    this.box.setRotation(44)
    this.sprite = Graphics.addCube(1)

    window.requestAnimationFrame((): void => {
      this.update()
    })
  }

  private update(): void {
    const currentTime = performance.now()
    const dt = (currentTime - this.lastTime) / 1000

    Physics.update(dt)

    this.sprite.setTransform(
      this.box.transform.x,
      this.box.transform.y,
      this.box.transform.z,
    )
    Graphics.render()

    this.lastTime = currentTime

    window.requestAnimationFrame((): void => {
      this.update()
    })
  }
}
