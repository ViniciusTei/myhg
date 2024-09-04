'use client'
import Image from "next/image"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
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
import { PlantModel } from "@/domain/data/models"
import { remove } from "../actions"

interface PlantCardProps {
  plant: PlantModel
}

export default function PlantCard({ plant }: PlantCardProps) {
  return (
    <Card className="w-full max-w-sm mt-2 relative">

      <DropdownMenu>
        <DropdownMenuTrigger className="absolute top-0 right-0 m-3 rotate-90 ">
          <Icon icon="dots" size={22} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{plant.name as string}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => remove(plant.id as number)}
          >
            Delete <Icon icon="trash" size={16} className="ml-auto" />
          </DropdownMenuItem>
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
  )
}
