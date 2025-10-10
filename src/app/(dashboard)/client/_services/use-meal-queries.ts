import { useQuery } from "@tanstack/react-query";
import { useMealsStore } from "../_libs/use-meal-store";
import { getMeal, getMeals } from "./mealQueries";

const useMeals = () => {
  const { mealFilters } = useMealsStore();
  // safely convert dateTime to ISO string only if it's a valid Date
  const dateTimeKey =
    mealFilters.dateTime && mealFilters.dateTime instanceof Date
      ? mealFilters.dateTime.toISOString()
      : undefined;

  return useQuery({
    queryKey: ["meals", { dateTime: dateTimeKey }],
    queryFn: () => getMeals(mealFilters),
  });
};

const useMeal = () => {
  const { selectedMealId } = useMealsStore();

  return useQuery({
    queryKey: ["meals", { selectedMealId }],
    queryFn: () => getMeal(selectedMealId!),
    enabled: !!selectedMealId,
  });
};

export { useMeals, useMeal };
