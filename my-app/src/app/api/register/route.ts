// import UserModel from "@/database/models/users";

import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import UserModel from "../../../database/model/register";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newUser = await UserModel.create(body);

    return NextResponse.json(
      {
        data: body,
      },
      { status: 200 }
    );
  } catch (error) {
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

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
