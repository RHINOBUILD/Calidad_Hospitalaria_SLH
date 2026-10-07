CREATE TABLE `quality_audit` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`record` text NOT NULL,
	`action` text NOT NULL,
	`before` text NOT NULL,
	`after` text NOT NULL,
	`at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_audit_owner` ON `quality_audit` (`owner`);--> statement-breakpoint
CREATE TABLE `quality_records` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`space` text NOT NULL,
	`kind` text NOT NULL,
	`title` text NOT NULL,
	`area` text NOT NULL,
	`responsible` text NOT NULL,
	`due` text NOT NULL,
	`status` text NOT NULL,
	`priority` text NOT NULL,
	`code` text NOT NULL,
	`evidence` text NOT NULL,
	`notes` text NOT NULL,
	`created` text NOT NULL,
	`updated` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_records_owner_space` ON `quality_records` (`owner`,`space`);--> statement-breakpoint
CREATE TABLE `quality_spaces` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`slot` text NOT NULL,
	`name` text NOT NULL,
	`company` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_spaces_owner` ON `quality_spaces` (`owner`);