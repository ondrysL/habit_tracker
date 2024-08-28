import { useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore"
import getUserStats from "./getUserStats";
import filterDailyHabitsByIsDone from "./filterDailyHabitsByIsDone";
import { db } from "../config/FirebaseConfig";

const useGetDailyHabits = (user, setFinished, setUnfinished) => {
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
          setFinished(finished)
          setUnfinished(unfinished)

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

}

export default useGetDailyHabits
