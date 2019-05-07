import Game from './engine/Game'
import Entity from './engine/Entity'
import PhysicsComponent from './engine/PhysicsComponent'
import SpriteComponent from './engine/SpriteComponent'
import Vector from './engine/Vector'

Game.initialize()

const size = new Vector(0.5, 4)
new Entity([
  new PhysicsComponent({ size }),
  new SpriteComponent({ size }),
], {
  r: 10,
})

new Entity([
  new PhysicsComponent({ size: 20, fixed: true }),
  new SpriteComponent({ size: 20 }),
],
{
  y: 20,
  r: 30,
})
