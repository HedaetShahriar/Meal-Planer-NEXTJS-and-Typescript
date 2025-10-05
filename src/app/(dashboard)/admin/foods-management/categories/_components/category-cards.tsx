"use client";
import { alert } from "@/lib/use-global-store";
import { useDeleteCategory } from "../_services/use-category-mutations";
import { useCategories } from "../_services/use-category-queries";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

const CategoryCards = () => {
  const categoriesQuery = useCategories();
  const deleteCategory = useDeleteCategory();
  return (
    <div className="grid grid-cols-4 gap-4">
      {categoriesQuery.data?.map((item) => (
        <div
          className="bg-accent flex flex-col justify-between gap-3 rounded-lg p-6 shadow-md"
          key={item.id}
        >
          <p className="truncate">{item.name}</p>
          <div className="flex gap-1">
            <Button className="size-6" variant="ghost" size="icon">
              <Edit />
            </Button>
            <Button
            
              className="size-6"
              variant="ghost"
              size="icon"
              onClick={() => {
                alert({
                  onConfirm: () => deleteCategory.mutate(item.id),
                });
              }}
            >
              <Trash />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCards;
