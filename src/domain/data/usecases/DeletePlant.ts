import { Client } from '@libsql/client/http';

export class DeletePlant {
  constructor(
    private readonly conn: Client
  ) { }

  async delete(id: number) {
    await this.conn.execute({
      sql: 'DELETE FROM plants WHERE id == ?',
      args: [id]
    })
  }
}
