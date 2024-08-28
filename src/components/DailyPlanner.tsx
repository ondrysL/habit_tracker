import { useState } from "react"
import { Component as PieChart } from "../components/PieChart"
import HabitsList from "./HabitsList"
import { useAuth } from "../contexts/AuthProvider.tsx"
import { HabitType } from "../types/enums.ts"
import useGetDailyHabits from "../hooks/useGetDailyHabits.tsx"

const DailyPlanner = () => {
  const { user } = useAuth()
  const [finishedHabits, setFinishedHabits] = useState([])
  const [unfinishedHabits, setUnfinishedHabits] = useState([])

  useGetDailyHabits(user, setFinishedHabits, setUnfinishedHabits)

  return (
    <section className="flex flex-col gap-y-4 bg-white p-8 shadow-lg rounded-[20px] max-w-[550px] md:w-[550px]">
      <h1 className="text-2xl font-bold">Daily Planner</h1>
      <PieChart chartData={[
        { habits: "finished", count: finishedHabits.length, fill: "#708871" },
        { habits: "unfinished", count: unfinishedHabits.length, fill: "#BEC6A0" }
      ]} />
      <HabitsList habits={unfinishedHabits} tittle="Unfinished" isToggle={true} listType={HabitType.IN_PLANNER} />
      <HabitsList habits={finishedHabits} tittle="Finished" isToggle={true} listType={HabitType.IN_PLANNER} />
    </section>
  )
}

export default DailyPlanner
