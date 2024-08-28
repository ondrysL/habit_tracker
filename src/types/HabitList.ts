import { HabitProps } from "./Habit";
import { HabitType } from "./enums";

export interface HabitListProps {
  habits: HabitProps[],
  tittle: string,
  isToggle: boolean,
  listType: HabitType
}
