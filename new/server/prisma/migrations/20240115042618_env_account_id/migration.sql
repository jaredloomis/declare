/*
  Warnings:

  - Added the required column `account_id` to the `environment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "environment" ADD COLUMN     "account_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "environment" ADD CONSTRAINT "environment_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
