type ComponentEventCallback = () => void

interface ComponentEventQueue {
  add: ComponentEventCallback[]
  update: ComponentEventCallback[]
  render: ComponentEventCallback[]
  destroy: ComponentEventCallback[]
}

export default class Component {
  public readonly name: string
  private events: ComponentEventQueue = {
    add: [],
    update: [],
    render: [],
    destroy: [],
  }

  public constructor(name: string) {
    this.name = name
  }

  public onAdd(callback: ComponentEventCallback): void {
    this.events.add.push(callback)
  }

  public onUpdate(callback: ComponentEventCallback): void {
    this.events.update.push(callback)
  }

  public onRender(callback: ComponentEventCallback): void {
    this.events.render.push(callback)
  }

  public onDestroy(callback: ComponentEventCallback): void {
    this.events.destroy.push(callback)
  }
}
