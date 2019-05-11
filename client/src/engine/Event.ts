import Log from './Log'
import GameObject from './GameObject'

enum GameEventType {
  MouseOver,
  MouseMove,
  MouseOut,
  Click,
}

export default class GameEvent {
  public type: GameEventType

  public constructor(type: string, target: GameObject) {
    switch (type) {
      case 'click':
        this.type = GameEventType.Click
        break
      default:
        throw new Error(`Cannot bind invalid event "${type}"`)
    }
  }
}
