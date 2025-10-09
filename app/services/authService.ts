import { supabase } from "~/lib/supabase";
import type { AuthError, User, Session } from "@supabase/supabase-js";

export type SignUpResult = {
  data: { user: User | null; session: Session | null } | null;
  error: AuthError | Error | null;
};

const signUp = async (email: string, password: string) => {
  // Prüfen, ob der User bereits existiert
  const { data: signInCheck } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInCheck?.user) {
    // User existiert -> kein erneutes Sign-Up
    return { data: null, error: new Error("User already exists") };
  }

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { data: null, error };
  return { data, error: null };
};

const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return { data: null, error };
  return { data, error: null };
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export { signUp, signIn, signOut };
