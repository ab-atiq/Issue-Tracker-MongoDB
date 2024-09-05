"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const page = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root size="2" placeholder="Title" />
      <SimpleMDE placeholder="Description" />
      <Button>Submit Issues</Button>
    </div>
  );
};

export default page;
