import { useEffect } from "react"
import { collection, and, where, orderBy, query, Timestamp, onSnapshot } from "firebase/firestore"
import { db } from "../config/FirebaseConfig";

const useGetStatistics = (user, setFunction) => {
  const getDayNameFromTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

    return dayName;
  };

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
        setFunction(statsData)
      })
    }

    getStats(user)

    return () => {
      if (unsub) {
        unsub()
      }
    }
  }, [])
}

export default useGetStatistics
