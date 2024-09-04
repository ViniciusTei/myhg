import Image from "next/image"
import { revalidatePath } from "next/cache"

import { DeletePlant } from "@/domain/data/usecases/DeletePlant"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { turso } from "@/lib/turso"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

import AddPlantsButton from "./AddPlantsButton"
import PlantCard from "./PlantCard"
import { PlantModel } from "@/domain/data/models"

export default async function PlantsList() {
  const { rows: plants } = await turso().execute("SELECT * FROM plants")

  async function deletePlant(plantId: number) {
    console.log('delelete plant', plantId)
  }

  return (
    <div className="mx-auto w-full max-w-screen-md flex flex-col items-center justify-center">
      {!plants || plants.length === 0 && <EmptyList />}

      {plants.map((plant) => (
        <PlantCard key={plant.id as number} plant={plant as any} />
      ))}

      <div className="fixed bottom-20">
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
