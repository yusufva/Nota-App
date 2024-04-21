/*
  Warnings:

  - A unique constraint covering the columns `[nota_id]` on the table `Tx_Buy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nota_id]` on the table `Tx_Sell` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nota_id` to the `Tx_Buy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nota_id` to the `Tx_Sell` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tx_Buy" ADD COLUMN     "nota_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tx_Sell" ADD COLUMN     "nota_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tx_Buy_nota_id_key" ON "Tx_Buy"("nota_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tx_Sell_nota_id_key" ON "Tx_Sell"("nota_id");
