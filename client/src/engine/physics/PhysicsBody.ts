/* eslint-disable new-cap */
import {
  b2BodyDef, b2Body, b2Shape, b2FixtureDef, b2Fixture, b2World, b2BodyType, b2PolygonShape,
} from '@flyover/box2d'
import Transform from '../util/Transform'
import Vector from '../util/Vector'

const degreesToRadians = 0.0174533

export default class PhysicsBody {
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
