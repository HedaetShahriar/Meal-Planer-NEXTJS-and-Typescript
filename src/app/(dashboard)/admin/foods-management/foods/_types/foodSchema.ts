import patterns from "@/lib/constanst";
import { regexSchema, requiredStringSchema } from "@/lib/zodSchemas";
import z from "zod";

const foodSchema = z.intersection(
  z.object({
    name: requiredStringSchema,
    calories: regexSchema(patterns.zeroTo9999),
    protein: regexSchema(patterns.zeroTo9999),
    fat: regexSchema(patterns.zeroTo9999),
    carboHydrates: regexSchema(patterns.zeroTo9999),
    fiber: regexSchema(patterns.zeroTo9999),
    sugar: regexSchema(patterns.zeroTo9999),
    categoryId: requiredStringSchema,
    foodServingUnits: z.array(
      z.object({
        foodServingUnitId: requiredStringSchema,
        grams: regexSchema(patterns.zeroTo9999),
      }),
    ),
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update"), id: z.number() }),
  ]),
);

type FoodSchema = z.infer<typeof foodSchema>;

const foodDefaultValues: FoodSchema = {
  action: "create",
  foodServingUnits: [],
  name: "",
  categoryId: "",
  calories: "",
  protein: "",
  fat: "",
  carboHydrates: "",
  fiber: "",
  sugar: "",
};

export { foodSchema, type FoodSchema, foodDefaultValues };
