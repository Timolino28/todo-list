import WeekDays from "./WeekDays";
import { getCurrentWeek, type WeekDay } from "~/utils/getCurrentWeek";

function Calendar() {
  const week: WeekDay[] = getCurrentWeek();
  const today = new Date();

  return (
    <>
      <div className="sm:grid grid-cols-7 gap-5 flex flex-col p-10">
        {week.map((day) => {
          const isToday = day.date.toDateString() === today.toDateString();

          return <WeekDays key={day.formatted} day={day} />;
        })}
      </div>
    </>
  );
}

export default Calendar;
