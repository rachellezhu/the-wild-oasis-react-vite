import supabase, { supabaseUrl } from "./supabase";
import { Tables } from "../types/supabase-type";

export type newCabin = {
  name: Tables<"cabins">["name"];
  max_capacity: Tables<"cabins">["max_capacity"];
  regular_price: Tables<"cabins">["regular_price"];
  discount: Tables<"cabins">["discount"];
  description: Tables<"cabins">["description"];
  image: FileList | string;
};

export async function getCabins(): Promise<Tables<"cabins">[]> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be loaded");
  }

  return data;
}

export async function createNewCabin(
  cabin: newCabin
): Promise<Tables<"cabins">> {
  const isImageExist =
    cabin.image instanceof FileList && cabin.image.length > 0;

  const imageName =
    cabin.image instanceof FileList && isImageExist
      ? `${Math.random()}-${cabin.image[0].name}`.replaceAll("/", "")
      : "";

  const uploadNewImage = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image[0]);

  if (uploadNewImage.error) {
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  const query = await supabase
    .from("cabins")
    .insert([
      {
        name: cabin.name,
        max_capacity: cabin.max_capacity,
        regular_price: cabin.regular_price,
        discount: cabin.discount,
        description: cabin.description,
        image_url: `${supabaseUrl}/storage/v1/object/public/cabin-images/${uploadNewImage.data.path}`,
      },
    ])
    .select()
    .single();

  if (query.error || !query) {
    throw new Error("Cabin could not be created");
  }

  return query.data;
}

export async function editExistingCabin(
  cabin: newCabin,
  id: Tables<"cabins">["id"]
): Promise<Tables<"cabins">> {
  const isNewImage = cabin.image instanceof FileList && cabin.image.length > 0;

  const newImageName =
    cabin.image instanceof FileList && isNewImage
      ? `${Math.random()}-${cabin.image[0].name}`.replaceAll("/", "")
      : "";

  const uploadNewImage = await supabase.storage
    .from("cabin-images")
    .upload(newImageName, cabin.image[0]);

  if (uploadNewImage.error) {
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not edited"
    );
  }

  const imageUrl =
    uploadNewImage && uploadNewImage.data?.path
      ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${uploadNewImage.data.path}`
      : cabin.image.toString();

  const query = await supabase
    .from("cabins")
    .update({
      name: cabin.name,
      max_capacity: cabin.max_capacity,
      regular_price: cabin.regular_price,
      discount: cabin.discount,
      description: cabin.description,
      image_url: imageUrl,
    })
    .eq("id", id)
    .select()
    .single();

  if (query.error) {
    throw new Error("Cabin could not be edited");
  }

  return query.data;
}

export async function deleteCabin(id: number): Promise<Tables<"cabins">> {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
