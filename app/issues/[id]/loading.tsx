import { Skeleton } from "@/app/components";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton width="7rem" />
      </Heading>
      <Flex className="space-x-3" my="2">
        <Skeleton width="4rem" />
        <Skeleton width="6rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={5} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
