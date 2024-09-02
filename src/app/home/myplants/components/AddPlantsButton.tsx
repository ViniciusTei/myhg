"use client"
import { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Icon from "@/components/ui/icon"
import { useMediaQuery } from "@/hooks/use-media-query"
import Image from "next/image"
import { UploadButton } from "@/lib/utils"

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

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(8, {
    message: "Description must be at least * characters.",
  }),
  thumbnail: z.string(),
  type: z.string()
})

function AddPlantsForm() {
  const [plantTypes, setPlantTypes] = useState<any[] | null>(null)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      thumbnail: "",
      type: "",
    },
  })
  const [imageFile, setImageFile] = useState<string | null>(null)
  const handleImageChange = (e: string[]) => {
    if (e && e[0]) {
      setImageFile(e[0])
    }
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  useEffect(() => {
    async function fetchPosts() {
      let res = await fetch('/api/plant-types')
      let { data } = await res.json()
      setPlantTypes(data)
    }
    fetchPosts()
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-2 gap-2">
        <div className="row-span-full">
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plant image</FormLabel>
                <FormControl>
                  <>
                    {imageFile && <Image src={imageFile} alt="Plant image preview" width={100} height={120} className="mx-auto rounded" />}
                    <UploadButton
                      {...field}
                      appearance={{
                        button: 'bg-white border border-primary text-primary w-full',
                      }}
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        const file = res?.map(val => val.url)[0]
                        handleImageChange(res?.map(val => val.url))
                        if (file) {
                          form.setValue('thumbnail', file)
                        }
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        toast({
                          title: 'ERROR!',
                          description: error.message
                        })
                      }}
                    />
                  </>
                </FormControl>
                <FormDescription>
                  This is the image that will display on the home page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plant name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  A brief description of you plant.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plant type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {plantTypes?.map((type: any) => (
                      <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                    ))}
                    <SelectItem value="0">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" size="block" className="col-span-full">Submit</Button>
      </form>
    </Form>
  )
}
