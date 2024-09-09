import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
