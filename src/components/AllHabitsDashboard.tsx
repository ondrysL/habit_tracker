import { useState } from "react"
import useGetAllUsersHabits from "../hooks/useGetAllUsersHabits"
import { useAuth } from "../contexts/AuthProvider"
import HabitsList from "./HabitsList"
import HabitForm from "./HabitForm"
import { HabitType } from "../types/enums"

const AllHabitsDashboard = () => {
  const { user } = useAuth()
  const [habits, setHabits] = useState([])

  useGetAllUsersHabits(user, setHabits)

  return (
    <div className="flex flex-col gap-x-8 gap-y-4 bg-white p-8 shadow-lg rounded-[20px] md:flex-row">
      <HabitsList habits={habits} tittle="All habits" isToggle={false} listType={HabitType.IN_LIST} />
      <div className="w-[100%] flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold">Add new Habit</h1>
        <HabitForm />
      </div>
    </div>
  )
}

export default AllHabitsDashboard
