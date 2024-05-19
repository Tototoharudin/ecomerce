import { comparePasword } from "@/database/helpers/bcrypt";
import { signToken } from "@/database/helpers/jsonwebtoken";
import UserModel, { UserLoginSchema } from "@/database/model/register";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);

    const parseResult = UserLoginSchema.safeParse(body);

    if (!parseResult.success) {
      throw parseResult.error;
    }

    //Check if user is registered
    const user = await UserModel.findByEmail(body.email);

    if (!user) {
      throw Error("User is not registered");
    }

    //Check if password is correct
    if (!comparePasword(body.password, user.password)) {
      throw Error("Incorrect Password");
    }

    const accessToken = signToken({
      _id: user._id,
      email: user.email,
      username: user.username,
    });

    return NextResponse.json(
      {
        accessToken: accessToken,
        // Tambah Username Buat ditampilin di welcome
        username: user.username,
        // Tambah UserId Buat digunakan saat menambahkan wishlist
        userId: user._id,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error);

    if (error instanceof ZodError) {
      const err = error.issues[0].path + " " + error.issues[0].message;

      return NextResponse.json(
        {
          error: err,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
