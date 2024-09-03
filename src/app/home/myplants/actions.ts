'use server'

import AuthenticatedAction from "@/lib/authenticated-action"
import { turso } from "@/lib/turso"

import { Plants } from './schema'
import { revalidatePath } from "next/cache"

export async function create(data: Plants) {
  try {
    AuthenticatedAction()
    const conn = turso()
    const { type, name, description, thumbnail } = data
    const { rows } = await conn.execute({
      sql: 'SELECT * FROM plant_type WHERE id == ?',
      args: [type]
    })

    if (rows.length === 0) {
      throw new Error('The selected type does not existis.')
    }

    const { lastInsertRowid } = await conn.execute({
      sql: 'INSERT INTO plants (type, name, description, thumbnail) VALUES (?, ?, ?, ?)',
      args: [type, name, description, thumbnail ?? null]
    })

    revalidatePath('/home/myplants')
    return {
      code: "SUCCESS",
      message: `Inserted ${name} into database successfully!`,
      data: {
        id: lastInsertRowid,
        ...data,
      }
    }
  } catch (err) {
    return {
      code: "ERROR",
      message: err
    }
  }

}
