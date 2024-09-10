"use client";
import prisma from "@/prisma/client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/app/components/index";
import toast, { Toaster } from "react-hot-toast";

const AssignSelection = ({ issue }: { issue: Issue }) => {
  // const AssignSelection = async () => {
  // const users = await prisma.user.findMany(); // we can use this if this is server code
  // console.log(users);

  // const [users, setUsers] = useState<User[]>([]);
  // useEffect(() => {
  //   const FetchUsers = async () => {
  //     const { data } = await axios.get<User[]>("/api/users");
  //     setUsers(data);
  //   };
  //   FetchUsers();
  // }, []);

  // useQuery use
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;
  if (error) return null;

  const assignIssueHandler = (userId: string) => {
    if (userId === "null") {
      userId = "";
    }
    axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId || null,
      })
      .catch((error) => {
        toast.error("Changes could not be saved");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "null"}
        onValueChange={assignIssueHandler}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // refresh data after 60 sec
    retry: 3,
  });

export default AssignSelection;
