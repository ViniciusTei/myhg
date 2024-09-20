import { turso } from "@/lib/turso"
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

    //const selectedRows = [];
    //
    //const groupedByHour = allInfoRows.reduce((acc, row) => {
    //  const hourGroup = row.hour_group as unknown as any;
    //  if (!hourGroup) return acc
    //  if (!acc[hourGroup]) {
    //    acc[hourGroup] = [];
    //  }
    //  acc[hourGroup].push(row);
    //  return acc;
    //}, {} as any);
    //
    //for (const hour in groupedByHour) {
    //  const records = groupedByHour[hour];
    //
    //  // Se existirem 5 ou menos registros, mantemos todos
    //  if (records.length <= 5) {
    //    selectedRows.push(...records);
    //  } else {
    //    // Pegar o primeiro, três do meio, e o último
    //    const first = records[0];
    //    const last = records[records.length - 1];
    //
    //    // Calcular o meio
    //    const midStart = Math.floor((records.length - 1) / 2) - 1;
    //    const middleRecords = records.slice(midStart, midStart + 3);
    //
    //    selectedRows.push(first, ...middleRecords, last);
    //  }
    //}

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
