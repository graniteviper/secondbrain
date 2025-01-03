import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req: NextRequest, res: NextResponse){
    const cookieStore = await cookies();
    const body = await req.json();
    const title:string = body.title;
    const desc:string = body.desc;
    const uid = cookieStore.get('uid');
    if(!uid){

        // Logout the user.

        return NextResponse.json({
            message: "User not verified"
        })
    }
    const userObject = uidToUsername(uid!.value);
    if(!userObject){

        // Logout the user.

        return NextResponse.json({
            message: "User is not verified."
        })
    };
    const user = await prisma.user.findFirst({
        where:{
            //@ts-ignore
            username: userObject.username
        }
    });    
    if(!user){
        return NextResponse.json({
            message: "User does not exist."
        })
    }
    const cardContent = await prisma.content.create({
        data:{
            title,
            description: desc,
            //@ts-ignore
            username:userObject.username,
        }
    });    
    if(!cardContent){
        return NextResponse.json({
            message:"Error while creating the Card."
        })
    };
    return NextResponse.json({
        cardContent,
        message:"Content added."
    });
}

export async function DELETE(req: NextRequest, res: NextResponse){
    const body = await req.json();
    const contentId = body.contentId;
    if(!contentId){
        return NextResponse.json({
            message: "Content ID not found."
        });
    }
    const cookieStore = await cookies();
    const uid = cookieStore.get('uid')
    const userObject = uidToUsername(uid!.value);
    //@ts-ignore
    const username = userObject.username;
    if(!username){
        return NextResponse.json({
            message: "User not verified."
        })
    };
    const deleted = await prisma.content.delete({
        where:{
            id: contentId,
            //@ts-ignore
            username: userObject.username
        }
    })
    return NextResponse.json({
        message: "Content Deleted Successfully."
    })
}

export async function PUT(req: NextRequest, res: NextResponse){

}

export async function GET(req: NextRequest, res: NextResponse){

}



function uidToUsername(uid: string){
    const decodedToken = jwt.verify(uid,process.env.JWT_SECRET!);
    return decodedToken;
}