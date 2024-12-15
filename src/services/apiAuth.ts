import {
  AuthTokenResponsePassword,
  UserAttributes,
  UserResponse,
} from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "./supabase";
import { uploadImage } from "./uploadImage";

export type SignupParamsType = {
  full_name: string;
  email: string;
  password: string;
};

type LoginParamsType = {
  email: string;
  password: string;
};

export type UpdateUserParamsType = {
  full_name?: string;
  avatar?: File | string;
  password?: string;
};

export async function signup({
  full_name,
  email,
  password,
}: SignupParamsType): Promise<UserResponse["data"]> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

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

export async function updateUser({
  full_name,
  avatar,
  password,
}: UpdateUserParamsType): Promise<UserResponse["data"]> {
  let dataToUpdate: UserAttributes = {};

  if (full_name)
    dataToUpdate = {
      ...dataToUpdate,
      data: { ...dataToUpdate.data, full_name },
    };

  if (avatar instanceof File) {
    const uploadedImage = await uploadImage(avatar, "avatars");

    dataToUpdate = {
      ...dataToUpdate,
      data: {
        ...dataToUpdate.data,
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${uploadedImage.path}`,
      },
    };
  }

  if (typeof avatar === "string")
    dataToUpdate = { ...dataToUpdate, data: { ...dataToUpdate.data, avatar } };

  if (password) dataToUpdate = { ...dataToUpdate, password };

  const { data, error } = await supabase.auth.updateUser(dataToUpdate);

  if (error) throw new Error(error.message);

  return data;
}
