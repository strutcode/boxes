import Game from './engine/Game'
import Entity from './engine/Entity'
import PhysicsComponent from './engine/PhysicsComponent'
import SpriteComponent from './engine/SpriteComponent'
import Vector from './engine/Vector'
import Strut from './Strut'
import ControlComponent from './ControlComponent'

Game.initialize()

// new Strut(new Vector(0, 0), new Vector(0, -10))
new Entity([
  new PhysicsComponent(),
  new SpriteComponent(),
  new ControlComponent(),
])

new Entity([
  new PhysicsComponent({ size: 20, fixed: true }),
  new SpriteComponent({ size: 20 }),
],
{
  y: 20,
  r: 30,
})
