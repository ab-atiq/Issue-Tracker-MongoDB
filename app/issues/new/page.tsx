"use client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";

import SimpleMDE from "react-simplemde-editor"; // method-1
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import delay from "delay";

// method-2: Dynamically import SimpleMDE with SSR disabled
// import dynamic from "next/dynamic";
// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false,
// });

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  // console.log(register("title"));
  

  const [error, setError] = useState<string | null>(null);
  // const [titleError, setTitleError] = useState<string | null>(null);
  // const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);
    try {
      setIsSubmitting(true);
      await delay(2000);
      // await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setError("An unexpected error occurred. Please try again later.");
      // if (error?.response?.data?.title) {
      //   setTitleError(error?.response?.data?.title);
      // }
      // if (error?.response?.data?.description) {
      //   setDescriptionError(error?.response?.data?.description);
      // }
    }
  });

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
      <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
        <TextField.Root size="2" placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button type="submit" disabled={isSubmitting}>
          Submit Issues{isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
