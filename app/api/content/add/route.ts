import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req:NextRequest,res:NextResponse){
    const response = await req.json();
    const title = response.title;
    const desc = response.desc;
    console.log(title);
    return NextResponse.json({
        message: "Working"
    })
}