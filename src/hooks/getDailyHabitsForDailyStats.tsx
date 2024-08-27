import { collection, query, where, getDocs, or, and } from "firebase/firestore"
import { db } from "../config/FirebaseConfig"

const getDailyHabitsForDailyStats = async (user, dayIndex) => {
  try {
    const habitCollectionRef = collection(db, "habits")
    const q = query(habitCollectionRef, and(
      where("userId", "==", user.uid),
      or(where("frequency.type", "==", "Daily"), where("frequency.days", "array-contains", dayIndex))))
    const querySnapshot = await getDocs(q)

    const habitsWithId = querySnapshot.docs.map((doc) => {
      const habit = doc.data()

      return {
        habitId: doc.id,
        name: habit.name,
        type: habit.type,
        frequency: habit.frequency,
        time: habit.time,
        isDone: false
      }
    })

    return habitsWithId

  } catch (err) {
    throw err
  }
}

export default getDailyHabitsForDailyStats
