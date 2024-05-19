import { z } from "zod";
import { hashPassword } from "../helpers/bcrypt";
import { ObjectId } from "mongodb";
import { User } from "@/interfaces";
import { getCollection } from "../config";
import { error } from "console";
// import { getCollection } from "../config";

type NewUserInput = Omit<User, "_id">;

export const UserInputSchema = z.object({
  name: z.string().nonempty({
    message: "cant be empty",
  }),
  username: z.string().nonempty({
    message: "cant be empty",
  }),
  email: z.string().email().nonempty({
    message: "cant be empty",
  }),
  password: z.string().min(5).nonempty({
    message: "cant be empty",
  }),
});

export const UserLoginSchema = z.object({
  email: z.string().email().nonempty({
    message: "cant be empty",
  }),
  password: z.string().nonempty({
    message: "cant be empty",
  }),
});

class UserModel {
  static getCollection() {
    return getCollection("Users");
  }

  static async findAll() {
    const user = (await this.getCollection().find().toArray()) as User[];
    return user;
  }

  static async findById(id: string) {
    const user = (await this.getCollection().findOne({
      _id: new ObjectId(id),
    })) as User | null;
    return user;
  }

  static async findByEmail(email: string) {
    const user = (await this.getCollection().findOne({
      email: email,
    })) as User | null;
    // throw new Error(user);
    return user;
  }

  static async create(newUser: NewUserInput) {
    const parseResult = UserInputSchema.safeParse(newUser);

    if (!parseResult.success) {
      throw parseResult.error;
    }

    return await this.getCollection().insertOne({
      ...newUser,
      password: hashPassword(newUser.password),
    });
  }
}

export default UserModel;
