import WishlistsModel from "@/database/model/wishlist";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await WishlistsModel.delete(params.id);
    return NextResponse.json({ msg: "Delete Successfully" });
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
