CREATE TABLE `backups` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`key` text NOT NULL,
	`created` text NOT NULL,
	`reason` text NOT NULL,
	`count` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_backups_owner` ON `backups` (`owner`);--> statement-breakpoint
CREATE TABLE `memberships` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`email` text NOT NULL,
	`user_id` text DEFAULT '' NOT NULL,
	`name` text NOT NULL,
	`role` text NOT NULL,
	`spaces` text NOT NULL,
	`areas` text NOT NULL,
	`employee_id` text NOT NULL,
	`active` text NOT NULL,
	`created` text NOT NULL,
	`updated` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_members_owner_email` ON `memberships` (`owner`,`email`);--> statement-breakpoint
CREATE TABLE `organizations` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`owner_email` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `stored_files` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`space` text NOT NULL,
	`area` text NOT NULL,
	`name` text NOT NULL,
	`mime` text NOT NULL,
	`size` text NOT NULL,
	`key` text NOT NULL,
	`created_by` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_files_owner_space` ON `stored_files` (`owner`,`space`);--> statement-breakpoint
ALTER TABLE `quality_audit` ADD `actor` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `quality_audit` ADD `space` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `quality_records` ADD `created_by` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `quality_records` ADD `submitted_by` text DEFAULT '' NOT NULL;