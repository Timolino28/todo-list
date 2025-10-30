import { type WeekDay } from "~/utils/getWeekdays";
import { useTodos } from "~/hooks/useTodos";
import WeekDayColumn from "./WeekDayColumn";

type WeekDaysProps = {
  weeks: WeekDay[];
};

function WeekDays({ weeks }: WeekDaysProps) {
  const { todos, loading, handleInputChange, toggleDone, handleDelete } =
    useTodos(weeks);
  const today = new Date();

  return (
    <div className="sm:grid grid-cols-7 gap-5 flex flex-col p-10">
      {weeks.map((day) => (
        <WeekDayColumn
          key={day.formatted}
          day={day}
          todos={todos}
          today={today}
          onChange={handleInputChange}
          onToggle={toggleDone}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default WeekDays;
