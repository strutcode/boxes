import GameObject from './GameObject'
import GameEventType from './GameEventType'

export default class GameEvent {
  public type: GameEventType
  public target: GameObject

  public constructor(type: GameEventType, target: GameObject) {
    this.type = type
    this.target = target
  }
}
