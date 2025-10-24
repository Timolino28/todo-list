import type { WeekDay } from "~/utils/getWeekdays";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";

type InputModal = {
  day: WeekDay;
  todo: string;
  open: boolean;
  isDone: boolean;
  todoKey: string;
  index: number;
  dayKey: string;
  onClose: () => void;
  onToggle: (key: string) => void;
  onChange: (dayKey: string, index: number, value: string) => void;
  onDelete: (dayKey: string, index: number, todoKey: string) => void;
};

function InputModal({
  day,
  todo,
  open,
  isDone,
  onClose,
  onToggle,
  todoKey,
  index,
  dayKey,
  onChange,
  onDelete,
}: InputModal) {
  const [localValue, setLocalValue] = useState(todo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localValue === "") {
      setLocalValue(todo);
    } else {
      onChange(dayKey, index, localValue);
    }
    onClose();
  };

  const handleDelete = () => {
    onDelete(dayKey, index, todoKey);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="bg-gray-300 py-5"
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="flex items-center gap-20 pb-10">
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
              className={`text-3xl outline-none ${isDone ? "text-gray-500 line-through" : ""}`}
            />
            {localValue && (
              <div onClick={() => onToggle(todoKey)}>
                <FaRegCheckCircle
                  className={`text-xl cursor-pointer ${isDone ? "text-gray-500" : ""}`}
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
