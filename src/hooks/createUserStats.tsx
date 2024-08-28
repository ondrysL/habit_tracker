import { db } from "../config/FirebaseConfig"
import { collection, addDoc } from "firebase/firestore"

const createUserStats = async (user) => {
  const userStatsRef = collection(db, "userStats")
  const userStats = {
    userId: user.uid,
    dailyStats: []
  }

  try {
    await addDoc(userStatsRef, userStats)
  } catch (err) {
    console.log(err)
  }
}

export default createUserStats
