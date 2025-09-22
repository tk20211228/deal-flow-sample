import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { users } from "./auth";
import { relations } from "drizzle-orm";

export const petType = ["dog", "cat"] as const;

// ペットの種類を定義するenum
export const petTypeEnum = pgEnum("pet_type", petType);

// ペットテーブルの定義
export const pets = pgTable("pets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid(10)),
  name: text("name").notNull(),
  type: petTypeEnum("type").notNull(),
  hp: integer("hp").notNull().default(50),
  ownerId: text("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const petRelations = relations(pets, ({ one }) => ({
  owner: one(users, {
    fields: [pets.ownerId],
    references: [users.id],
  }),
}));
