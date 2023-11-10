-- CreateTable
CREATE TABLE "Barang_Master" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Barang_Master_pkey" PRIMARY KEY ("id")
);
