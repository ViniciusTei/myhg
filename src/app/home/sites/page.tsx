import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { turso } from "@/lib/turso"

import SiteInfoCard from "./components/SiteInfoCard";

export default async function SitesPage() {
  const client = turso()

  const { rows: currentInfoRows } = await client.execute('SELECT * from grow_monitor order by id DESC limit 1')
  if (currentInfoRows.length !== 1) {
    throw new Error("Error! Cannot get current info.")
  }

  const { rows: allInfoRows } = await client.execute("SELECT * FROM grow_monitor WHERE datetime(time_iso) >= datetime('now', '-24 hours') ORDER BY time_iso;")
  if (allInfoRows.length === 0) {
    throw new Error("Error! Cannot get all info.")
  }

  const currentInfo = Object.assign({}, currentInfoRows[0]) as any
  const allInfo = allInfoRows.map((row: any) => Object.assign({}, row)) as any

  return (
    <div className="w-full overflow-y-auto pb-14">
      <header className="bg-white w-full max-w-screen-md mx-auto p-4 sticky top-0 z-50">
        <h1 className="font-bold mb-4">Sites</h1>
        <div className="relative">
          <Input type="text" placeholder="Search sites" className="w-full rounded-full border border-gray-300 py-2 pl-4 pr-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>

      </header>

      <div className="max-w-screen-sm mx-auto mt-4">
        <SiteInfoCard currentInfo={currentInfo} allInfo={allInfo} />
      </div>
    </div>
  )
}
