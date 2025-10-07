
import { useQuery } from "@tanstack/react-query";
import { getFood, getFoods } from "./foodQueries";
import { useFoodsStore } from "../_libs/use-food-store";

const useFoods = () => {
  const { foodFilters } = useFoodsStore();

  return useQuery({
    queryKey: ["foods", foodFilters],
    queryFn: () => getFoods(foodFilters),
  });
};

const useFood = () => {
  const { selectedFoodId } = useFoodsStore();

  return useQuery({
    queryKey: ["foods", { selectedFoodId }],
    queryFn: () => getFood(selectedFoodId!),
    enabled: !!selectedFoodId,
  });
};

export { useFoods, useFood };
