import { ObjectId } from "mongodb";

export interface Products {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  image: string[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface Wishlist {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: string;
  updatedAt: string;
}
