import { client } from "@/config/client";
import { TNewUser } from "../types/user";

export const AuthService = {
  // signin(email: string, password: string) {
  //   return client.post("/api/auth/signin", {
  //     email,
  //     password,
  //   });
  // },

  signup(newUser: TNewUser) {
    return client.post("/api/auth/signup", newUser);
  },
};
