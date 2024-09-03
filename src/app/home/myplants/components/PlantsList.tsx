import Image from "next/image"

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
import { revalidatePath } from "next/cache"

export default async function PlantsList() {
  const { rows: plants } = await turso().execute("SELECT * FROM plants")

  async function deletePlant(plantId: number) {
    await turso().execute({
      sql: 'DELETE FROM plants WHERE id == ?',
      args: [plantId]
    })
    revalidatePath('/home/myplants')
  }

  return (
    <div className="mx-auto w-full max-w-screen-md flex flex-col items-center justify-center">
      {!plants || plants.length === 0 && <EmptyList />}

      {plants.map((plant) => (
        <Card key={plant.id as number} className="w-full max-w-sm mt-2 relative">

          <DropdownMenu>
            <DropdownMenuTrigger className="absolute top-0 right-0 m-3 rotate-90 ">
              <Icon icon="dots" size={22} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{plant.name as string}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => deletePlant(plant.id as number)}>Delete <Icon icon="trash" size={16} className="ml-auto" /></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <CardContent className="flex gap-3 py-4">
            <div className="w-full max-w-[100px]">
              <AspectRatio ratio={4 / 5}>
                <Image src={plant.thumbnail ? plant.thumbnail as string : "/Logo.svg"} alt={`${plant.name as string} image`} fill className="object-cover rounded" />
              </AspectRatio>
            </div>
            <div>
              <strong className="text-lg">{plant.name as string}</strong>
              <p className="text-gray-500 text-xs">{plant.description as string}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="block">
              <Icon icon="alarm" className="mr-2" size={18} />
              Add Reminder
            </Button>
          </CardFooter>
        </Card>
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
