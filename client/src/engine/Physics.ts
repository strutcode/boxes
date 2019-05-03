import { b2Vec2, b2World } from '@flyover/box2d'

/* eslint-disable new-cap */
export default class Physics {
  public static gravity: b2Vec2
  private static world: b2World

  public static create(): void {
    Physics.gravity = new b2Vec2(0, 9.87)
    Physics.world = new b2World(Physics.gravity)
  }
}
