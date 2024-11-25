/*
  Warnings:

  - You are about to drop the `CompletedPractices` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `joinDate` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[CompletedPractices] DROP CONSTRAINT [CompletedPractices_practiceId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[CompletedPractices] DROP CONSTRAINT [CompletedPractices_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[User] ALTER COLUMN [email] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[User] ALTER COLUMN [passwordHash] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[User] ADD [emailVerified] BIT NOT NULL CONSTRAINT [User_emailVerified_df] DEFAULT 0,
[joinDate] DATETIME2 NOT NULL;

-- DropTable
DROP TABLE [dbo].[CompletedPractices];

-- CreateTable
CREATE TABLE [dbo].[CompletedPractice] (
    [id] INT NOT NULL IDENTITY(1,1),
    [practiceId] INT NOT NULL,
    [userId] INT NOT NULL,
    [completionDate] DATETIME2 NOT NULL,
    CONSTRAINT [CompletedPractice_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Favorite] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [practiceId] INT NOT NULL,
    CONSTRAINT [Favorite_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[CompletedPractice] ADD CONSTRAINT [CompletedPractice_practiceId_fkey] FOREIGN KEY ([practiceId]) REFERENCES [dbo].[Practice]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CompletedPractice] ADD CONSTRAINT [CompletedPractice_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Favorite] ADD CONSTRAINT [Favorite_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Favorite] ADD CONSTRAINT [Favorite_practiceId_fkey] FOREIGN KEY ([practiceId]) REFERENCES [dbo].[Practice]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
