/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Order_Status" AS ENUM ('CREATED', 'PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED');

-- CreateEnum
CREATE TYPE "Payment_Status" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "payment_status" "Payment_Status" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "status",
ADD COLUMN     "status" "Order_Status" NOT NULL DEFAULT 'CREATED';
