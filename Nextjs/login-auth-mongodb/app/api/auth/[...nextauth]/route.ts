import { connectDB } from "@/app/libs/mongodb";
import User from "@/app/models/user";
import { TUser } from "@/types/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "@gmail.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        // const user = {
        //   id: "1",
        //   fullname: "J Smith",
        //   email: "example@gmail.com",
        // };
        // return user;

        await connectDB();
        console.log(credentials);

        const userFound = await User.findOne({
          email: credentials?.email,
        }).select("+password");
        if (!userFound) throw new Error("Invalid credentials");
        console.log(userFound);

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );
        if (!passwordMatch) throw new Error("Invalid credentials");

        // console.log(userFound);
        return userFound;
      },
    }),
  ],

  callbacks: {
    jwt({ account, token, user, profile, session }) {
      // console.log({
      //   account,
      //   token,
      //   user,
      //   profile,
      // });
      if (user) token.user = user;
      // console.log(token);
      return token;
    },
    session({ session, token }) {
      session.user = token.user as TUser;
      // console.log(session, token);
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
