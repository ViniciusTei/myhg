import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PlantsList from "./components/PlantsList";

export default function Page() {
  return (
    <main className="h-full w-full">
      <header className="bg-white w-full max-w-screen-md mx-auto p-4">
        <h1 className="font-bold mb-4">My Plants</h1>
        <div className="relative">
          <Input type="text" placeholder="Search plants" className="w-full rounded-full border border-gray-300 py-2 pl-4 pr-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
      </header>
      <PlantsList />
    </main>
  )
}
