import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

export async function POST(req: NextRequest,res:NextResponse){
    const response = await req.json();
    // console.log(response);
    
    try {
        if(response){
            const username: string = response.username;
            const password: string = response.password;
            if(!username || !password){
                return NextResponse.json({
                    status: 400,
                    message: "Data not found"
                }); 
            } else{
                const hash = await bcrypt.hash(password,10);
                if(!hash){
                    return NextResponse.json({
                        status:500,
                        message: "Internal Server Error."
                    })
                } else{
                    const user = await prisma.user.create({
                        data:{
                            username,
                            password: hash
                        }
                    })
                    console.log(user);
                    if(user){
                        return NextResponse.json({
                            status: 200,
                            message:"User Created."
                        })
                    }
                }
            }
        } else{
            return NextResponse.json({
                status: 400,
                message: "Data not found"
            })
        }
    } catch (error) {
        return NextResponse.json({
            status: 400,
            message: "Unexpected"
        })
    }
}