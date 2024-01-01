import { JwtPayload, verify } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "./schema";
import { User } from "./generated/graphql";
import { User as UserAdapter, convertObj } from "./adapter";

export async function authenticateUser(
  token: string,
): Promise<User | undefined> {
  if (!token) {
    return undefined;
  }

  return new Promise((resolve, reject) =>
    verify(token, process.env.JWT_SECRET!, (error, decoded) => {
      if (error) {
        resolve(undefined);
      } else {
        prisma.user_info
          .findUnique({ where: { id: (decoded as JwtPayload).id } })
          .then(user => resolve(convertObj(user, UserAdapter) as User));
      }
    }),
  );
}

export async function checkPassword(
  providedPassword: string,
  dbPassword: string,
): Promise<boolean> {
  return bcrypt.compare(providedPassword, dbPassword);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
