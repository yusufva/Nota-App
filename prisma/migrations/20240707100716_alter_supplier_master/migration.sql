/*
  Warnings:

  - Added the required column `nota_id` to the `Supplier_Master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier_id` to the `Tx_Buy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Supplier_Master" ADD COLUMN     "nota_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tx_Buy" ADD COLUMN     "supplier_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tx_Buy" ADD CONSTRAINT "Tx_Buy_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier_Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
