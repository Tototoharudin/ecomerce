import { jwtVerify } from "jose";
import { JwtPayload, sign, verify } from "jsonwebtoken";

export const signToken = (payload: JwtPayload) => {
  return sign(payload, process.env.SECRET_KEY as string);
};

export const verifyToken = (token: string) => {
  return verify(token, process.env.SECRET_KEY as string);
};

export const verifyWithJose = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY as string);

  return await jwtVerify<{
    _id: string;
    email: string;
    username: string;
  }>(token, secret);
};
