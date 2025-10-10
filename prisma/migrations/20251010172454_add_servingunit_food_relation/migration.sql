-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ServingUnit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "foodId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ServingUnit_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ServingUnit" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "ServingUnit";
DROP TABLE "ServingUnit";
ALTER TABLE "new_ServingUnit" RENAME TO "ServingUnit";
CREATE UNIQUE INDEX "ServingUnit_name_key" ON "ServingUnit"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
