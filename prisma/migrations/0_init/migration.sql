-- CreateTable
CREATE TABLE `chats` (
    `chat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` INTEGER NULL,
    `is_active` BOOLEAN NOT NULL,
    `session_id` VARCHAR(1000) NULL,
    `chat_history` VARCHAR(100) NULL,

    PRIMARY KEY (`chat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documents` (
    `document_id` INTEGER NOT NULL AUTO_INCREMENT,
    `document_title` VARCHAR(100) NULL,
    `document_path` VARCHAR(1000) NULL,
    `document_last_update` INTEGER NOT NULL,
    `document_last_size` FLOAT NULL,
    `last_sync_at` INTEGER NULL,

    PRIMARY KEY (`document_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `messages` (
    `message_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(100) NULL,
    `created_at` INTEGER NULL,
    `chat_id` INTEGER NULL,
    `rang` INTEGER NULL,

    INDEX `messages_FK`(`chat_id`),
    PRIMARY KEY (`message_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_FK` FOREIGN KEY (`chat_id`) REFERENCES `chats`(`chat_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

