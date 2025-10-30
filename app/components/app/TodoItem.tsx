import type { WeekDay } from "~/utils/getWeekdays";
import { FaRegCheckCircle } from "react-icons/fa";
import InputModal from "./InputModal";
import { useState } from "react";

export type TodoItemType = {
  id: string;
  content: string;
  is_done: boolean;
  index_in_day: number;
};

type TodoItemProps = {
  day: WeekDay;
  dayKey: string;
  index: number;
  firstEmptyIndex: number;
  todo: TodoItemType;
  onChange: (dayKey: string, index: number, value: string) => void;
  onToggle: (dayKey: string, index: number) => void;
  onDelete: (dayKey: string, index: number) => void;
};

function TodoItem({
  day,
  dayKey,
  index,
  todo,
  firstEmptyIndex,
  onChange,
  onToggle,
  onDelete,
}: TodoItemProps) {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState(todo.content);

  return (
    <>
      <div
        className={`z-10 py-1 border-b ${index === firstEmptyIndex ? "border-gray-300/40 hover:border-oranje" : "border-gray-300/40"} ${todo.is_done ? "text-gray-500 line-through" : ""}`}
      >
        <div className="flex w-full items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onChange(dayKey, index, inputValue);
              }
            }}
            onBlur={() => {
              if (inputValue.trim() !== todo.content) {
                onChange(dayKey, index, inputValue);
              }
            }}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest(".check-icon")) return;
              if (inputValue) setShowModal(true);
            }}
            disabled={!todo.content && index !== firstEmptyIndex}
            className={`flex-1 min-w-0 bg-transparent outline-none ${todo.is_done ? "text-gray-500" : "text-gray-300"} ${index === firstEmptyIndex ? "cursor-auto focus:shadow-md focus:p-2" : "cursor-default"} ${todo.content ? "cursor-pointer" : "cursor-auto"}`}
          />
          {todo.content && (
            <div
              className={`check-icon cursor-pointer transition-colors ${todo.is_done ? "text-gray-500" : "text-gray-300"}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggle(dayKey, index);
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
          todo={todo}
          index={index}
          dayKey={dayKey}
          open={showModal}
          onClose={() => setShowModal(false)}
          onToggle={onToggle}
          onChange={onChange}
          onDelete={onDelete}
        />
      )}
    </>
  );
}

export default TodoItem;
