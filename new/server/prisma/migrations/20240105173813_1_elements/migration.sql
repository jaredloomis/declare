-- CreateTable
CREATE TABLE "element" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER NOT NULL,
    "selector_type" TEXT NOT NULL,
    "selector" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "collection_id" INTEGER NOT NULL,

    CONSTRAINT "element_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "element" ADD CONSTRAINT "collection_id" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "element" ADD CONSTRAINT "element_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
