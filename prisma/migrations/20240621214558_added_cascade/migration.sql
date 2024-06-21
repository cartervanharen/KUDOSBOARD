-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_cardid_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_cardid_fkey" FOREIGN KEY ("cardid") REFERENCES "Card"("cardid") ON DELETE CASCADE ON UPDATE CASCADE;
