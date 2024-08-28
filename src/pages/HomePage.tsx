import DailyPlanner from "../components/DailyPlanner"
import AllHabitsDashboard from "../components/AllHabitsDashboard"
import Statistics from "../components/Statistics"

const HomePage = () => {
  return (
    <section className="bg-bg-color flex flex-col-reverse gap-8 p-8 xl:flex-row w-[100%] xl:justify-center xl:items-start">
      <div className="flex flex-col gap-y-8 md:flex-col-reverse xl:w-[60%]">
        <AllHabitsDashboard />
        <Statistics />
      </div>
      <div className="sm:flex sm:justify-center max-sm:inline">
        <DailyPlanner />
      </div>
    </section>
  )
}

export default HomePage
