/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Product_Master` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product_Master" ALTER COLUMN "buying_price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Product_Stock" ALTER COLUMN "quantity" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Product_Master_name_key" ON "Product_Master"("name");
