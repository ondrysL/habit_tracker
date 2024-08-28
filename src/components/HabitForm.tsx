import { useState } from "react"
import useAddHabit from "../hooks/useAddHabit"
import { useAuth } from "../contexts/AuthProvider"

const HabitForm = () => {
  const [frequencyType, setFrequencyType] = useState<string>("Daily")
  const [error, setError] = useState<boolean>(false)
  const { user } = useAuth()

  const setInputsEmpty = (e) => {
    e.target.name.value = ""
    e.target.type.value = ""
    e.target.time.value = ""
    e.target.frequencyType.value = "Daily"
    setFrequencyType("Daily")
  }

  const createNewHabit = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const type = e.target.type.value
    let time = e.target.time.value
    setInputsEmpty(e)
    let hour;
    let minute;
    let daysBool = []
    let days = []

    if (/^\s*$/.test(time)) {
      time = null
    } else {
      const [hoursTxt, minutesTxt] = time.split(":")
      hour = parseInt(hoursTxt, 10)
      minute = parseInt(minutesTxt, 10)
      time = {
        hour, minute
      }
    }

    if (frequencyType === "Weekly") {
      daysBool = [e.target.sun.checked, e.target.mon.checked,
      e.target.tue.checked, e.target.wed.checked,
      e.target.thu.checked, e.target.fri.checked, e.target.sat.checked]

      for (let i = 0; i < daysBool.length; i++) {
        if (daysBool[i]) {
          days.push(i)
        }
      }
    }

    if (/^\s*$/.test(name) || /^\s*$/.test(type) || /^\s*$/.test(time)) {
      setError(true)
      return
    }

    setError(false)
    useAddHabit(user, {
      name: name,
      type: type,
      frequency: {
        type: frequencyType,
        days: days
      },
      time: time
    })
  }

  return (
    <div className="bg-dark-green text-white rounded-[25px] shadow-2xl">
      <form className="flex flex-col gap-y-4 p-8" onSubmit={(e) => createNewHabit(e)} >
        <div className="flex flex-col gap-y-1">
          <label className="inline">Name:</label>
          <input type="text" name="name" placeholder="Type name of habit..." className="outline-none text-black px-2 py-1 rounded-[10px]" />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="inline">Type:</label>
          <input type="text" name="type" placeholder="Type name of habit..." className="outline-none text-black px-2 py-1 rounded-[10px]" />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="inline">Time:</label>
          <input type="time" name="time" placeholder="Hours..." className="outline-none text-black px-2 py-1 rounded-[10px]" />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="inline">Frequency:</label>
          <div className="flex flex-col gap-y-4">
            <select name="frequencyType" id="frequencyType" onChange={(e) => setFrequencyType(e.target.value)} className="outline-none text-black rounded-[10px] px-2 py-1">
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
            </select>
            {
              frequencyType == "Weekly" && <div className="grid grid-cols-5 md:grid-cols-7">
                <div className="flex gap-x-1 items-center">
                  <input type="checkbox" name="sun" />
                  <label className="font-bold">Sun</label>
                </div>
                <div className="flex gap-x-1 items-center">
                  <input type="checkbox" name="mon" />
                  <label className="font-bold">Mon</label>
                </div>
                <div className="flex gap-x-1 items-center">
                  <input type="checkbox" name="tue" />
                  <label className="font-bold">Tue</label>
                </div>
                <div className="flex gap-x-1 items-center">
                  <input type="checkbox" name="wed" />
                  <label className="font-bold">Wed</label>
                </div>
                <div className="flex gap-x-1 items-center">
                  <input type="checkbox" name="thu" />
                  <label className="font-bold">Thu</label>
                </div>
                <div className="flex gap-x-1 items-center">
                  <input type="checkbox" name="fri" />
                  <label className="font-bold">Fri</label>
                </div>
                <div className="flex gap-x-1 items-center">
                  <input type="checkbox" name="sat" />
                  <label className="font-bold">Sat</label>
                </div>
              </div>
            }
          </div>
        </div>
        <button type="submit" className="bg-white text-dark-green font-bold py-2 rounded-[15px] mt-4">Add Habit</button>
        {error && <p className="font-bold text-red-300 text-center">Error, try again!</p>}
      </form>
    </div>
  )
}

export default HabitForm
