"use client";
import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/app/components/index";

const AssignSelection = () => {
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
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/apir/users").then((res) => res.data),
    staleTime: 60 * 1000, // refresh data after 60 sec
    retry: 3,
  });

  if (isLoading) return <Skeleton />;
  if (error) return null;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssignSelection;
