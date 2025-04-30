/*
  Warnings:

  - You are about to drop the column `sortinOrder` on the `ZapRun` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "sortinOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ZapRun" DROP COLUMN "sortinOrder";
