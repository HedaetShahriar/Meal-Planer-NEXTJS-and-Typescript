import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MealSchema } from "../_types/mealSchema";
import { createMeal, deleteMeal, updateMeal } from "./meal-mutations";
import { toast } from "sonner";

const useCreateMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MealSchema) => {
      const result = await createMeal(data);
      return result;
    },
    onSuccess: () => {
      toast.success("Meal created successfully.");
      // Simply invalidate all meals queries - this should be sufficient
      queryClient.invalidateQueries({
        queryKey: ["meals"],
      });
    },
  });
};

const useUpdateMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MealSchema) => {
      await updateMeal(data);
    },
    onSuccess: () => {
      toast.success("Meal updated successfully.");
      // Invalidate all meal-related queries with broader matching
      queryClient.invalidateQueries({
        queryKey: ["meals"],
        exact: false,
      });
    },
  });
};

const useDeleteMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteMeal(id);
    },
    onSuccess: () => {
      toast.success("Meal deleted successfully.");
      // Invalidate all meal-related queries with broader matching
      queryClient.invalidateQueries({
        queryKey: ["meals"],
        exact: false,
      });
    },
  });
};

export { useCreateMeal, useDeleteMeal, useUpdateMeal };
