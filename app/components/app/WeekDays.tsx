import { useEffect, useState } from "react";
import { type WeekDay } from "~/utils/getWeekdays";

type WeekDaysProps = {
  weeks: WeekDay[];
};

function WeekDays({ weeks }: WeekDaysProps) {
  const today = new Date();

  const [todos, setTodos] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setTodos((prev) => {
      const newTodos = { ...prev };
      for (const day of weeks) {
        const key = day.date.toDateString();
        if (!newTodos[key]) {
          newTodos[key] = Array(10).fill("");
        }
      }
      return newTodos;
    });
  }, [weeks]);

  const handleInputChange = (dayKey: string, index: number, value: string) => {
    setTodos((prev) => {
      const updatedDayTodos = [...(prev[dayKey] || Array(10).fill(""))];
      updatedDayTodos[index] = value;
      return { ...prev, [dayKey]: updatedDayTodos };
    });
  };

  return (
    <>
      <div className="sm:grid grid-cols-7 gap-5 flex flex-col p-10">
        {weeks.map((day) => {
          const isToday = day.date.toDateString() === today.toDateString();
          const dayKey = day.date.toDateString();
          const dayTodos = todos[dayKey] || Array(10).fill("");

          return (
            <div key={day.formatted} className="w-full">
              <div
                className={`flex justify-between border-b-2 ${!isToday ? "border-gray-300" : "border-oranje"} `}
              >
                <div>
                  <h2
                    className={`md:text-xl font-bold ${!isToday ? "text-gray-300" : "text-oranje"} `}
                  >
                    {day.date.getDate()}.{" "}
                    {day.date.toLocaleDateString("de-DE", { month: "short" })}
                  </h2>
                </div>
                <div
                  className={`md:text-xl ${!isToday ? "text-gray-300/40" : "text-oranje/60"} `}
                >
                  {day.shortLabel}
                </div>
              </div>

              {/* Input-Container */}
              <div className="mt-3 flex flex-col gap-1">
                {dayTodos.map((todo, index) => {
                  const firstEmptyIndex = dayTodos.findIndex((t) => t === "");
                  const isEditable = index === firstEmptyIndex;

                  return (
                    <div
                      key={index}
                      className={`py-1 border-b-1 ${isEditable ? "border-gray-300/40 hover:border-oranje" : "border-gray-300/40"}`}
                    >
                      <label className="">
                        <input
                          type="text"
                          value={todo}
                          onChange={(e) =>
                            handleInputChange(dayKey, index, e.target.value)
                          }
                          disabled={!isEditable && todo === ""}
                          className={`max-w-full bg-transparent outline-none text-gray-300 ${isEditable ? "cursor-auto  focus:shadow-md focus:p-2 " : ""}`}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default WeekDays;
