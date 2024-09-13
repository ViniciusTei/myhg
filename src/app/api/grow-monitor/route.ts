import { turso } from "@/lib/turso"
import { NextResponse } from "next/server"

export async function POST(request: Request, response: Response) {
  const data = await request.json()
  if (!data || !data.temperature || !data.humidity) {
    return Response.json({
      message: "Missing data!"
    })
  }
  const date = new Date()
  let d = (new Intl.DateTimeFormat(
    'pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(date))
  const { temperature, humidity } = data
  await turso().execute({
    sql: 'INSERT INTO grow_monitor (time, temperature, humidity) VALUES (?, ?, ?)',
    args: [d, temperature, humidity]
  })

  return NextResponse.json(
    {
      message: "Success!"
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Origin": "*"
      }
    }
  )
}
