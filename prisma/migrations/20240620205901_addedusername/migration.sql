/*
  Warnings:

  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "name",
ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'guest',
ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'guest';
