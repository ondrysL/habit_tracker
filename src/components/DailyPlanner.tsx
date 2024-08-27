import { useEffect, useState } from "react"
import { onSnapshot, doc } from "firebase/firestore"
import { Component as PieChart } from "../components/PieChart"
import HabitsList from "./HabitsList"
import { db } from "../config/FirebaseConfig"
import getUserStats from "../hooks/getUserStats.tsx"
import filterDailyHabitsByIsDone from "../hooks/filterDailyHabitsByIsDone"
import { useAuth } from "../contexts/AuthProvider.tsx"
import { HabitType } from "../types/enums.ts"

const DailyPlanner = () => {
  const { user } = useAuth()
  const [finishedHabits, setFinishedHabits] = useState([])
  const [unfinishedHabits, setUnfinishedHabits] = useState([])

  useEffect(() => {
    let unsubscribe = null;

    const getDailyHabits = async () => {
      try {
        const userStats = await getUserStats(user)
        const todaysStat = userStats.dailyStats[userStats.dailyStats.length - 1]
        const todaysStatId = todaysStat.dailyStatId

        unsubscribe = onSnapshot(doc(db, "dailyStats", todaysStatId), (doc) => {
          const dailyStat = doc.data()
          const { finished, unfinished } = filterDailyHabitsByIsDone(dailyStat?.habits)
          setFinishedHabits(finished)
          setUnfinishedHabits(unfinished)

        })
      } catch (err) {
        console.log(err)
      }
    }

    getDailyHabits()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

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
