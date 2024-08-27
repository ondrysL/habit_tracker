import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect } from "react"
import { db } from "../config/FirebaseConfig"

const useGetAllUsersHabits = async (user, setFunction) => {
  useEffect(() => {
    let unsub = null

    const getAllHabits = async () => {
      const habitsRef = collection(db, "habits")
      const q = query(habitsRef, where("userId", "==", user.uid))
      unsub = onSnapshot(q, (querySnapshot) => {
        const habits = []
        querySnapshot.forEach((doc) => {
          habits.push({ ...doc.data(), habitId: doc.id })
        })
        setFunction(habits)
      })
    }

    getAllHabits()

    return () => {
      if (unsub) {
        unsub()
      }
    }

  }, [])
}

export default useGetAllUsersHabits
