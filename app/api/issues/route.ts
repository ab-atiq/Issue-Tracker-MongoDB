import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

const createIssueSchema = z.object({
  title: z.string().min(1, {message: "Title is required"}).max(255, "Title must be less than 255 characters"),
  description: z.string().min(1,"Description is required").max(1000, {message: "Description must be less than 1000 characters"}),
})

export async function POST(req: NextRequest) {
    const body = await req.json();
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success) {
        // return NextResponse.json(validation.error.issues, {status: 400});
        return NextResponse.json(validation.error.format(), {status: 400});
    }

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
        }
    });

    return NextResponse.json(newIssue, {status: 201});
}