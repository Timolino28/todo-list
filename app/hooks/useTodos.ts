import { useEffect, useState } from "react";
import type { WeekDay } from "~/utils/getWeekdays";

export const useTodos = (weeks: WeekDay[]) => {
  const [todos, setTodos] = useState<Record<string, string[]>>({});
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>({});

  //Initialisiere neue Wochentage
  useEffect(() => {
    setTodos((prev) => {
      const newTodos = { ...prev };
      for (const day of weeks) {
        const key = day.date.toDateString();
        if (!newTodos[key]) newTodos[key] = Array(10).fill("");
      }
      return newTodos;
    });
  }, [weeks]);

  const handleInputChange = (dayKey: string, index: number, value: string) => {
    setTodos((prev) => {
      const updated = [...(prev[dayKey] || Array(10).fill(""))];
      updated[index] = value;
      return { ...prev, [dayKey]: updated };
    });
  };

  const toggleDone = (key: string) => {
    setDoneMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return { todos, handleInputChange, doneMap, toggleDone };
};
