/*
  Warnings:

  - You are about to drop the column `city` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `expiryDate` on the `PaymentInfo` table. All the data in the column will be lost.
  - Added the required column `address` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN "phoneNumber" INTEGER;
ALTER TABLE "Order" ADD COLUMN "pickUpPersonFirstName" TEXT;
ALTER TABLE "Order" ADD COLUMN "pickUpPersonLastName" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipCode" TEXT,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("country", "createdAt", "id", "state", "updatedAt", "userId", "zipCode") SELECT "country", "createdAt", "id", "state", "updatedAt", "userId", "zipCode" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE TABLE "new_PaymentInfo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cardNumberLast4" TEXT NOT NULL,
    "cardType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PaymentInfo" ("cardNumberLast4", "cardType", "createdAt", "id", "updatedAt") SELECT "cardNumberLast4", "cardType", "createdAt", "id", "updatedAt" FROM "PaymentInfo";
DROP TABLE "PaymentInfo";
ALTER TABLE "new_PaymentInfo" RENAME TO "PaymentInfo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
