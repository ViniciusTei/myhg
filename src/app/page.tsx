import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full flex flex-col items-center justify-between bg-undraw-bloom bg-contain bg-no-repeat bg-center md:bg-right md:bg-[length:600px_400px]">
      <h1 className="text-6xl font-semibold text-green-600 mt-24">Welcome</h1>
      <p className="text-green-600 text-lg">We’re glad that you are here!</p>
      <div className="items-center justify-center mt-auto mb-24">
        <Button className="mt-auto">
          <Link href="/login" scroll={false}>
            Let’s get started
          </Link>
        </Button>
      </div>
    </main>
  );
}
