import { compareSync, hashSync } from "bcryptjs";

export const hashPassword = (password: string) => {
  return hashSync(password);
};

export const comparePasword = (password: string, password_db: string) => {
  return compareSync(password, password_db);
};
