import supabase from "./supabase";

export async function uploadImage(
  image: File,
  storageName: "cabin-images" | "avatars"
): Promise<{ path: string }> {
  const { data, error } = await supabase.storage
    .from(storageName)
    .upload(`${Math.random()}-${image.name}`, image);

  if (error) throw new Error(error.message);

  return data;
}
