import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(12, "The post title must be 12 characters or more."),
  content: z
    .string()
    .min(50, "The post content must be 50 characters or more."),
});

export { createPostSchema };
