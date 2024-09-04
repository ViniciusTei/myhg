import { PlantModel } from '@/domain/data/models'

export interface DeletePlant {
  delete: (id: number) => Promise<PlantModel>
}
