import { db } from "../config";
import { Products } from "@/interfaces";
export default class Product {
  static col() {
    return db.collection<Products>("Products");
  }
  static async findAll() {
    return await this.col().find({}).toArray();
  }
  static async findBySlug(params: string) {
    return (await this.col().findOne({ slug: params })) as Products;
  }
}
