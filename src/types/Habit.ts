import { HabitType } from "./enums"

export interface HabitProps {
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
  index: number,
  habitId: string
}
