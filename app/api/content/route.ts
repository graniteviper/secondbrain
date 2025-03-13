import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function authenticateUser() {
    const cookieStore = await cookies();
    const uid = cookieStore.get('uid');
    if (!uid) {
        throw new Error("User not authenticated.");
    }
    const userObject = uidToUsername(uid.value);
    if (!(userObject as JwtPayload)?.username) {
        throw new Error("Invalid user token.");
    }
    return (userObject as JwtPayload).username;
}

function uidToUsername(uid: string) {
    try {
        return jwt.verify(uid, process.env.JWT_SECRET!);
    } catch {
        throw new Error("Token verification failed.");
    }
}

// Helper function to handle response messages
function respond(message: string, statusCode = 200, id: number | undefined = undefined) {
    return NextResponse.json({ id,message }, { status: statusCode });
}

// POST - Add Content
export async function POST(req: NextRequest) {
    try {
        const { title, desc } = await req.json();
        const username = await authenticateUser();
        const cardContent = await prisma.content.create({
            data: { title, description: desc, username }
        });
        // console.log(cardContent);
        return respond("Content added successfully.",200,cardContent.id);
    } catch (error) {
        if (error instanceof Error) {
            return respond(error.message, 400);
        }
        return respond("An unknown error occurred.", 500);
    }
}

// DELETE - Remove Content
export async function DELETE(req: NextRequest) {
    try {
        let { contentId } = await req.json();
        contentId = parseInt(contentId);
        // console.log(contentId);
        if (!contentId) throw new Error("Content ID is required.");
        const username = await authenticateUser();
        await prisma.content.delete({
            where: { id: contentId, username }
        });
        return respond("Content deleted successfully.");
    } catch (error) {
        if (error instanceof Error) {
            return respond(error.message, 400);
        }
        return respond("An unknown error occurred.", 500);
    }
}

// PUT - Update Content
export async function PUT(req: NextRequest) {
    try {
        const { contentId, title, desc } = await req.json();
        // console.log(contentId, desc, title);
        const cardId = parseInt(contentId);
        // console.log(title);
        if (!title) throw new Error("Title is required.");
        const username = await authenticateUser();
        if(username){
            await prisma.content.update({
                where: { id: cardId },
                data: { title, description: desc }
            });
            return respond("Content updated successfully.");
        }
    } catch (error) {
        if (error instanceof Error) {
            return respond(error.message, 400);
        }
        return respond("An unknown error occurred.", 500);
    }
}

// GET - Fetch Contents
export async function GET() {
    try {
        const username = await authenticateUser();
        const contents = await prisma.content.findMany({ where: { username } });
        return NextResponse.json({ contents });
    } catch (error) {
        if (error instanceof Error) {
            return respond(error.message, 400);
        }
        return respond("An unknown error occurred.", 500);
    }
}
