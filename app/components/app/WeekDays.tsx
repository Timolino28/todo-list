import { type WeekDay } from "~/utils/getWeekdays";

type WeekDaysProps = {
  weeks: WeekDay[];
};

function WeekDays({ weeks }: WeekDaysProps) {
  const today = new Date();

  return (
    <>
      <div className="sm:grid grid-cols-7 gap-5 flex flex-col p-10">
        {weeks.map((day) => {
          const isToday = day.date.toDateString() === today.toDateString();

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
              <div className="mt-3">
                <div className="py-1 border-b-1 border-gray-300/40 hover:border-oranje">
                  <label className="">
                    <input
                      type="text"
                      className="cursor-auto outline-none focus:shadow-md focus:p-2 bg-transparent text-gray-300 max-w-full"
                    />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default WeekDays;
