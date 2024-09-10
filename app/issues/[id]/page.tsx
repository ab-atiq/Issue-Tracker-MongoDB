import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/auth/AuthOptions";
import AssignSelection from "./AssignSelection";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(AuthOptions);
  // if (typeof params.id !== "number") {
  //   notFound();
  // }
  await delay(1000);
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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssignSelection />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
