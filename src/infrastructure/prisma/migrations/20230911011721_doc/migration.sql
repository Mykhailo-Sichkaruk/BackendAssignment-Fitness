-- DropForeignKey
ALTER TABLE "CompletedExercise" DROP CONSTRAINT "CompletedExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "CompletedExercise" DROP CONSTRAINT "CompletedExercise_userId_fkey";

-- AddForeignKey
ALTER TABLE "CompletedExercise" ADD CONSTRAINT "CompletedExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedExercise" ADD CONSTRAINT "CompletedExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
