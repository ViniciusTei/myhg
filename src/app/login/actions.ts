'use server'
import { turso } from "@/lib/turso"
import { cookies } from "next/headers"

type LoginResponse = {
  error?: any
}

export async function login(data: { email: string, password: string }) {
  const response = {} as LoginResponse
  try {
    const { rows } = await turso().execute({
      sql: "SELECT * FROM auth WHERE email = ?",
      args: [data.email],
    })
    console.log(rows)
    if (rows.length && rows[0]) {
      cookies().set('user.email', rows[0]["email"] as string)
      cookies().set('user.id', rows[0]["id"] as string)
    } else {
      response.error = "User not found!"
    }
  } catch (err) {
    console.log(err)
    response.error = err
  }

  return response
}
