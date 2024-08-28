import { useState } from "react"
import { Component as BarChart } from "./BarChart"
import { useAuth } from "../contexts/AuthProvider"
import useGetStatistics from "../hooks/useGetStatistics";

const Statistics = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState([])

  useGetStatistics(user, setStats)

  return (
    <div className="flex flex-col gap-y-8 p-8 bg-white shadow-lg rounded-[20px]">
      <div>
        <h1 className="text-2xl font-bold">Week Report</h1>
        <div className="flex gap-x-4 mt-2">
          <div className="flex gap-x-2 items-center">
            <div className="w-[15px] h-[15px] rounded-full bg-dark-green"></div>
            <p>Finished</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <div className="w-[15px] h-[15px] rounded-full bg-light-green"></div>
            <p>Unfinished</p>
          </div>
        </div>
      </div>
      <BarChart chartData={stats} />
    </div>
  )
}

export default Statistics
