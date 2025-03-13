import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const body = await req.json();
  const username = body.username;
  const password = body.password;
  if (!username || !password) {
    return NextResponse.json({
      message: "Username and Password are expected.",
      status: 400
    });
  }

  const existingUser = await prisma.user.findFirst({
    where:{username: username}
  })

  if(existingUser){
    return NextResponse.json({
      message: "User already exists.",
      status: 400
    })
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hash,
    },
  });
  if (!user) {
    return NextResponse.json({
      message: "Error while creating User",
      status: 400
    });
  }
  const token = jwt.sign({ username: body.username }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
  cookieStore.set({
    name: "uid",
    value: token,
    httpOnly: true,
    path: "/",
  });
  return NextResponse.json({
    message: "User Created",
    status: 200
  });
}
