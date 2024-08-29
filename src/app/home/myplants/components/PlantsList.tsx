import Image from "next/image"
import AddPlantsButton from "./AddPlantsButton"

import { turso } from "@/lib/turso"

export default function PlantsList() {
  const plants = turso().execute({
    sql: "",
    args: []
  })
  return (
    <div className="mx-auto h-full w-full max-w-screen-md flex flex-col items-center justify-center">
      <EmptyList />

      <div className="mt-auto mb-36">
        <AddPlantsButton />
      </div>
    </div>
  )
}

function EmptyList() {
  return (
    <>
      <Image src="/Plant/illustration.png" width={200} height={255} alt="Image" className="rounded-md object-cover mt-24" />
      <h2 className="text-2xl font-bold mt-8">Lets get started</h2>
      <p className="text-gray-500 mx-auto max-w-sm px-8 text-center">Get professional plant care guidance to keep your plant alive!</p>
    </>
  )
}
