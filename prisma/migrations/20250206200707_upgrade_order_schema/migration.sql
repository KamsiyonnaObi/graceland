/*
  Warnings:

  - You are about to drop the column `addressType` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `payment_status` on the `Order` table. All the data in the column will be lost.
  - You are about to alter the column `taxesPaid` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `phoneNumber` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('CREATED', 'PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "FulfillmentType" AS ENUM ('PICKUP', 'SHIPPING');

-- CreateEnum
CREATE TYPE "TrackingStatus" AS ENUM ('IN_TRANSIT', 'OUT_FOR_DELIVERY', 'READY_FOR_PICKUP', 'DELIVERED');

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_billingAddressId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "addressType",
DROP COLUMN "payment_status",
ADD COLUMN     "FulfillmentType" TEXT NOT NULL DEFAULT 'PICKUP',
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "paymentStatus" "paymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "trackingId" TEXT,
ALTER COLUMN "totalPriceInCents" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "shippingFeeInCents" SET DEFAULT 0,
ALTER COLUMN "shippingFeeInCents" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "taxesPaid" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "phoneNumber" SET NOT NULL,
ALTER COLUMN "billingAddressId" DROP NOT NULL,
ALTER COLUMN "orderEmail" DROP DEFAULT,
DROP COLUMN "status",
ADD COLUMN     "status" "orderStatus" NOT NULL DEFAULT 'CREATED',
ALTER COLUMN "deliveryNote" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "Order_Status";

-- DropEnum
DROP TYPE "Payment_Status";

-- CreateTable
CREATE TABLE "TrackingInfo" (
    "id" TEXT NOT NULL,
    "courierName" TEXT NOT NULL,
    "trackingNumber" TEXT,
    "status" "TrackingStatus" NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "driverName" TEXT,

    CONSTRAINT "TrackingInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_trackingId_fkey" FOREIGN KEY ("trackingId") REFERENCES "TrackingInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
