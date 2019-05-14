import Game from './engine/Game'
import PhysicalBehavior from './engine/behaviors/PhysicalBehavior'
import VisualBehavior from './engine/behaviors/VisualBehavior'
import ControlBehavior from './ControlBehavior'
// import CameraBehavior from './engine/behaviors/CameraBehavior'
import PanCamera2d from './engine/entities/PanCamera2d'
import Entity from './engine/entities/Entity'
// import Strut from './Strut'

Game.initialize()

// Game.createEntity({
//   behavior: [
//     new CameraBehavior({ zoom: 0.05 }),
//   ],
// })
new PanCamera2d()

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
