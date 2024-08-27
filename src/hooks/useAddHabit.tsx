import { addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../config/FirebaseConfig"
import getUserStats from "./getUserStats"

const useAddHabit = async (user, newHabit) => {
  const day = new Date().getDay()

  try {
    const habitsRef = collection(db, "habits")
    const newHabitRef = await addDoc(habitsRef, {
      ...newHabit,
      userId: user.uid
    })

    // update daily stats
    if (newHabit.frequency.type == "Daily" || newHabit.frequency.days.includes(day)) {
      const userStats = await getUserStats(user)
      const dailyStatId = userStats.dailyStats[userStats.dailyStats.length - 1].dailyStatId
      const lastDailyStatRef = doc(db, "dailyStats", dailyStatId)
      const lastDailyStatData = await getDoc(lastDailyStatRef)
      await updateDoc(lastDailyStatRef, {
        totalHabits: lastDailyStatData.data().totalHabits + 1,
        habits: arrayUnion({
          habitId: newHabitRef.id,
          name: newHabit.name,
          type: newHabit.type,
          frequency: newHabit.frequency,
          time: newHabit.time,
          isDone: false

        })
      })

    }
  } catch (err) {
    console.log(err)
  }
}

export default useAddHabit
