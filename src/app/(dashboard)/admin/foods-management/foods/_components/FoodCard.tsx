"use client";
import React from 'react';
import { useFoodsStore } from '../_libs/use-food-store';
import { useFoods } from '../_services/use-food-queries';
import { useDeleteFood } from '../_services/use-food-mutations';
import NoItemsFound from '@/components/no-items-found';
import { FoodCardsSkeleton } from './food-cards-skeleton';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Pagination } from '@/components/ui/pagination';

const FoodCard = () => {
  const {
    updateSelectedFoodId,
    updateFoodDialogOpen,
    foodFilters,
    updateFoodFiltersPage,
  } = useFoodsStore();

  const foodsQuery = useFoods();

  const deleteFoodMutation = useDeleteFood();

  const totalPages = foodsQuery.data?.totalPages;

  if (totalPages === 0) {
    return <NoItemsFound onClick={() => updateFoodDialogOpen(true)} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-4">
        {foodsQuery.isLoading ? (
          <FoodCardsSkeleton />
        ) : (
          <>
            {foodsQuery.data?.data.map((item) => (
              <div
                className="flex flex-col gap-3 rounded-lg border p-6"
                key={item.id}
              >
                <div className="flex justify-between">
                  <p className="truncate">{item.name}</p>
                  <div className="flex gap-1">
                    <Button
                      className="size-6"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        updateSelectedFoodId(item.id);
                        updateFoodDialogOpen(true);
                      }}
                    >
                      <Edit />
                    </Button>
                    <Button
                      className="size-6"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        alert({
                          onConfirm: () => deleteFoodMutation.mutate(item.id),
                        });
                      }}
                    >
                      <Trash />
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-foreground/60 text-sm font-normal">
                      Calories
                    </p>
                    <p className="text-sm font-medium">{item.calories} kcal</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm font-normal">
                      Carbohydrates
                    </p>
                    <p className="text-sm font-medium">
                      {item.carbohydrates} g
                    </p>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm font-normal">
                      Protein
                    </p>
                    <p className="text-sm font-medium">{item.protein} g</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm font-normal">
                      Fat
                    </p>
                    <p className="text-sm font-medium">{item.fat} g</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Pagination
        currentPage={foodFilters.page}
        totalPages={totalPages}
        updatePage={updateFoodFiltersPage}
      />
    </div>
  );
};

export default FoodCard;