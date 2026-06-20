import { z } from "zod";

const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(12, "The post title must be 12 characters or more."),
  content: z
    .string()
    .trim()
    .min(50, "The post content must be 50 characters or more."),
});

const updatePostSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(12, "The post title must be 12 characters or more.")
      .optional(),
    content: z
      .string()
      .trim()
      .min(50, "The post content must be 50 characters or more.")
      .optional(),
  })
  .refine((data) => data.title || data.content, {
    message: "Either title or content is required",
    path: ["title"],
  });

export { createPostSchema, updatePostSchema };
