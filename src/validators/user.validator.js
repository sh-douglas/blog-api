import { z } from "zod";

const updateUserRoleSchema = z.object({
  role: z.enum(["reader", "editor", "director"]),
});

export { updateUserRoleSchema };
