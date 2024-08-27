import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { HabitType } from "../types/enums";
import { arrayRemove, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { useAuth } from "../contexts/AuthProvider";
import getUserStats from "../hooks/getUserStats";
import { MdDeleteOutline } from "react-icons/md";

interface HabitProps {
  name: string,
  type: string,
  time: {
    hour: number,
    minute: number
  }
  frequency: {
    type: string,
    days: [string]
  },
  isDone: boolean,
  listType: HabitType,
  id: string,
  index: number
}

const formatTime = (hours: number, minutes: number) => {
  let hoursText = hours.toString(10);
  let minutesText = minutes.toString(10);

  if (minutes < 10) {
    minutesText = "0" + minutesText
  }

  return hoursText + ":" + minutesText
}

const Habit = ({ name, type, time, frequency, isDone, listType, habitId, index }: HabitProps) => {
  const { user } = useAuth()

  const updateHabitInDatabase = async () => {
    const userStats = await getUserStats(user)
    const dailyStatId = userStats.dailyStats[userStats.dailyStats.length - 1].dailyStatId
    const dailyStatRef = doc(db, "dailyStats", dailyStatId)

    try {
      const dailyStatSnap = await getDoc(dailyStatRef)
      const dailyStatData = dailyStatSnap.data()
      let habits = dailyStatData?.habits
      habits[index].isDone = !habits[index].isDone
      let value = 0

      if (habits[index].isDone) {
        value = 1
      } else {
        value = -1
      }

      await updateDoc(dailyStatRef, { habits: habits, completedHabits: dailyStatData.completedHabits + value })

    } catch (error) {
      console.error(error);
    }
  };

  const deleteHabit = async () => {
    try {
      await deleteDoc(doc(db, "habits", habitId))
      const userStats = await getUserStats(user)
      const dailyStatId = userStats.dailyStats[userStats.dailyStats.length - 1].dailyStatId;
      const lastDailyStatRef = doc(db, "dailyStats", dailyStatId);

      const dailyStatDoc = await getDoc(lastDailyStatRef);
      if (dailyStatDoc.exists()) {
        const data = dailyStatDoc.data();
        const updatedHabits = data.habits.filter(habit => habit.habitId !== habitId);

        await updateDoc(lastDailyStatRef, {
          totalHabits: data.totalHabits - 1,
          habits: updatedHabits
        });
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex max-w-[500px] justify-around items-center bg-white py-4 px-4 rounded-[15px] shadow-lg">
      <div className="w-[450px] grid max-sm:grid-cols-2 max-sm:justify-items-start sm:grid-cols-4 justify-items-center">
        <div>
          <p className="text-sm">Name:</p>
          <p className="font-bold mt-[2px] text-sm">{name}</p>
        </div>
        <div>
          <p className="text-sm">Time:</p>
          <p className="font-bold mt-[2px]">{time ? formatTime(time.hour, time.minute) : "-:-"}</p>
        </div>
        <div className="">
          <p className="text-sm">Type:</p>
          <p className="inline font-bold text-white text-sm bg-dark-green px-2 py-[2px] rounded-[10px] text-center mt-[2px]">{type}</p>
        </div>
        <div className="">
          <p className="text-sm">Frequency:</p>
          <p className="inline font-bold text-white text-sm bg-dark-green px-2 py-[2px] rounded-[10px] text-center mt-[2px]">{frequency.type}</p>
        </div>
      </div>
      {
        (listType === HabitType.IN_PLANNER && !isDone) && <button onClick={updateHabitInDatabase}><MdDone size={32} color="#708871" /></button>
      }
      {
        (listType === HabitType.IN_PLANNER && isDone) && <button onClick={updateHabitInDatabase}><RxCross2 size={32} color="red" /></button>
      }
      {
        listType == HabitType.IN_LIST && <button onClick={deleteHabit}><MdDeleteOutline size={28} color="red" /></button>
      }
    </div >
  )
}
export default Habit
