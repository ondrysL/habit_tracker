import { useEffect, useState } from "react"
import { Component as BarChart } from "./BarChart"
import { useAuth } from "../contexts/AuthProvider"
import { and, collection, query, where, getDocs, Timestamp, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";


const getDayNameFromTimestamp = (timestamp) => {
  const date = timestamp.toDate();
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

  return dayName;
};

const Statistics = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState([])

  useEffect(() => {
    let unsub = null

    const getStats = async (user) => {
      const now = new Date();
      const todaysDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const lastWeek = new Date(todaysDate);
      lastWeek.setDate(todaysDate.getDate() - 7);

      const dailyStatsRef = collection(db, "dailyStats")
      const q = query(
        dailyStatsRef,
        and(
          where("userId", "==", user.uid),
          where("date", ">=", Timestamp.fromDate(lastWeek)),
          where("date", "<=", Timestamp.fromDate(todaysDate))
        ),
        orderBy("date", "asc")
      );

      unsub = onSnapshot(q, (querySnapshot) => {
        const statsData = []

        querySnapshot.forEach((doc) => {
          const stats = doc.data()
          statsData.push({ day: getDayNameFromTimestamp(stats.date), finished: stats.completedHabits, unfinished: stats.totalHabits - stats.completedHabits })
        })
        setStats(statsData)
      })
    }

    getStats(user)

    return () => {
      if (unsub) {
        unsub()
      }
    }
  }, [])

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
