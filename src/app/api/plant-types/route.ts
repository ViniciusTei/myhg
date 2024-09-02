import { turso } from "@/lib/turso"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function GET() {
  const user = cookies().get('user.id')

  if (!user) {
    redirect('/login')
  }

  const { rows } = await turso().execute('SELECT * FROM plant_type')

  return Response.json({
    data: rows ?? []
  })
}
