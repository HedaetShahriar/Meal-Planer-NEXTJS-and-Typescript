"use server";
import { auth } from "@/lib/auth";
import {
  mealFiltersSchema,
  MealFiltersSchema,
} from "../_types/mealFiterSchema";
import { Prisma } from "$/generated/prisma";
import db from "@/lib/db";
import { MealSchema } from "../_types/mealSchema";
import { toStringSafe } from "@/lib/utils";

const getMeals = async (filters: MealFiltersSchema) => {
  const validatedFilters = mealFiltersSchema.parse(filters);

  const session = await auth();
  const { dateTime } = validatedFilters || {};

  const where: Prisma.MealWhereInput = {};

  if (dateTime !== undefined) {
    const startDate = new Date(dateTime);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(dateTime);
    endDate.setHours(23, 59, 59, 999);
    where.dateTime = { gte: startDate, lte: endDate };
  }

  if (session?.user?.id) {
    where.userId = { equals: +session.user.id };
  }

//   console.log("🔍 Prisma where clause:", where);

  const data = await db.meal.findMany({
    where,
    orderBy: { dateTime: "desc" },
    include: {
      mealFoods: {
        include: { food: true, servingUnit: true },
      },
    },
  });

//   console.log("🍽️ Meals fetched:", data);

  return data;
};


const getMeal = async (id: number): Promise<MealSchema | null> => {
  const res = await db.meal.findFirst({
    where: { id },
    include: {
      mealFoods: {
        include: {
          food: true,
          servingUnit: true,
        },
      },
    },
  });

  if (!res) return null;

  return {
    action: "update" as const,
    id,
    dateTime: res.dateTime,
    userId: toStringSafe(res.userId),
    mealFoods:
      res.mealFoods.map((item) => ({
        foodId: toStringSafe(item.foodId),
        amount: toStringSafe(item.amount),
        servingUnitId: toStringSafe(item.servingUnitId),
      })) ?? [],
  };
};

export { getMeal, getMeals };
