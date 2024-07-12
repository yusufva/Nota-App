/*
  Warnings:

  - You are about to drop the column `nota_id` on the `Supplier_Master` table. All the data in the column will be lost.
  - You are about to drop the column `supplier_id` on the `Tx_Buy` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tx_Buy" DROP CONSTRAINT "Tx_Buy_supplier_id_fkey";

-- AlterTable
ALTER TABLE "Supplier_Master" DROP COLUMN "nota_id";

-- AlterTable
ALTER TABLE "Tx_Buy" DROP COLUMN "supplier_id";
