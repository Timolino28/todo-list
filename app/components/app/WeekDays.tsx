import { type WeekDay } from "~/utils/getWeekdays";
import { useTodos } from "~/hooks/useTodos";
import WeekDayColumn from "./WeekDayColumn";

type WeekDaysProps = {
  weeks: WeekDay[];
};

function WeekDays({ weeks }: WeekDaysProps) {
  const { todos, handleInputChange, doneMap, toggleDone } = useTodos(weeks);
  const today = new Date();

  return (
    <div className="sm:grid grid-cols-7 gap-5 flex flex-col p-10">
      {weeks.map((day) => (
        <WeekDayColumn
          key={day.formatted}
          day={day}
          todos={todos[day.date.toDateString()] || []}
          today={today}
          doneMap={doneMap}
          onChange={handleInputChange}
          onToggle={toggleDone}
        />
      ))}
    </div>
  );
}

export default WeekDays;
