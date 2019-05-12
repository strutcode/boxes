import Game from './engine/Game'
import PhysicalBehavior from './engine/behaviors/PhysicalBehavior'
import VisualBehavior from './engine/behaviors/VisualBehavior'
import ControlBehavior from './ControlBehavior'

const game = new Game()

// new Strut(new Vector(0, 0), new Vector(0, -10))
game.createEntity({
  behavior: [
    new PhysicalBehavior(),
    new VisualBehavior(),
    new ControlBehavior(),
  ],
})

game.createEntity({
  y: 20,
  r: 30,
  behavior: [
    new PhysicalBehavior({ size: 20, fixed: true }),
    new VisualBehavior({ size: 20 }),
  ],
})
