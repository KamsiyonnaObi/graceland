/*
  Warnings:

  - You are about to alter the column `totalPriceInCents` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `shippingFeeInCents` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `taxesPaid` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "totalPriceInCents" SET DATA TYPE INTEGER,
ALTER COLUMN "shippingFeeInCents" SET DEFAULT 0,
ALTER COLUMN "shippingFeeInCents" SET DATA TYPE INTEGER,
ALTER COLUMN "taxesPaid" SET DATA TYPE DOUBLE PRECISION;
