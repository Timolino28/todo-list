import { FaRegCheckCircle } from "react-icons/fa";

type Props = {
  dayKey: string;
  index: number;
  todo: string;
  todos: string[];
  doneMap: Record<string, boolean>;
  onChange: (dayKey: string, index: number, value: string) => void;
  onToggle: (key: string) => void;
};

function TodoItem({
  dayKey,
  index,
  todo,
  todos,
  doneMap,
  onChange,
  onToggle,
}: Props) {
  const firstEmptyIndex = todos.findIndex((t) => t === "");
  const isEditable = index === firstEmptyIndex;
  const todoKey = `${dayKey}-${index}`;
  const isDone = doneMap[todoKey] ?? false;

  return (
    <div
      className={`py-1 border-b ${isEditable ? "border-gray-300/40 hover:border-oranje" : "border-gray-300/40"} ${isDone ? "text-gray-500 line-through" : ""}`}
    >
      <label className="flex w-full items-center gap-2">
        <input
          type="text"
          value={todo}
          onChange={(e) => onChange(dayKey, index, e.target.value)}
          disabled={!isEditable && todo === ""}
          className={`flex-1 min-w-0 bg-transparent outline-none ${isDone ? "text-gray-500" : "text-gray-300"} ${isEditable ? "cursor-auto focus:shadow-md focus:p-2" : "cursor-default"} ${todo ? "cursor-pointer" : "cursor-auto"}`}
        />
        {todo && (
          <div
            onClick={() => onToggle(todoKey)}
            className={`cursor-pointer transition-colors ${isDone ? "text-gray-500" : "text-gray-300"}`}
          >
            <FaRegCheckCircle />
          </div>
        )}
      </label>
    </div>
  );
}

export default TodoItem;
