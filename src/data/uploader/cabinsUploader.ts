import supabase from "../../services/supabase";
import { cabins } from "../data-cabins";

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);

  if (error) console.error(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);

  if (error) console.error(error.message);
}

export { deleteCabins, createCabins };
