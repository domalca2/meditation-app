/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Practice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `PracticeType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Practice` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Practice] ADD [name] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[Category] ADD CONSTRAINT [Category_title_key] UNIQUE NONCLUSTERED ([title]);

-- CreateIndex
ALTER TABLE [dbo].[Practice] ADD CONSTRAINT [Practice_name_key] UNIQUE NONCLUSTERED ([name]);

-- CreateIndex
ALTER TABLE [dbo].[PracticeType] ADD CONSTRAINT [PracticeType_title_key] UNIQUE NONCLUSTERED ([title]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
