import type { WeekDay } from "~/utils/getWeekdays";
import { FaRegCheckCircle } from "react-icons/fa";
import InputModal from "./InputModal";
import { useState } from "react";

type Props = {
  day: WeekDay;
  dayKey: string;
  index: number;
  todo: string;
  todos: string[];
  doneMap: Record<string, boolean>;
  onChange: (dayKey: string, index: number, value: string) => void;
  onToggle: (key: string) => void;
};

function TodoItem({
  day,
  dayKey,
  index,
  todo,
  todos,
  doneMap,
  onChange,
  onToggle,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  const firstEmptyIndex = todos.findIndex((t) => t === "");
  const isEditable = index === firstEmptyIndex;
  const todoKey = `${dayKey}-${index}`;
  const isDone = doneMap[todoKey] ?? false;

  return (
    <>
      <div
        className={`z-10 py-1 border-b ${isEditable ? "border-gray-300/40 hover:border-oranje" : "border-gray-300/40"} ${isDone ? "text-gray-500 line-through" : ""}`}
      >
        <div className="flex w-full items-center gap-2">
          <input
            type="text"
            value={todo}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest(".check-icon")) return;
              if (todo) setShowModal(true);
            }}
            onChange={(e) => onChange(dayKey, index, e.target.value)}
            disabled={!isEditable && todo === ""}
            className={`flex-1 min-w-0 bg-transparent outline-none ${isDone ? "text-gray-500" : "text-gray-300"} ${isEditable ? "cursor-auto focus:shadow-md focus:p-2" : "cursor-default"} ${todo ? "cursor-pointer" : "cursor-auto"}`}
          />
          {todo && (
            <div
              className={`check-icon cursor-pointer transition-colors ${isDone ? "text-gray-500" : "text-gray-300"}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggle(todoKey);
              }}
            >
              <FaRegCheckCircle />
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <InputModal
          day={day}
          open={showModal}
          todo={todo}
          isDone={isDone}
          todoKey={todoKey}
          index={index}
          dayKey={dayKey}
          onClose={() => setShowModal(false)}
          onToggle={onToggle}
          onChange={onChange}
        />
      )}
    </>
  );
}

export default TodoItem;
