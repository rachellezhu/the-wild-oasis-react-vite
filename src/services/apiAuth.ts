import { AuthTokenResponsePassword, UserResponse } from "@supabase/supabase-js";
import supabase from "./supabase";

type LoginParamsType = {
  email: string;
  password: string;
};

export async function login({
  email,
  password,
}: LoginParamsType): Promise<AuthTokenResponsePassword["data"]> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser(): Promise<
  UserResponse["data"]["user"] | null
> {
  const { data: session } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}