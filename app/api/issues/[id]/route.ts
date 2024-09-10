import AuthOptions from "@/app/auth/AuthOptions";
import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(AuthOptions)
    if (!session)
        return NextResponse.json({}, { status: 401 })
    delay(500); // make server slow
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    if (!issue) {
        return NextResponse.json({ error: "Issue not found in DB" }, { status: 404 })
    }
    const updatedIssue = await prisma.issue.update({
        where: {
            id: parseInt(params.id)
        },
        data: { title: body.title, description: body.description }
    })
    return NextResponse.json(updatedIssue)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(AuthOptions)
    if (!session)
        return NextResponse.json({}, { status: 401 })
    delay(500); // make server slow
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    if (!issue) {
        return NextResponse.json({ error: "Issue not found in DB" }, { status: 404 })
    }
    await prisma.issue.delete({
        where: {
            id: parseInt(params.id)
        }
    })
    return NextResponse.json({})
}