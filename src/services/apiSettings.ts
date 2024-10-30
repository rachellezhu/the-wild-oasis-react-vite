import supabase from "./supabase";
import { Tables } from "../types/supabase-type";

export type NewSettingType = {
  breakfast_price?: Tables<"settings">["breakfast_price"];
  max_booking_length?: Tables<"settings">["max_booking_length"];
  max_guests_per_booking?: Tables<"settings">["max_guests_per_booking"];
  min_booking_length?: Tables<"settings">["min_booking_length"];
};

export async function getSettings(): Promise<Tables<"settings">> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

// We expect a newSetting object that looks like {setting: newValue}

export async function updateSetting(
  newSetting: NewSettingType
): Promise<Tables<"settings">> {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }

  return data;
}
