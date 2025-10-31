import { type WeekDay } from "~/utils/getWeekdays";
import { useTodos } from "~/hooks/useTodos";
import WeekDayColumn from "./WeekDayColumn";
import { Spinner } from "../ui/spinner";

type WeekDaysProps = {
  weeks: WeekDay[];
};

function WeekDays({ weeks }: WeekDaysProps) {
  const { todos, loading, handleInputChange, toggleDone, handleDelete } =
    useTodos(weeks);
  const today = new Date();

  if (loading) {
    return (
      <div>
        <Spinner className="mx-auto mt-30 text-gray-300 size-8" />
      </div>
    );
  }

  return (
    <div className="sm:grid grid-cols-7 gap-5 flex flex-col md:p-10 p-5">
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
