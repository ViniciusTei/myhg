import { Client } from '@libsql/client/http';
import { PlantModel } from '../models';
import { BadRequestError } from '@/domain/errors';

export class AddPlant {
  constructor(
    private readonly conn: Client
  ) { }

  async add({ type, name, description, thumbnail }: PlantModel) {
    const { rows } = await this.conn.execute({
      sql: 'SELECT * FROM plant_type WHERE id == ?',
      args: [type]
    })

    if (rows.length === 0) {
      throw new BadRequestError()
    }

    const { lastInsertRowid } = await this.conn.execute({
      sql: 'INSERT INTO plants (type, name, description, thumbnail) VALUES (?, ?, ?, ?)',
      args: [type, name, description, thumbnail ?? null]
    })

    return lastInsertRowid

  }
}
