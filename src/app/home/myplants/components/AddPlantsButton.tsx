"use client"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Icon from "@/components/ui/icon"
import { useMediaQuery } from "@/hooks/use-media-query"

import AddPlantsForm from "./AddPlantsForm"

export default function AddPlantsButton() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" >
            <Icon icon="plus" strokeWidth="4" className="mr-1" /> Add Plants
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a new plant</DialogTitle>
            <DialogDescription>
              Enter where it is located and its info.
            </DialogDescription>
          </DialogHeader>

          <AddPlantsForm />

        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="lg" >
          <Icon icon="plus" strokeWidth="4" className="mr-1" /> Add Plants
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a new plant</DrawerTitle>
          <DrawerDescription>Enter where it is located and its info.</DrawerDescription>
        </DrawerHeader>

        <AddPlantsForm />

        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

