import { NextResponse,NextRequest } from "next/server";

export async function POST(req: NextRequest,res:NextResponse){
    const data = await req.json();
    if(data){
        return NextResponse.json({
            status: 200,
            message: data
        })
    } else{
        return NextResponse.json({
            status: 400,
            message: "Data not found"
        })
    }
}