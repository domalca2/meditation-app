BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [passwordHash] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Category] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [iconPrimaryUrl] NVARCHAR(1000) NOT NULL,
    [iconSecondaryUrl] NVARCHAR(1000) NOT NULL,
    [iconCardUrl] NVARCHAR(1000) NOT NULL,
    [backgroundUrl] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Category_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PracticeType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [PracticeType_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Practice] (
    [id] INT NOT NULL IDENTITY(1,1),
    [categoryId] INT NOT NULL,
    [practiceTypeId] INT NOT NULL,
    [durationMillis] INT NOT NULL,
    [audioUrl] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Practice_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CompletedPractices] (
    [id] INT NOT NULL IDENTITY(1,1),
    [practiceId] INT NOT NULL,
    [userId] INT NOT NULL,
    [completionDate] DATETIME2 NOT NULL,
    CONSTRAINT [CompletedPractices_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Practice] ADD CONSTRAINT [Practice_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[Category]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Practice] ADD CONSTRAINT [Practice_practiceTypeId_fkey] FOREIGN KEY ([practiceTypeId]) REFERENCES [dbo].[PracticeType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CompletedPractices] ADD CONSTRAINT [CompletedPractices_practiceId_fkey] FOREIGN KEY ([practiceId]) REFERENCES [dbo].[Practice]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CompletedPractices] ADD CONSTRAINT [CompletedPractices_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
