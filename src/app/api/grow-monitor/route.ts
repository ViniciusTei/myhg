import { turso } from "@/lib/turso"
import { NextResponse } from "next/server"

export async function GET(request: Request, response: Response) {
  const client = turso()
  const { rows: currentInfoRows } = await client.execute('SELECT * from grow_monitor order by id DESC limit 1')

  if (currentInfoRows.length !== 1) {
    return NextResponse.json(
      {
        message: "Error! Cannot get current info."
      },
      {
        status: 500,
      }
    )
  }

  const { rows: allInfoRows } = await client.execute('SELECT * from grow_monitor')

  if (allInfoRows.length === 0) {
    return NextResponse.json(
      {
        message: "Error! Cannot get all info."
      },
      {
        status: 500,
      }
    )
  }

  return NextResponse.json(
    {
      message: "Sucesso!",
      data: {
        current: currentInfoRows[0],
        all: allInfoRows
      }
    },
    {
      status: 200,
    }
  )
}

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
