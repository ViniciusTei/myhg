import { useEffect, useState } from "react";

import { PlantTypes } from "@/app/home/myplants/schema"

export default function usePlantTypes() {
  const [plantTypes, setPlantTypes] = useState<PlantTypes[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true)
      try {
        let res = await fetch('/api/plant-types')
        let { data } = await res.json()
        setPlantTypes(data)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return {
    plantTypes,
    isLoading,
  }
}
