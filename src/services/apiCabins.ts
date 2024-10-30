import supabase, { supabaseUrl } from "./supabase";
import { Tables } from "../types/supabase-type";

export type NewCabinType = {
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
  cabin: NewCabinType
): Promise<Tables<"cabins">> {
  const isImageExist =
    cabin.image instanceof FileList && cabin.image.length > 0;

  const imageName =
    cabin.image instanceof FileList &&
    isImageExist &&
    `${Math.random()}-${cabin.image[0].name}`.replaceAll("/", "");

  const uploadImage =
    imageName &&
    (await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabin.image[0]));

  if (uploadImage && uploadImage.error) {
    throw new Error(
      "Cabin image could not be up;loaded and the cabin was not created"
    );
  }

  let imageUrl;

  if (typeof cabin.image === "string") imageUrl = cabin.image;
  else if (
    cabin.image instanceof FileList &&
    uploadImage &&
    uploadImage.data.path
  )
    imageUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/${uploadImage.data.path}`;

  const query = await supabase
    .from("cabins")
    .insert([
      {
        name: cabin.name,
        max_capacity: cabin.max_capacity,
        regular_price: cabin.regular_price,
        discount: cabin.discount,
        description: cabin.description,
        image_url: imageUrl,
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
  cabin: NewCabinType,
  id: Tables<"cabins">["id"]
): Promise<Tables<"cabins">> {
  const isNewImage = cabin.image instanceof FileList && cabin.image.length > 0;

  const newImageName =
    cabin.image instanceof FileList &&
    isNewImage &&
    `${Math.random()}-${cabin.image[0].name}`.replaceAll("/", "");

  const uploadNewImage =
    newImageName &&
    (await supabase.storage
      .from("cabin-images")
      .upload(newImageName, cabin.image[0]));

  if (uploadNewImage && uploadNewImage.error) {
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not edited"
    );
  }

  let imageUrl;

  if (typeof cabin.image === "string") imageUrl = cabin.image;
  else if (
    cabin.image instanceof FileList &&
    uploadNewImage &&
    uploadNewImage.data.path
  )
    imageUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/${uploadNewImage.data.path}`;

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
