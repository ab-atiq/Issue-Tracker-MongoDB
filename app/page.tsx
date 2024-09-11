import { Button } from "@radix-ui/themes";
import { Pagination } from "@/app/components";
export default function Home({
  searchParams,
}: {
  searchParams?: { page: string };
}) {
  if (!searchParams?.page) searchParams = { page: "1" };
  return (
    <>
      <div>Hello World!</div>
      <Button>Radix UI button</Button>
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </>
  );
}
