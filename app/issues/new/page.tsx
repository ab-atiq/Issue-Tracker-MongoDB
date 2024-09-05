"use client";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

import SimpleMDE from "react-simplemde-editor"; // method-1
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

// method-2: Dynamically import SimpleMDE with SSR disabled
// import dynamic from "next/dynamic";
// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false,
// });

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  // console.log(register("title"));

  const [error, setError] = useState<string | null>(null);
  // const [titleError, setTitleError] = useState<string | null>(null);
  // const [descriptionError, setDescriptionError] = useState<string | null>(null);

  return (
    <div>
      {error && (
        <Callout.Root color="red" role="alert" className="mb-2">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          // console.log(data);
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            console.log(error);
            setError("An unexpected error occurred. Please try again later.");
            // if (error?.response?.data?.title) {
            //   setTitleError(error?.response?.data?.title);
            // }
            // if (error?.response?.data?.description) {
            //   setDescriptionError(error?.response?.data?.description);
            // }
          }
        })}
      >
        <TextField.Root size="2" placeholder="Title" {...register("title")} />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button type="submit">Submit Issues</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
