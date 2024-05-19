// import { Request } from "next/server";
import { ZodError } from "zod";
import WishlistModel from "@/database/model/wishlist";
import UserModel from "@/database/model/register";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    // const body = await request.json();
    // Dapatkan UserId
    const userId = request.headers.get("x-user-id") as string;

    const theresults = await WishlistModel.getWishlist(userId);
    return Response.json(theresults);
  } catch (error) {
    console.log(error);
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Dapatkan UserId
    const userId = request.headers.get("x-user-id") as string;
    // throw new Error(userId+"<<<<<<<<<<<<<<<<<<<<<<<<<<")
    // Cek Apakah sudah ada wishlist untuk user terkait atau belum
    const findByUserId = await WishlistModel.findByUserId({
      userId: new ObjectId(userId),
      productId: new ObjectId(body.id),
    });
    // throw new Error(JSON.stringify(findByUserId))
    if (findByUserId.length > 0) {
      throw new Error("Wishlist already exist");
    }
    const newWishlist = await WishlistModel.create({
      userId: new ObjectId(userId),
      productId: new ObjectId(body.id),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    if (!newWishlist) {
      return Response.json("Wishlist not created");
    }
    return Response.json(newWishlist);
  } catch (error) {
    throw error;
  }
}
