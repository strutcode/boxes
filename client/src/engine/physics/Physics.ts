/* eslint-disable new-cap */
import {
  b2Vec2, b2World,
} from '@flyover/box2d'
import Log from '../util/Log'
import Vector from '../util/Vector'
import PhysicsBody from './PhysicsBody'

const frameRate = 30
const timeStep = 1 / frameRate
const velocityIterations = 6
const positionIterations = 2

export default class Physics {
  public gravity: b2Vec2
  private world: b2World
  private time: number = 0

  public constructor() {
    Log.info('Initializing physics')

    Log.debug('- Create world')
    this.gravity = new b2Vec2(0, 9.87)
    this.world = new b2World(this.gravity)
  }

  public update(delta: number): void {
    this.time += delta

    while (this.time >= timeStep) {
      this.world.Step(timeStep, velocityIterations, positionIterations)
      this.time -= timeStep
    }
  }

  public createBox(size: Vector, fixed: boolean = false): PhysicsBody {
    const body = new PhysicsBody(this.world, fixed)
    body.setBox(size.x, size.y)
    return body
  }
}
