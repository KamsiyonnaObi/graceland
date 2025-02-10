/*
  Warnings:

  - The `FulfillmentType` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paystackCheckoutCode" TEXT,
DROP COLUMN "FulfillmentType",
ADD COLUMN     "FulfillmentType" "FulfillmentType" NOT NULL DEFAULT 'PICKUP';
