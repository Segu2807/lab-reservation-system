import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret";

export interface JwtPayload {
  id: string;
  email: string;
  role: "ADMIN" | "USER" | "STUDENT";
}

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: "8h",
    algorithm: "HS256",
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, SECRET) as JwtPayload;
};

