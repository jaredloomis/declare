import  express  from 'express';
import { JwtPayload, verify } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "./schema";

export function authenticateUser(req: express.Request, res: express.Response, next: any): void {
  if(!req?.headers?.authorization) {
    req.user = undefined;
    return next();
  }

  const token = req.headers.authorization.split(" ")[1];
  verify(token, process.env.JWT_SECRET!, (error, decoded) => {
    if(error) {
      req.user = undefined;
      next();
    } else {
      prisma.user_info.findUnique({ where: { id: (decoded as JwtPayload).userId } })
      .then((user) => {
        (req.user as any) = user;
        next();
      })
      .catch((err) => {
        req.user = undefined;
        next();
      });
      next();
    }
  });
}

export async function checkPassword(providedPassword: string, dbPassword: string): Promise<boolean> {
  return bcrypt.compare(providedPassword, dbPassword);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}