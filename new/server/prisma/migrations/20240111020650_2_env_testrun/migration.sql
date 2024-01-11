/*
  Warnings:

  - You are about to drop the column `created_by` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `suite` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `suite` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `test` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `test` table. All the data in the column will be lost.
  - Added the required column `created_by_id` to the `collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by_id` to the `collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by_id` to the `report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `suite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by_id` to the `suite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by_id` to the `test` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "collection" DROP CONSTRAINT "collection_created_by_fkey";

-- DropForeignKey
ALTER TABLE "collection" DROP CONSTRAINT "collection_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "report" DROP CONSTRAINT "report_created_by_fkey";

-- DropForeignKey
ALTER TABLE "report" DROP CONSTRAINT "report_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "suite" DROP CONSTRAINT "suite_created_by_fkey";

-- DropForeignKey
ALTER TABLE "suite" DROP CONSTRAINT "suite_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "test" DROP CONSTRAINT "test_created_by_fkey";

-- DropForeignKey
ALTER TABLE "test" DROP CONSTRAINT "test_updated_by_fkey";

-- AlterTable
ALTER TABLE "collection" DROP COLUMN "created_by",
DROP COLUMN "updated_by",
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "updated_by_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "report" DROP COLUMN "created_by",
DROP COLUMN "updated_by",
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "updated_by_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "suite" DROP COLUMN "created_by",
DROP COLUMN "updated_by",
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "updated_by_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "test" DROP COLUMN "created_by",
DROP COLUMN "updated_by",
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "updated_by_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "environment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER NOT NULL,
    "variables" JSONB NOT NULL,

    CONSTRAINT "environment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_run" (
    "id" SERIAL NOT NULL,
    "test_id" INTEGER NOT NULL,
    "environment_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "start_time" TIMESTAMP(6) NOT NULL,
    "end_time" TIMESTAMP(6) NOT NULL,
    "step_results" JSONB NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" INTEGER NOT NULL,

    CONSTRAINT "test_run_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suite" ADD CONSTRAINT "suite_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suite" ADD CONSTRAINT "suite_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test" ADD CONSTRAINT "test_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test" ADD CONSTRAINT "test_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test_run" ADD CONSTRAINT "test_run_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "suite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test_run" ADD CONSTRAINT "test_run_environment_id_fkey" FOREIGN KEY ("environment_id") REFERENCES "environment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test_run" ADD CONSTRAINT "test_run_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
