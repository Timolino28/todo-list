import type { WeekDay } from "~/utils/getWeekdays";
import TodoItem from "./TodoItem";

type Props = {
  day: WeekDay;
  todos: string[];
  today: Date;
  doneMap: Record<string, boolean>;
  onChange: (dayKey: string, index: number, value: string) => void;
  onToggle: (key: string) => void;
};

function WeekDayColumn({
  day,
  todos,
  today,
  doneMap,
  onChange,
  onToggle,
}: Props) {
  const isToday = day.date.toDateString() === today.toDateString();
  const dayKey = day.date.toDateString();

  return (
    <div className="w-full">
      {/* Header */}
      <div
        className={`flex justify-between border-b-2 ${isToday ? "border-oranje" : "border-gray-300"}`}
      >
        <h2
          className={`md:text-xl font-bold ${isToday ? "text-oranje" : "text-gray-300"}`}
        >
          {day.date.getDate()}.{" "}
          {day.date.toLocaleDateString("de-DE", { month: "short" })}
        </h2>
        <div
          className={`md:text-xl ${isToday ? "text-oranje/60" : "text-gray-300/40"}`}
        >
          {day.shortLabel}
        </div>
      </div>

      {/* Todos */}
      <div className="mt-3 flex flex-col gap-1">
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            dayKey={dayKey}
            index={index}
            todo={todo}
            todos={todos}
            doneMap={doneMap}
            onChange={onChange}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default WeekDayColumn;
