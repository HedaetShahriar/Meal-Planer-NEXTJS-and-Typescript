"use server";
import { PaginatedResult } from "@/lib/types/paginatedResult";
import {
  foodFiltersSchema,
  FoodFiltersSchema,
} from "../_types/foodFiltersSchema";
import { Prisma } from "$/generated/prisma";
import db from "@/lib/db";
import { FoodSchema } from "../_types/foodSchema";
import { toStringSafe } from "@/lib/utils";

type FoodWithServingUnits = Prisma.FoodGetPayload<{
  include: {
    foodServingUnits: true;
  };
}>;

const getFoods = async (
  filters: FoodFiltersSchema,
): Promise<PaginatedResult<FoodWithServingUnits>> => {
  const validatedFilters = foodFiltersSchema.parse(filters);
  const {
    searchTerm,
    caloriesRange,
    proteinRange,
    categoryId,
    sortBy,
    sortOrder,
    page,
    pageSize,
  } = validatedFilters;

  const where: Prisma.FoodWhereInput = {};

  if (searchTerm) {
    where.name = {
      contains: searchTerm,
    };
  }
  const [minCaloriesStr, maxCaloriesStr] = caloriesRange;
  const numberMinCalories =
    minCaloriesStr === "" ? undefined : Number(minCaloriesStr);
  const numberMaxCalories =
    maxCaloriesStr === "" ? undefined : Number(maxCaloriesStr);
  if (numberMinCalories !== undefined || numberMaxCalories !== undefined) {
    where.calories = {};
    if (numberMinCalories !== undefined) {
      where.calories.gte = numberMinCalories;
    }
    if (numberMaxCalories !== undefined) {
      where.calories.lte = numberMaxCalories;
    }
  }

  const [minProteinStr, maxProteinStr] = proteinRange;
  const numberMinProtein =
    minProteinStr === "" ? undefined : Number(minProteinStr);
  const numberMaxProtein =
    maxProteinStr === "" ? undefined : Number(maxProteinStr);
  if (numberMinProtein !== undefined || numberMaxProtein !== undefined) {
    where.protein = {};
    if (numberMinProtein !== undefined) {
      where.protein.gte = numberMinProtein;
    }
    if (numberMaxProtein !== undefined) {
      where.protein.lte = numberMaxProtein;
    }
  }

  const numberCategoryId = categoryId ? Number(categoryId) : undefined;
  if (numberCategoryId !== undefined && numberCategoryId > 0) {
    where.category = { id: numberCategoryId };
  }

  const skip = (page - 1) * pageSize;
  const [total, data] = await Promise.all([
    db.food.count({ where }),
    db.food.findMany({
      where,
      orderBy: { [String(sortBy)]: sortOrder },
      skip,
      take: pageSize,
      include: {
        foodServingUnits: true,
      },
    }),
  ]);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
};

const getFood = async (id: number): Promise<FoodSchema | null> => {
  const res = await db.food.findFirst({
    where: { id },
    include: {
      foodServingUnits: true,
    },
  });
  if (!res) return null;
  return {
    action: "update",
    id,
    name: res.name,
    calories: toStringSafe(res.calories),
    protein: toStringSafe(res.protein),
    carboHydrates: toStringSafe(res.carbohydrates),
    fat: toStringSafe(res.fat),
    fiber: toStringSafe(res.fiber),
    sugar: toStringSafe(res.sugar),
    categoryId: toStringSafe(res.categoryId),
    foodServingUnits: res.foodServingUnits.map((unit) => ({
      foodServingUnitId: toStringSafe(unit.servingUnitId),
      grams: toStringSafe(unit.grams),
    })),
  };
};

export { getFoods, getFood };
