import { useState } from "react";
import Header from "./Header";
import WeekDays from "./WeekDays";
import { getWeekDays, type WeekDay } from "~/utils/getWeekdays";

function Calendar() {
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const weeks: WeekDay[] = getWeekDays(weekOffset);

  return (
    <>
      <Header
        onPrevWeek={() => setWeekOffset((prev) => prev - 1)}
        onNextWeek={() => setWeekOffset((prev) => prev + 1)}
        onResetWeek={() => setWeekOffset(0)}
        weeks={weeks}
      />
      <WeekDays weeks={weeks} />;
    </>
  );
}

export default Calendar;
