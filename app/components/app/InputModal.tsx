import type { WeekDay } from "~/utils/getWeekdays";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";

export type TodoItemType = {
  id: string;
  content: string;
  is_done: boolean;
  index_in_day: number;
};

type InputModalProps = {
  day: WeekDay;
  todo: TodoItemType;
  open: boolean;
  index: number;
  dayKey: string;
  onClose: () => void;
  onToggle: (dayKey: string, index: number) => void;
  onChange: (dayKey: string, index: number, value: string) => void;
  onDelete: (dayKey: string, index: number) => void;
};

function InputModal({
  day,
  todo,
  open,
  onClose,
  onToggle,
  index,
  dayKey,
  onChange,
  onDelete,
}: InputModalProps) {
  const [localValue, setLocalValue] = useState(todo.content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localValue === "") {
      setLocalValue(todo.content);
    } else {
      onChange(dayKey, index, localValue);
    }
    onClose();
  };

  const handleDelete = () => {
    onDelete(dayKey, index);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && localValue !== todo.content) {
          onChange(dayKey, index, localValue);
        }
        onClose();
      }}
    >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="bg-gray-300 py-5 md:px-0 px-4"
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="flex items-center justify-between pb-10">
              <h3>
                {day.shortLabel}, {day.date.getDate()}.{" "}
                {day.date.toLocaleDateString("de-DE", { month: "short" })}{" "}
                {day.date.getFullYear()}
              </h3>
              <div onClick={handleDelete}>
                <MdDeleteOutline className="text-xl cursor-pointer" />
              </div>
            </div>
          </DialogHeader>
          <div className="flex justify-between items-center border-b-2">
            <input
              type="text"
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
              className={`text-3xl outline-none ${todo.is_done ? "text-gray-500 line-through" : ""}`}
            />
            {localValue && (
              <div onClick={() => onToggle(dayKey, index)}>
                <FaRegCheckCircle
                  className={`text-xl cursor-pointer ${todo.is_done ? "text-gray-500" : ""}`}
                />
              </div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InputModal;
