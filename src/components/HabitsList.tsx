import { useState } from "react"
import { IoMdArrowDropdown } from "react-icons/io";
import Habit from "./Habit";
import { HabitListProps } from "../types/HabitList";

const HabitsList = ({ habits, tittle, isToggle, listType }: HabitListProps) => {
  const [show, setShow] = useState(true)

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-4">
        <h3 className="text-2xl font-bold">{tittle}</h3>
        {
          isToggle &&
          <button onClick={() => setShow(!show)}><IoMdArrowDropdown style={{ transform: `${show ? "rotate(180deg)" : "rotate(0deg)"}` }} size={32} color="#708871" /></button>
        }
      </div>
      <ul className="flex flex-col gap-y-4 overflow-y-scroll max-h-[400px]">
        {
          show && habits.map((habit) => (
            <li key={habit.habitId}>
              <Habit {...habit} listType={listType} />
            </li>
          ))
        }
      </ul>
    </div>

  )
}

export default HabitsList
