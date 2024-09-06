import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  // if (typeof params.id !== "number") {
  //   notFound();
  // }
  let issue = null;
  try {
    issue = await prisma.issue.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    // not data found in db then not found page show
    if (!issue) {
      notFound();
    }
  } catch (error) {
    notFound();
  }
  return (
    <div>
      <h1>{issue.title}</h1>
      <p>{issue.description}</p>
      <p>Status: {issue.status}</p>
      <p>Created At: {issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default page;
