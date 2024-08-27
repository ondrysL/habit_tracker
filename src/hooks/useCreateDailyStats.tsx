import { db } from "../config/FirebaseConfig";
import { addDoc, collection, doc, Timestamp, updateDoc } from "firebase/firestore";
import getUserStats from "./getUserStats";
import getDailyHabitsForDailyStats from "./getDailyHabitsForDailyStats";

const useCreateDailyStats = async (user) => {
  const now = new Date();
  const todaysDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const day = todaysDate.getDay()
  const timestampNow = Timestamp.fromDate(todaysDate);

  try {
    const userStats = await getUserStats(user)
    console.log()

    if (
      userStats.dailyStats.length == 0 ||
      userStats.dailyStats[userStats.dailyStats.length - 1].date.seconds !== timestampNow.seconds
    ) {
      const dailyHabits = await getDailyHabitsForDailyStats(user, day)
      const dailyStatsRef = collection(db, "dailyStats")
      const docRef = await addDoc(dailyStatsRef, {
        userId: user.uid,
        date: timestampNow,
        totalHabits: dailyHabits.length,
        completedHabits: 0,
        habits: dailyHabits
      })
      const userStatsRef = doc(db, "userStats", userStats.id)
      await updateDoc(userStatsRef, {
        dailyStats: [...userStats.dailyStats, { dailyStatId: docRef.id, date: timestampNow }]
      })
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

export default useCreateDailyStats
