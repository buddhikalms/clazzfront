-- AlterTable
ALTER TABLE `teacher` ADD COLUMN `allowedCountries` JSON NULL,
    ADD COLUMN `restrictedCountries` JSON NULL;
