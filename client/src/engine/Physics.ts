/* eslint-disable new-cap */
import {
  b2Vec2, b2World, b2BodyDef, b2PolygonShape, b2Body, b2FixtureDef, b2BodyType, b2Shape, b2Fixture,
} from '@flyover/box2d'
import Log from './Log'
import Transform from './Transform'
import Vector from './Vector'

const degreesToRadians = 0.0174533
const frameRate = 30
const timeStep = 1 / frameRate
const velocityIterations = 6
const positionIterations = 2

export class PhysicsBody {
  private bodyDef: b2BodyDef
  private body: b2Body
  private shape: b2Shape | undefined
  private fixtureDef: b2FixtureDef | undefined
  private fixture: b2Fixture | undefined

  public constructor(world: b2World, fixed: boolean) {
    this.bodyDef = new b2BodyDef()
    if (!fixed) this.bodyDef.type = b2BodyType.b2_dynamicBody
    this.body = world.CreateBody(this.bodyDef)
  }

  public setTransform(t: Transform): void;
  public setTransform(x: number, y: number, r: number): void;
  public setTransform(x: number | Transform, y?: number, r?: number): void {
    if (typeof x !== 'number') {
      this.body.SetPositionXY(x.x, x.y)
      this.body.SetAngle(x.r * degreesToRadians)
    }
    else {
      this.body.SetPositionXY(x, y as number)
      this.body.SetAngle((r as number) * degreesToRadians)
    }
  }

  public setBox(width: number, height: number): void {
    this.shape = new b2PolygonShape();
    (this.shape as b2PolygonShape).SetAsBox(width / 2, height / 2)

    this.fixtureDef = new b2FixtureDef()
    this.fixtureDef.shape = this.shape
    this.fixtureDef.density = 1
    this.fixtureDef.friction = 0.3

    let fixture: b2Fixture | null
    // eslint-disable-next-line no-cond-assign
    while (fixture = this.body.GetFixtureList()) {
      this.body.DestroyFixture(fixture)
    }

    this.fixture = this.body.CreateFixture(this.fixtureDef)
  }

  public get transform(): Transform {
    return {
      x: this.body.GetPosition().x,
      y: this.body.GetPosition().y,
      r: this.body.GetAngle(),
    }
  }

  public addForce(amount: Vector): void {
    this.body.ApplyForce({
      x: amount.x,
      y: amount.y,
    }, {
      x: this.transform.x,
      y: this.transform.y,
    })
  }
}

export default class Physics {
  public static gravity: b2Vec2
  private static world: b2World
  private static time: number = 0

  public static initialize(): void {
    Log.info('Initializing physics')

    Log.debug('- Create world')
    this.gravity = new b2Vec2(0, 9.87)
    this.world = new b2World(this.gravity)

    // Log.debug('- Starting world step loop')
    // setInterval(() => {
    //   this.world.Step(timeStep, velocityIterations, positionIterations)
    // }, 1000 / frameRate)
  }

  public static update(delta: number): void {
    this.time += delta

    while (this.time >= timeStep) {
      this.world.Step(timeStep, velocityIterations, positionIterations)
      this.time -= timeStep
    }
  }

  public static createBox(size: Vector, fixed: boolean = false): PhysicsBody {
    const body = new PhysicsBody(this.world, fixed)
    body.setBox(size.x, size.y)
    return body
  }
}
