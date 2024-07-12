-- AlterTable
ALTER TABLE "Tx_Buy" ADD COLUMN     "supplier_id" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Supplier_Master" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "nota_id" TEXT NOT NULL,
    "cp" TEXT,
    "alamat" TEXT,

    CONSTRAINT "Supplier_Master_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tx_Buy" ADD CONSTRAINT "Tx_Buy_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier_Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
