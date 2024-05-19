import { z } from "zod";
import { db } from "../config";
import { Wishlist } from "@/interfaces";

import { ObjectId } from "mongodb";

export const WishlistSchema = z.object({
  userId: z.string().nonempty({
    message: "cant be empty",
  }),
  productId: z.string().nonempty({
    message: "cant be empty",
  }),
  createdAt: z.string().nonempty({
    message: "cant be empty",
  }),
  updatedAt: z.string().nonempty({
    message: "cant be empty",
  }),
});

export default class WishlistsModel {
  static col() {
    return db.collection<Wishlist>("Wishlists");
  }
  static async findAll() {
    return await this.col().find({}).toArray();
  }

  static async getWishlist(userId: string) {
    return await this.col()
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "Products",

            localField: "productId",

            foreignField: "_id",

            as: "products",
          },
        },
      ])
      .toArray();
  }
  static async findByUserId(params: Object) {
    // const res =  await this.col().find({...params}).toArray();
    // throw new Error(res+"<<<<<<<<<<<<<<<<<<<<")
    return await this.col()
      .find({ ...params })
      .toArray();
  }
  static async create(params: Omit<Wishlist, "_id">) {
    const body = JSON.stringify(params);
    // const parseResult = WishlistSchema.safeParse([params]);
    // if(!parseResult.success){
    //   throw parseResult.error;
    // // }
    // throw new Error(JSON.stringify(params)+"<<<<<<<<<<<<<<")

    return await this.col().insertOne({
      ...params,
      _id: new ObjectId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  static async delete(params: string) {
    return await this.col().deleteOne({ _id: new ObjectId(params) });
  }
}
