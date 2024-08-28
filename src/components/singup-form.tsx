"use client"
import { useActionState } from "react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { create } from "@/app/singup/actions"
import { useFormState, useFormStatus } from "react-dom"

export default function SingupForm() {
  const [state, formAction] = useFormState(create, null)
  const { pending } = useFormStatus()

  return (
    <>
      <form action={formAction}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" name="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input id="password" type="password" name="confirmPassword" />
          </div>
          <Button type="submit" className="w-full">
            {pending ? 'Creating...' : 'Create an account'}
          </Button>
        </div>
      </form>
      {state?.error && (
        <Alert className="mt-4" variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {state.error}
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}
