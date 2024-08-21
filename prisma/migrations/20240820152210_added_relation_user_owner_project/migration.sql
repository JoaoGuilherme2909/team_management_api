-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_OwnerId_fkey" FOREIGN KEY ("OwnerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
