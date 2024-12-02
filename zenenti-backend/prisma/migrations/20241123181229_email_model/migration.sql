/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_email_key];

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [email];
ALTER TABLE [dbo].[User] ADD [emailId] INT;

-- CreateTable
CREATE TABLE [dbo].[Email] (
    [id] INT NOT NULL IDENTITY(1,1),
    [address] NVARCHAR(1000) NOT NULL,
    [verified] BIT NOT NULL CONSTRAINT [Email_verified_df] DEFAULT 0,
    CONSTRAINT [Email_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Email_address_key] UNIQUE NONCLUSTERED ([address])
);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_emailId_fkey] FOREIGN KEY ([emailId]) REFERENCES [dbo].[Email]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
