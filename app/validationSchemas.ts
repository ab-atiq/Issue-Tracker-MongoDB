import { z } from 'zod';
export const issueSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(255, { message: "Title must be less than 255 characters" }),
    description: z.string().min(1, { message: "Description is required" }).max(65535, { message: "Description must be less than 65535 characters" }),
})

export const patchIssueSchema = z.object({
    title: z.
        string().
        min(1, { message: "Title is required" }).
        max(255, { message: "Title must be less than 255 characters" }).
        optional(),
    description: z.
        string().
        min(1, { message: "Description is required" }).
        max(65535, { message: "Description must be less than 1000 characters" }).
        optional(),
    assignedToUserId: z
        .string()
        .min(1, "AssignedToUserId is required.")
        .max(255)
        .optional()
        .nullable(),
})