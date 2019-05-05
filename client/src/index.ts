import Game from './engine/Game'
import Entity from './engine/Entity'
import PhysicsComponent from './engine/PhysicsComponent'
import SpriteComponent from './engine/SpriteComponent'

Game.initialize()

new Entity([
  new PhysicsComponent(),
  new SpriteComponent(),
])

new Entity([
  new PhysicsComponent(20, true),
  new SpriteComponent(20),
],
{
  y: 20,
  r: 30,
})
