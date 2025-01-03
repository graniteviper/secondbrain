import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

export async function POST(req: NextRequest,res:NextResponse) {
    const cookieStore = await cookies();
    const uid = cookieStore.get('uid')
    const decoded = jwt.verify(uid!.value,process.env.JWT_SECRET!);
    if(decoded){
        return NextResponse.json({
            message:"User Verified!"
        })
    }
}












/*export async function POST(req:NextRequest,res:NextResponse){
    const response = await req.json();
    try {
        const username = response.username
        const password = response.password
        if(!username || !password){
            return NextResponse.json({
                message: "Both Username and password are expected."
            })
        } else{

            const user = await prisma.user.findFirst({
                where:{
                    username: username
                }
            })

            if(user){
                const response = await bcrypt.compare(password,user!.password)
                // console.log(response);
                if(response){
                    return NextResponse.json({
                        message: "User Verified.",
                        status: 200
                    })
                }
            } else{
                return NextResponse.json({
                    status: 400,
                    message: "User Does not Exist."
                })
            }
        }
    } catch (error) {
        return NextResponse.json({
            message: "Unexpected error Occurred"
        })
    }
}*/