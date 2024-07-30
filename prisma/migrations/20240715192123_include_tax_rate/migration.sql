/*
  Warnings:

  - You are about to drop the column `taxInCents` on the `Order` table. All the data in the column will be lost.
  - Added the required column `taxRate` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "totalPriceInCents" INTEGER NOT NULL,
    "shippingFeeInCents" INTEGER NOT NULL,
    "taxRate" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "userId" TEXT NOT NULL,
    "phoneNumber" INTEGER,
    "pickUpPersonFirstName" TEXT,
    "pickUpPersonLastName" TEXT,
    "shippingAddressId" TEXT,
    "billingAddressId" TEXT NOT NULL,
    "paymentInfoId" TEXT NOT NULL,
    "addressType" TEXT NOT NULL DEFAULT 'PICKUP',
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Order_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_paymentInfoId_fkey" FOREIGN KEY ("paymentInfoId") REFERENCES "PaymentInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("addressType", "billingAddressId", "createdAt", "id", "paymentInfoId", "phoneNumber", "pickUpPersonFirstName", "pickUpPersonLastName", "shippingAddressId", "shippingFeeInCents", "status", "totalPriceInCents", "updatedAt", "userId") SELECT "addressType", "billingAddressId", "createdAt", "id", "paymentInfoId", "phoneNumber", "pickUpPersonFirstName", "pickUpPersonLastName", "shippingAddressId", "shippingFeeInCents", "status", "totalPriceInCents", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
