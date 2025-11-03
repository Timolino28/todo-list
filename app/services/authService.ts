import { supabase } from "~/lib/supabase";
import { AuthError, type User, type Session } from "@supabase/supabase-js";

export type SignUpResult = {
  data: { user: User | null; session: Session | null } | null;
  error: AuthError | Error | null;
};

export type AuthResult = {
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

const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/app`,
    },
  });

  if (error) {
    console.error("Google Login Fehler", error.message);
    return { error };
  }

  return { data };
};

const signOut = async (): Promise<AuthResult> => {
  const { error } = await supabase.auth.signOut();
  return { error: error ?? null };
};

const deleteUserAccount = async (userId: string) => {
  const { data, error } = await supabase.functions.invoke("delete_user", {
    body: { user_id: userId },
  });

  if (error) {
    console.error("Fehler beim Löschen des Accounts:", error);
    throw error;
  }
  return data;
};

export { signUp, signIn, signInWithGoogle, signOut, deleteUserAccount };
