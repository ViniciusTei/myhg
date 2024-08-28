import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <main>
      <header className="bg-white">
        <h1>My Plants</h1>

        <Input type="text" placeholder="Search plants" />
      </header>
    </main>
  )
}
