import { db } from "../config/FirebaseConfig"
import { collection, query, where, getDocs } from "firebase/firestore"

const getUserStats = async (user) => {

  try {
    const userStatsRef = collection(db, "userStats")
    const q = query(userStatsRef, where("userId", "==", user.uid))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      throw new Error("no userstats found")
    }

    const userStats = querySnapshot.docs.map((doc) => (
      {
        id: doc.id,
        ...doc.data()
      }
    ))[0];

    return userStats

  } catch (err) {
    console.log(err)

    throw err
  }
}

export default getUserStats
