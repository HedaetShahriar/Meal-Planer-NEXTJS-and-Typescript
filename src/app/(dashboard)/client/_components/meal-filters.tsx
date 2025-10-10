"use client";
import { useMealsStore } from "@/app/(dashboard)/client/_libs/use-meal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  mealFiltersDefaultValues,
  mealFiltersSchema,
  MealFiltersSchema,
} from "../_types/mealFiterSchema";
import { ControlledDatePicker } from "@/components/ui/controlled-date-picker";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const MealFilters = () => {
  const form = useForm<MealFiltersSchema>({
    defaultValues: mealFiltersDefaultValues,
    resolver: zodResolver(mealFiltersSchema),
  });

  const { updateMealFilters, mealFilters } = useMealsStore();

  // Initialize filters on mount
  useEffect(() => {
    updateMealFilters(mealFiltersDefaultValues);
  }, [updateMealFilters]);

  // Sync form with store
  useEffect(() => {
    form.reset(mealFilters);
  }, [mealFilters, form]);

  const onSubmit: SubmitHandler<MealFiltersSchema> = (data) => {
    updateMealFilters(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-4 flex items-center gap-3"
      >
        <ControlledDatePicker<MealFiltersSchema>
          name="dateTime"
          label="Filter by date"
        />
        <Button type="submit" size="sm">
          Apply
        </Button>
      </form>
    </FormProvider>
  );
};

export { MealFilters };
