import { HabitType } from "../types/enums";

const filterDailyHabitsByIsDone = (habits) => {
  const finishedHabits = [];
  const unfinishedHabits = [];
  let index: number = 0

  habits.forEach(habit => {
    if (habit.isDone) {
      finishedHabits.push({ ...habit, index });
    } else {
      unfinishedHabits.push({ ...habit, index });
    }
    index++
  });

  return {
    finished: finishedHabits,
    unfinished: unfinishedHabits
  }
}

export default filterDailyHabitsByIsDone
