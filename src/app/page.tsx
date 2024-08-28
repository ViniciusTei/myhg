import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex-col items-center justify-between bg-undraw-bloom bg-contain bg-no-repeat bg-center">
      <h1 className="text-4xl font-semibold text-green-600">Welcome</h1>
      <p className="text-green-600">We’re glad that you are here!</p>
      <div className="items-center justify-center mt-auto">
        <Button className="mt-auto">
          <Link href="/login" scroll={false}>
            Let’s get started
          </Link>
        </Button>
      </div>
    </main>
  );
}
