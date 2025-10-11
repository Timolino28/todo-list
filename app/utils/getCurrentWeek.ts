export type WeekDay = {
  date: Date;
  formatted: string;
  shortLabel: string; // z.B. "Mo" oder "Di"
};

export const getCurrentWeek = (): WeekDay[] => {
  const today = new Date();
  const currentDay = today.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

  const week: WeekDay[] = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() + mondayOffset + i);

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
