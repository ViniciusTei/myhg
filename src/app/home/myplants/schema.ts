import { z } from 'zod'

export const PlantsSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(8, {
    message: "Description must be at least * characters.",
  }),
  thumbnail: z.string().optional(),
  type: z.number()
})
export type Plants = z.infer<typeof PlantsSchema>

export const PlantTypeSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(8, {
    message: "Description must be at least * characters.",
  }),
  thumbnail: z.string().optional(),
})
export type PlantTypes = z.infer<typeof PlantTypeSchema>
