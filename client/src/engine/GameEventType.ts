enum GameEventType {
  MouseOver,
  MouseMove,
  MouseOut,
  Click,
}

export function domEventName(type: GameEventType): string {
  switch (type) {
    case GameEventType.Click: return 'pointerdown'
    case GameEventType.MouseOver: return 'pointerover'
    case GameEventType.MouseMove: return 'pointermove'
    case GameEventType.MouseOut: return 'pointerout'
    default: return ''
  }
}

export default GameEventType
