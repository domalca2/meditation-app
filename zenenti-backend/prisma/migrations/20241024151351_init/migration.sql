BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [user_id] INT NOT NULL IDENTITY(1,1),
    [user_name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [age] INT NOT NULL,
    [gender] NVARCHAR(1000) NOT NULL,
    [education] NVARCHAR(1000) NOT NULL,
    [profession] NVARCHAR(1000) NOT NULL,
    [country] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([user_id])
);

-- CreateTable
CREATE TABLE [dbo].[Level] (
    [level_id] INT NOT NULL IDENTITY(1,1),
    [level_name] NVARCHAR(1000) NOT NULL,
    [min_score] INT NOT NULL,
    [max_score] INT NOT NULL,
    CONSTRAINT [Level_pkey] PRIMARY KEY CLUSTERED ([level_id])
);

-- CreateTable
CREATE TABLE [dbo].[UserProgress] (
    [progress_id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [level_id] INT NOT NULL,
    [total_score] INT NOT NULL,
    [progress_percentage] DECIMAL(32,16) NOT NULL,
    [global_ranking] INT NOT NULL,
    [level_ranking] INT NOT NULL,
    [age_category_ranking] INT NOT NULL,
    [update_date] DATETIME2 NOT NULL,
    CONSTRAINT [UserProgress_pkey] PRIMARY KEY CLUSTERED ([progress_id])
);

-- CreateTable
CREATE TABLE [dbo].[Course] (
    [course_id] INT NOT NULL IDENTITY(1,1),
    [course_name] NVARCHAR(1000) NOT NULL,
    [course_description] NVARCHAR(1000) NOT NULL,
    [instructor_name] NVARCHAR(1000) NOT NULL,
    [duration] INT NOT NULL,
    [level_id] INT NOT NULL,
    [creation_date] DATETIME2 NOT NULL,
    [last_update_date] DATETIME2 NOT NULL,
    [course_status] NVARCHAR(1000) NOT NULL,
    [course_url] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Course_pkey] PRIMARY KEY CLUSTERED ([course_id])
);

-- CreateTable
CREATE TABLE [dbo].[Category] (
    [category_id] INT NOT NULL IDENTITY(1,1),
    [category_name] NVARCHAR(1000) NOT NULL,
    [category_description] NVARCHAR(1000) NOT NULL,
    [image_url] NVARCHAR(1000) NOT NULL,
    [creation_date] DATETIME2 NOT NULL,
    [last_update_date] DATETIME2 NOT NULL,
    CONSTRAINT [Category_pkey] PRIMARY KEY CLUSTERED ([category_id])
);

-- CreateTable
CREATE TABLE [dbo].[Duration] (
    [duration_id] INT NOT NULL IDENTITY(1,1),
    [duration_name] NVARCHAR(1000) NOT NULL,
    [duration_description] NVARCHAR(1000) NOT NULL,
    [creation_date] DATETIME2 NOT NULL,
    [last_update_date] DATETIME2 NOT NULL,
    CONSTRAINT [Duration_pkey] PRIMARY KEY CLUSTERED ([duration_id])
);

-- CreateTable
CREATE TABLE [dbo].[PracticeType] (
    [practice_type_id] INT NOT NULL IDENTITY(1,1),
    [practice_type_name] NVARCHAR(1000) NOT NULL,
    [practice_type_description] NVARCHAR(1000) NOT NULL,
    [creation_date] DATETIME2 NOT NULL,
    [last_update_date] DATETIME2 NOT NULL,
    CONSTRAINT [PracticeType_pkey] PRIMARY KEY CLUSTERED ([practice_type_id])
);

-- CreateTable
CREATE TABLE [dbo].[Practice] (
    [practice_id] INT NOT NULL IDENTITY(1,1),
    [is_game] BIT NOT NULL,
    [category_id] INT NOT NULL,
    [practice_type_id] INT NOT NULL,
    [duration_id] INT NOT NULL,
    [exact_time] INT NOT NULL,
    [practice_level] INT NOT NULL,
    [practice_score] INT NOT NULL,
    [practice_url] NVARCHAR(1000) NOT NULL,
    [file_name] NVARCHAR(1000) NOT NULL,
    [creation_date] DATETIME2 NOT NULL,
    [practice_status] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Practice_pkey] PRIMARY KEY CLUSTERED ([practice_id])
);

-- CreateTable
CREATE TABLE [dbo].[CompletedPractices] (
    [practice_log_id] INT NOT NULL IDENTITY(1,1),
    [practice_id] INT NOT NULL,
    [user_id] INT NOT NULL,
    [completion_date] DATETIME2 NOT NULL,
    CONSTRAINT [CompletedPractices_pkey] PRIMARY KEY CLUSTERED ([practice_log_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[UserProgress] ADD CONSTRAINT [UserProgress_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([user_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserProgress] ADD CONSTRAINT [UserProgress_level_id_fkey] FOREIGN KEY ([level_id]) REFERENCES [dbo].[Level]([level_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Course] ADD CONSTRAINT [Course_level_id_fkey] FOREIGN KEY ([level_id]) REFERENCES [dbo].[Level]([level_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Practice] ADD CONSTRAINT [Practice_category_id_fkey] FOREIGN KEY ([category_id]) REFERENCES [dbo].[Category]([category_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Practice] ADD CONSTRAINT [Practice_practice_type_id_fkey] FOREIGN KEY ([practice_type_id]) REFERENCES [dbo].[PracticeType]([practice_type_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Practice] ADD CONSTRAINT [Practice_duration_id_fkey] FOREIGN KEY ([duration_id]) REFERENCES [dbo].[Duration]([duration_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CompletedPractices] ADD CONSTRAINT [CompletedPractices_practice_id_fkey] FOREIGN KEY ([practice_id]) REFERENCES [dbo].[Practice]([practice_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CompletedPractices] ADD CONSTRAINT [CompletedPractices_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([user_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
