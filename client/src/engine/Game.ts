import Graphics from './Graphics'
import Physics from './Physics'
import Log from './Log'

export enum GameState {
  MAINMENU,
  LOADING,
  RUNNING,
  PAUSED
}

export default class Game {
  public readonly state: GameState = GameState.MAINMENU

  public constructor() {
    Log.info('Game starting')
    Graphics.initialize()
    Physics.initialize()
  }
}
