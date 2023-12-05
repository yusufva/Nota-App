/*
  Warnings:

  - Added the required column `product_id` to the `Bought_Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Sold_Items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bought_Items" ADD COLUMN     "product_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Sold_Items" ADD COLUMN     "product_id" UUID NOT NULL;
