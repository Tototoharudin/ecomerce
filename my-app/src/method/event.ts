"use server";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getUsername = () => {
  return cookies().get("x-user-name")?.value;
};

export const handleLogout = async () => {
  cookies().delete("x-user-name");
  cookies().delete("Authorization");
  cookies().delete("x-user-id");
  redirect("/home");
};

export const addWishlist = async (id: ObjectId | undefined) => {
  try {
    const userId = (await cookies().get("x-user-id")?.value) as string;
    const request = fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": userId,
      },
      cache: "no-store",
      body: JSON.stringify({
        id: id,
      }),
    });

    return { msg: "Added Successfully" };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const removeWishlist = async (id: string) => {
  const userId = (await cookies().get("x-user-id")?.value) as string;
  const request = fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlist/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": userId,
      },
      cache: "no-store",
    }
  );

  redirect("/wishlist");
};
