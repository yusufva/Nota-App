/*
  Warnings:

  - You are about to drop the `Barang_Master` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Barang_Master";

-- CreateTable
CREATE TABLE "Product_Master" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "buying_price" INTEGER NOT NULL,
    "selling_price" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_Master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_Stock" (
    "id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tx_Buy" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "final_price" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tx_Buy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bought_Items" (
    "id" SERIAL NOT NULL,
    "tx_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "buying_price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bought_Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tx_Sell" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "final_price" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tx_Sell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sold_Items" (
    "id" SERIAL NOT NULL,
    "tx_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "selling_price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sold_Items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tx_Buy_date_key" ON "Tx_Buy"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Tx_Sell_date_key" ON "Tx_Sell"("date");

-- AddForeignKey
ALTER TABLE "Product_Stock" ADD CONSTRAINT "Product_Stock_id_fkey" FOREIGN KEY ("id") REFERENCES "Product_Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bought_Items" ADD CONSTRAINT "Bought_Items_tx_id_fkey" FOREIGN KEY ("tx_id") REFERENCES "Tx_Buy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sold_Items" ADD CONSTRAINT "Sold_Items_tx_id_fkey" FOREIGN KEY ("tx_id") REFERENCES "Tx_Sell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
