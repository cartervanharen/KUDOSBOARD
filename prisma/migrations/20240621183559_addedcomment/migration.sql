-- CreateTable
CREATE TABLE "Comment" (
    "commentid" SERIAL NOT NULL,
    "cardid" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("commentid")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_cardid_fkey" FOREIGN KEY ("cardid") REFERENCES "Card"("cardid") ON DELETE RESTRICT ON UPDATE CASCADE;
