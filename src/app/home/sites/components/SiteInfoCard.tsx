'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ThermometerIcon, DropletIcon, SunIcon } from 'lucide-react'
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useEffect, useState } from "react";

type CurrentInfo = {
  temperature: number
  humidity: number
}

interface AllInfo extends CurrentInfo {
  id: number
  time: string
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export default function SiteInfoCard() {
  const [currentInfo, setCurrentInfo] = useState<CurrentInfo>()
  const [allInfo, setAllInfo] = useState<AllInfo[]>()

  useEffect(() => {

    async function fetchCurrentInfo() {
      try {
        let info = await fetch('/api/grow-monitor')
        let { data } = await info.json()
        setCurrentInfo(data.current)
        setAllInfo(data.all)

      } catch (err) {
        console.log(err)
      }
    }

    fetchCurrentInfo()
  }, [])
  console.log(currentInfo)

  return (

    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Armarinho grow</CardTitle>
        <CardDescription>Ultimas 24 horass</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Temperatura</h3>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <LineChart data={allInfo}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tickFormatter={formatTimeValue} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temperature" stroke="#ef4444" />
              </LineChart>
            </ChartContainer>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Umidade</h3>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <LineChart data={allInfo}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tickFormatter={formatTimeValue} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="humidity" stroke="#3b82f6" />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-2">
            <ThermometerIcon className="h-5 w-5 text-red-500" />
            <span>Temp agora: {currentInfo?.temperature ?? 0}°C</span>
          </div>
          <div className="flex items-center space-x-2">
            <DropletIcon className="h-5 w-5 text-blue-500" />
            <span>Umidade agora: {currentInfo?.humidity ?? 0}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <SunIcon className="h-5 w-5 text-yellow-500" />
            <span>Tempo de luz: 12/12</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const formatTimeValue = (value: string) => value.split(' ')[1]
