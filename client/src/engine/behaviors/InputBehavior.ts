import Behavior from './Behavior'
import Game from '../Game'

interface Keymap {
  [key: string]: string | string[]
}

interface ReverseKeymap {
  [key: string]: string
}

interface ActiveMap {
  [key: string]: boolean
}

interface AxisMap {
  [axis: string]: number
}

export interface InputBehaviorOptions {
  keymap?: Keymap
}

export default class InputBehavior extends Behavior {
  private activeLastFrame: ActiveMap = {}
  private active: ActiveMap = {}
  private keymap: Keymap = {}
  private reverseKeymap: ReverseKeymap = {}
  private axis: AxisMap = {}

  public constructor(options: InputBehaviorOptions = {}) {
    super('input')

    if (options.keymap) {
      Object.entries(options.keymap).forEach(([action, inputs]) => {
        if (typeof inputs === 'string') {
          this.reverseKeymap[inputs] = action
        }
        else {
          inputs.forEach((input) => {
            this.reverseKeymap[input] = action
          })
        }
      })
    }

    this.axis = {
      mousex: 0,
      mousey: 0,
      mousez: 0,
    }
  }

  public onCreate(): void {
    const el = Game.graphics.getDomElement()

    el.addEventListener('keydown', (ev: KeyboardEvent) => {
      this.updateInput(ev.key.toLowerCase(), true)
    })

    el.addEventListener('keyup', (ev: KeyboardEvent) => {
      this.updateInput(ev.key.toLowerCase(), false)
    })

    el.addEventListener('pointerdown', (ev: MouseEvent) => {
      this.updateInput(`mouse${ev.button}`, true)
    })
    el.addEventListener('pointerup', (ev: MouseEvent) => {
      this.updateInput(`mouse${ev.button}`, false)
    })
    el.addEventListener('pointermove', (ev: MouseEvent) => {
      this.axis.mousex += ev.movementX
      this.axis.mousey += ev.movementY
    })
    el.addEventListener('wheel', (ev: WheelEvent) => {
      this.axis.mousez += ev.deltaY
    })
  }

  public onLateUpdate(): void {
    this.activeLastFrame = { ...this.active }
    this.axis.mousex = this.axis.mousey = this.axis.mousez = 0
  }

  public inputActive(action: string): boolean {
    return this.active[action]
  }

  public inputTriggered(action: string): boolean {
    return this.active[action] && !this.activeLastFrame[action]
  }

  public getAxis(name: string): number {
    if (this.axis[name] == null) {
      throw new Error(`Non-existent axis: '${name}'`)
    }

    return this.axis[name]
  }

  private updateInput(key: string, state: boolean): void {
    const action = this.reverseKeymap[key]

    if (action) {
      if (state) this.active[action] = true
      else delete this.active[action]
    }
  }
}
