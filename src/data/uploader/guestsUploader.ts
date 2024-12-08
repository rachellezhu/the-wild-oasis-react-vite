import supabase from "../../services/supabase";
import { guests } from "../data-guest";

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);

  if (error) console.error(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);

  if (error) console.error(error.message);
}

export { deleteGuests, createGuests };
