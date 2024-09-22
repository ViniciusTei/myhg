'use server'
import { revalidatePath } from "next/cache"

import { AddPlant, DeletePlant } from "@/domain/data/usecases"
import getAuthenticatedUserAction from "@/lib/authenticated-action"
import { turso } from "@/lib/turso"

import { Plants } from './schema'

export async function create(data: Plants) {
  try {
    const user = getAuthenticatedUserAction()
    const conn = turso()

    await new AddPlant(conn).add({
      ...data,
      owner: user.id as unknown as number
    })

    revalidatePath('/home/myplants')
  } catch (err) {
    return {
      code: "ERROR",
      message: err
    }
  }
}

export async function remove(id: number) {
  try {
    getAuthenticatedUserAction()
    const conn = turso()
    await new DeletePlant(conn).delete(id)
    revalidatePath('/home/myplants')
  } catch (err) {
    return {
      code: "ERROR",
      message: err
    }
  }
}
