import type { WeekDay } from "~/utils/getWeekdays";
import TodoItem from "./TodoItem";

export type TodoItemType = {
  id: string;
  content: string;
  is_done: boolean;
  index_in_day: number;
};

type WeekDayColumnProps = {
  day: WeekDay;
  todos: Record<string, TodoItemType[]>;
  today: Date;
  onChange: (dayKey: string, index: number, value: string) => void;
  onToggle: (dayKey: string, index: number) => void;
  onDelete: (dayKey: string, index: number) => void;
};

function WeekDayColumn({
  day,
  todos,
  today,
  onChange,
  onToggle,
  onDelete,
}: WeekDayColumnProps) {
  const isToday = day.date.toDateString() === today.toDateString();
  const dayKey = day.date.toDateString();
  const dayTodos = todos[dayKey] || [];
  const firstEmptyIndex = dayTodos.findIndex((t) => t.content === "");

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
        {dayTodos.map((todo, index) => (
          <TodoItem
            key={todo.id || index}
            day={day}
            dayKey={dayKey}
            index={index}
            todo={todo}
            firstEmptyIndex={firstEmptyIndex}
            onChange={onChange}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default WeekDayColumn;
