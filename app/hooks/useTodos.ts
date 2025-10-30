import { useEffect, useState } from "react";
import { supabase } from "~/lib/supabase";
import { useAuth } from "~/context/AuthContext";
import type { WeekDay } from "~/utils/getWeekdays";

type TodoItem = {
  id: string;
  content: string;
  is_done: boolean;
  index_in_day: number;
};

export const useTodos = (weeks: WeekDay[]) => {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id;

  const [todos, setTodos] = useState<Record<string, TodoItem[]>>({});
  const [loading, setLoading] = useState(true);

  // -----------------------------
  //  Hilfsfunktionen
  // -----------------------------

  // Hole dayId, sofern sie bereits existiert
  const getDayId = async (userId: string, dayKey: string) => {
    const { data, error } = await supabase
      .from("days")
      .select("id")
      .eq("user_id", userId)
      .eq("day_key", dayKey)
      .maybeSingle();

    if (error) {
      console.error("Fehler beim Lesen des Tages:", error);
      return null;
    }
    return data?.id ?? null;
  };

  //Erstelle dayId, sofern noch nicht vorhanden
  const createDay = async (userId: string, dayKey: string) => {
    const { data, error } = await supabase
      .from("days")
      .insert({ user_id: userId, day_key: dayKey })
      .select("id")
      .single();

    if (error) {
      console.error("Fehler beim Erstellen des Tages:", error);
      return null;
    }
    return data?.id;
  };

  //Lade Todos für einen bestimmten Tag
  const fetchDayItems = async (userId: string, dayKey: string) => {
    const dayId = await getDayId(userId, dayKey);
    if (!dayId) return [];

    const { data, error } = await supabase
      .from("day_items")
      .select("*")
      .eq("day_id", dayId)
      .order("index_in_day", { ascending: true });

    if (error) {
      console.error("Fehler beim Laden der Todos:", error);
      return [];
    }
    return data as TodoItem[];
  };

  // -----------------------------
  //  Daten initial laden
  // -----------------------------
  useEffect(() => {
    if (authLoading || !userId) return;

    const loadAllTodos = async () => {
      setLoading(true);

      const todosByDay: Record<string, TodoItem[]> = {};

      for (const day of weeks) {
        const dayKey = day.date.toDateString();
        const dayId = await getDayId(userId, dayKey);

        let items: TodoItem[] = [];

        if (dayId) {
          items = await fetchDayItems(userId, dayKey);
        }

        //Wenn leer -> 10 leere Platzhalter anlegen
        if (!items || items.length < 10) {
          const placeholders = Array.from(
            { length: 10 - (items?.length ?? 0) },
            (_, i) => ({
              id: `temp - ${dayKey} - ${i}`,
              content: "",
              is_done: false,
              index_in_day: (items?.length ?? 0) + i,
            })
          );

          todosByDay[dayKey] = [...(items || []), ...placeholders];
        } else {
          todosByDay[dayKey] = items;
        }
      }

      setTodos(todosByDay);
      setLoading(false);
    };
    loadAllTodos();
  }, [authLoading, userId, weeks]);

  // -----------------------------
  //  Eingabeänderung speichern
  // -----------------------------
  const handleInputChange = async (
    dayKey: string,
    index: number,
    value: string
  ) => {
    if (!userId) return;

    //Lokales Update
    setTodos((prev) => {
      const updated = { ...prev };
      const dayTodos = [...(updated[dayKey] || [])];
      if (!dayTodos[index]) {
        dayTodos[index] = {
          id: `temp-${dayKey}-${index}`,
          content: value,
          is_done: false,
          index_in_day: index,
        };
      } else {
        dayTodos[index] = { ...dayTodos[index], content: value };
      }
      updated[dayKey] = dayTodos;
      return updated;
    });

    //DB-Update
    if (value.trim() !== "") {
      let dayId = await getDayId(userId, dayKey);

      if (!dayId) {
        dayId = await createDay(userId, dayKey);
      }

      if (dayId) {
        const { error } = await supabase
          .from("day_items")
          .upsert(
            { day_id: dayId, index_in_day: index, content: value },
            { onConflict: "day_id, index_in_day" }
          );
        if (error) console.error("Supabase updated failed:", error);
      }
    }
  };

  // -----------------------------
  //  "Erledigt" toggeln
  // -----------------------------
  const toggleDone = async (dayKey: string, index: number) => {
    if (!userId) return;

    const current = todos[dayKey]?.[index];
    if (!current) return;

    const newState = !current?.is_done;

    const dayId = await getDayId(userId, dayKey);
    if (!dayId) return;

    //Lokales Update
    setTodos((prev) => {
      const updated = { ...prev };
      const items = [...(updated[dayKey] || [])];
      items[index] = { ...items[index], is_done: newState };
      updated[dayKey] = items;
      return updated;
    });

    //DB-Update
    const { error } = await supabase
      .from("day_items")
      .update({ is_done: newState })
      .eq("day_id", dayId)
      .eq("index_in_day", index);

    if (error) console.error("Fehler beim Toggle:", error);
  };

  // -----------------------------
  //  Todo löschen
  // -----------------------------
  const handleDelete = async (dayKey: string, index: number) => {
    if (!userId) return;

    const dayId = await getDayId(userId, dayKey);
    if (!dayId) return;

    //DB-Update
    const { error } = await supabase
      .from("day_items")
      .delete()
      .eq("day_id", dayId)
      .eq("index_in_day", index);

    if (error) console.error("Fehler beim Löschen:", error);

    //Lokales Update
    setTodos((prev) => {
      const updated = { ...prev };
      const items = [...(updated[dayKey] || [])];

      items[index] = {
        id: `temp-${dayKey}-${index}`,
        content: "",
        is_done: false,
        index_in_day: index,
      };

      updated[dayKey] = items;
      return updated;
    });
  };

  return {
    todos,
    loading: loading || authLoading,
    handleInputChange,
    toggleDone,
    handleDelete,
  };
};
