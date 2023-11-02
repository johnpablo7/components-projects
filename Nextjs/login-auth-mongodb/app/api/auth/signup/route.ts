import { NextResponse } from "next/server";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/libs/mongodb";
import { EMAIL_ALREADY_EXISTS } from "@/constants/error-codes";

export async function POST(request: Request) {
  // const body = await request.json();
  // console.log(body);

  const { email, password, fullname } = await request.json();
  console.log(email, password, fullname);

  if (!password || password.length < 6)
    return NextResponse.json(
      {
        message: "Password must be at least 6 characters",
      },
      {
        status: 400,
      }
    );

  try {
    // throw new Error("my custom error!!!");
    await connectDB();
    const userFound = await User.findOne({ email });

    if (userFound)
      return NextResponse.json(
        {
          code: EMAIL_ALREADY_EXISTS,
          message: "Correo ya existe",
        },
        {
          status: 409,
        }
      );

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword, fullname });
    const savedUser = await user.save();
    console.log(savedUser);

    // return NextResponse.json({ message: "signup" });
    return NextResponse.json({
      _id: savedUser._id,
      email: savedUser.email,
      fullname: savedUser.fullname,
    });
  } catch (error) {
    console.log(error);
    // return NextResponse.error();
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }
}
