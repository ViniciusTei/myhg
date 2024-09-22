import { turso } from "@/lib/turso"
import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export async function GET() {
  const queries = {
    lastDay: "SELECT * FROM grow_monitor WHERE datetime(time_iso) >= datetime('now', '-24 hours') ORDER BY time_iso;"
  }

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

    revalidateTag("grow-monitor")
    return NextResponse.json(
      {
        message: "Sucesso!",
        data: {
          current: currentInfoRows[0],
          all: allInfoRows,
        }
      },
      {
        status: 200,
      }
    )
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err, null, 2)}`)
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
