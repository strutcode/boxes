import Game from './engine/Game'
import Entity from './engine/Entity'
import PhysicalBehavior from './engine/behaviors/PhysicalBehavior'
import VisualBehavior from './engine/behaviors/VisualBehavior'
import Vector from './engine/util/Vector'
import Strut from './Strut'
import ControlBehavior from './ControlBehavior'

Game.initialize()

// new Strut(new Vector(0, 0), new Vector(0, -10))
new Entity({
  behavior: [
    new PhysicalBehavior(),
    new VisualBehavior(),
    new ControlBehavior(),
  ],
})

new Entity({
  y: 20,
  r: 30,
  behavior: [
    new PhysicalBehavior({ size: 20, fixed: true }),
    new VisualBehavior({ size: 20 }),
  ],
})
