import WeekDays from "./WeekDays";

function Calendar() {
  return (
    <>
      <div className="sm:grid grid-cols-7 gap-5 flex flex-col p-5">
        {/*Mit WeekDay-Komponente ersetzen*/}
        <WeekDays />
      </div>
    </>
  );
}

export default Calendar;
