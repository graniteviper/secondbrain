import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

export async function POST(req: NextRequest,res:NextResponse) {
    const cookieStore = await cookies();
    const body = await req.json();
    const username = body.username;
    const password = body.password;
    if(!username || !password){
        return NextResponse.json({
            message: "Credentials are required."
        })
    };

    const user = await prisma.user.findFirst({
        where: { username: username },
    });

    if(!user){
        return NextResponse.json({
            message: "User does not exist."
        })
    }

    const match = await bcrypt.compare(password,user!.password)
    if(!match){
        return NextResponse.json({
            message: "Password is invalid"
        })
    };
    const token = jwt.sign({username:username},process.env.JWT_SECRET!,{expiresIn: "24h"})
    cookieStore.set({
        name: "uid",
        value: token,
        httpOnly: true,
        path: "/",
    });
    return NextResponse.json({
        message: "User logged in.",
        username: user?.username
    })
}






// const uid = cookieStore.get('uid')
// const decoded = jwt.verify(uid!.value,process.env.JWT_SECRET!);