'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UploadButton } from "@/lib/utils"

import { PlantsSchema } from '../schema'
import usePlantTypes from "@/hooks/use-plant-types"
import Icon from "@/components/ui/icon"
import { create } from "../actions"

interface AddPlantsFormProps {
  handleSuccess: () => void
}

export default function AddPlantsForm({ handleSuccess }: AddPlantsFormProps) {
  const { plantTypes, isLoading } = usePlantTypes()
  const form = useForm<z.infer<typeof PlantsSchema>>({
    resolver: zodResolver(PlantsSchema),
    defaultValues: {
      name: "",
      description: "",
      thumbnail: "",
    },
  })

  const [imageFile, setImageFile] = useState<string | null>(null)
  const handleImageChange = (e: string[]) => {
    if (e && e[0]) {
      setImageFile(e[0])
    }
  }

  async function onSubmit(data: z.infer<typeof PlantsSchema>) {
    try {
      await create(data)
      toast({
        title: "Success",
        description: "You have inserted the new plant!",
      })
      handleSuccess()
    } catch (err) {
      toast({
        title: "Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(err, null, 2)}</code>
          </pre>
        ),
        variant: "destructive"
      })

    }
  }

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
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoading && <Icon icon="semi-circle" size={24} className="animate-spin" />}
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
