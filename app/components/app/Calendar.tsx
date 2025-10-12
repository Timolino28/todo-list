import { useState } from "react";
import Header from "./Header";
import WeekDays from "./WeekDays";
import { getWeekDays, type WeekDay } from "~/utils/getWeekdays";

function Calendar() {
  const [weekOffset, setWeekOffset] = useState<number>(0);

  const week: WeekDay[] = getWeekDays(weekOffset);

  return (
    <>
      <Header
        onPrevWeek={() => setWeekOffset((prev) => prev - 1)}
        onNextWeek={() => setWeekOffset((prev) => prev + 1)}
        onResetWeek={() => setWeekOffset(0)}
      />
      <div className="sm:grid grid-cols-7 gap-5 flex flex-col p-10">
        {week.map((day) => {
          return <WeekDays key={day.formatted} day={day} />;
        })}
      </div>
    </>
  );
}

export default Calendar;
