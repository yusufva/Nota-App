-- DropForeignKey
ALTER TABLE "Bought_Items" DROP CONSTRAINT "Bought_Items_tx_id_fkey";

-- DropForeignKey
ALTER TABLE "Product_Stock" DROP CONSTRAINT "Product_Stock_id_fkey";

-- DropForeignKey
ALTER TABLE "Sold_Items" DROP CONSTRAINT "Sold_Items_tx_id_fkey";

-- AddForeignKey
ALTER TABLE "Product_Stock" ADD CONSTRAINT "Product_Stock_id_fkey" FOREIGN KEY ("id") REFERENCES "Product_Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bought_Items" ADD CONSTRAINT "Bought_Items_tx_id_fkey" FOREIGN KEY ("tx_id") REFERENCES "Tx_Buy"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sold_Items" ADD CONSTRAINT "Sold_Items_tx_id_fkey" FOREIGN KEY ("tx_id") REFERENCES "Tx_Sell"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
