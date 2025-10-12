export type WeekDay = {
  date: Date;
  formatted: string;
  shortLabel: string; // z.B. "Mo" oder "Di"
};

export const getWeekDays = (weekOffset = 0): WeekDay[] => {
  const today = new Date();
  const currentDay = today.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset + weekOffset * 7);

  const week: WeekDay[] = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);

    week.push({
      date: day,
      formatted: day.toLocaleDateString("de-DE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      shortLabel: day.toLocaleDateString("de-DE", { weekday: "short" }),
    });
  }

  return week;
};
