import { IssueStatusBadge, Link, Pagination } from "@/app/components";
import { Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import prisma from "@/prisma/client";
import delay from "delay";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  // console.log(searchParams);
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10; // 10 items per page

  const where = { status }; // same property use multiple times

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  // console.log(issues);

  const issueCount = await prisma.issue.count({ where });

  // await delay(1000);

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View project all issues",
};

export default IssuesPage;
