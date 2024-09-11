import AuthOptions from "@/app/auth/AuthOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(AuthOptions)
    if (!session) return NextResponse.json({}, { status: 401 })

    // delay(500); // make server slow

    // body data validation
    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    // Issue table assignedToUserId property is present in User table or not
    const { assignedToUserId } = body;
    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: {
                id: assignedToUserId
            }
        })
        if (!user) {
            return NextResponse.json({ error: "Invalid user!" }, { status: 400 })
        }
    }

    // given id issue present in DB or not
    const issue = await prisma.issue.findUnique({
        where: {
            id: params.id
        }
    })
    if (!issue) {
        return NextResponse.json({ error: "Issue not found in DB" }, { status: 404 })
    }

    // update issue
    const updatedIssue = await prisma.issue.update({
        where: {
            id: params.id
        },
        data: { title: body.title, description: body.description, assignedToUserId }
    })
    return NextResponse.json(updatedIssue)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(AuthOptions)
    if (!session) return NextResponse.json({}, { status: 401 })
    // delay(500); // make server slow
    const issue = await prisma.issue.findUnique({
        where: {
            id: params.id
        }
    })
    if (!issue) {
        return NextResponse.json({ error: "Issue not found in DB" }, { status: 404 })
    }
    await prisma.issue.delete({
        where: {
            id: params.id
        }
    })
    return NextResponse.json({})
}