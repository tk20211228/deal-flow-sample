import { pets, petType, petTypeEnum } from "@/db/schemas/pet";
import { z } from "better-auth";
import { createInsertSchema } from "drizzle-zod";

export const petFormSchema = createInsertSchema(pets, {
  hp: z
    .number()
    .min(0, "HPは0から100の間で入力してください")
    .max(100, "HPは0から100の間で入力してください"),
  name: z.string().trim().min(1, "名前は1文字以上で入力してください"),
  type: z.enum(petType),
}).omit({
  ownerId: true,
});
