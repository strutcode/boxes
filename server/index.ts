import 'reflect-metadata'
import express from 'express'
import { Entity, PrimaryGeneratedColumn, createConnection } from 'typeorm'

@Entity()
class Thing {
  @PrimaryGeneratedColumn()
  id: number | undefined;
}

(async () => {
  const db = await createConnection({
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [Thing],
      synchronize: true,
      logging: false
  })

  const port = process.env.PORT || 3000
  const app = express()

  app.get('/', async (req, res) => {
    await db.manager.save(new Thing())
    const things = await db.manager.find(Thing)
    res.json(things)
  })

  app.listen(port, () => {
    console.log(`App started on port ${port}`)
  })
})()
