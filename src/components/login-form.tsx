"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import Icon from "@/components/ui/icon"

import { login } from "@/app/login/actions"

const FormSchema = z.object({
  email: z.string().email({
    message: "Must be an valid email"
  }),
  password: z.string()
})

type LoginFormSchema = z.infer<typeof FormSchema>

export function LoginForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormSchema) {
    setLoading(true)
    const response = await login(data)

    setLoading(false)
    if (!response.error) {
      router.push('/home')
      return
    }

    toast({
      title: "Error trying to login:",
      description: (
        <pre className="mt-2 max-w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(response.error, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Use this email to sing in.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Dont share this with anyone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            {!loading ? 'Login' : (<Icon icon="semi-circle" className="animate-spin ml-2" color="#f2f2f2" />)}
          </Button>
        </div>
      </form>
    </Form >
  )
}

