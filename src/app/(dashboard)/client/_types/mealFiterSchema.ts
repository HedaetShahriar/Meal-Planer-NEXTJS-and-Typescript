import z from "zod";

const mealFiltersSchema = z.object({
    dateTime: z.coerce.date(),
})

type MealFiltersSchema = z.infer<typeof mealFiltersSchema>;

const mealFiltersDefaultValues: MealFiltersSchema = {
    dateTime: new Date(),
}
export { mealFiltersSchema, type MealFiltersSchema, mealFiltersDefaultValues };