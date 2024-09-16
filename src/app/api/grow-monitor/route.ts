import { turso } from "@/lib/turso"
import { NextResponse } from "next/server"

const queries = {
  lastDay: 'SELECT *, strftime(\'%Y-%m-%d %H:00\', time_iso) as hour_group FROM grow_monitor WHERE datetime(time_iso) >= datetime(\'now\', \'-24 hours\') ORDER BY time_iso;'
}

export async function GET(request: Request, response: Response) {
  try {

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

    const { rows: allInfoRows } = await client.execute(queries.lastDay)

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

    const selectedRows = [];

    const groupedByHour = allInfoRows.reduce((acc, row) => {
      const hourGroup = row.hour_group as unknown as any;
      if (!hourGroup) return acc
      if (!acc[hourGroup]) {
        acc[hourGroup] = [];
      }
      acc[hourGroup].push(row);
      return acc;
    }, {} as any);

    for (const hour in groupedByHour) {
      const records = groupedByHour[hour];

      // Se existirem 5 ou menos registros, mantemos todos
      if (records.length <= 5) {
        selectedRows.push(...records);
      } else {
        // Pegar o primeiro, três do meio, e o último
        const first = records[0];
        const last = records[records.length - 1];

        // Calcular o meio
        const midStart = Math.floor((records.length - 1) / 2) - 1;
        const middleRecords = records.slice(midStart, midStart + 3);

        selectedRows.push(first, ...middleRecords, last);
      }
    }

    return NextResponse.json(
      {
        message: "Sucesso!",
        data: {
          current: currentInfoRows[0],
          all: selectedRows
        }
      },
      {
        status: 200,
      }
    )
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error!",
        error: err
      },
      {
        status: (err as any).status ?? 500,
      }
    )
  }
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
