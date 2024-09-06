import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
  await delay(2000);

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>Created At: {issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default page;
