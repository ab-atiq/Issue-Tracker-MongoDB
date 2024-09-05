import {z} from 'zod';
export const createIssueSchema = z.object({
    title: z.string().min(1, {message: "Title is required"}).max(255, {message: "Title must be less than 255 characters"}),
    description: z.string().min(1,{message:"Description is required"}).max(1000, {message: "Description must be less than 1000 characters"}),
})