CREATE TABLE `transaction` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`send_amount` integer NOT NULL,
	`send_currency` text NOT NULL,
	`receive_amount` integer NOT NULL,
	`receive_currency` text NOT NULL,
	`completed_at` integer,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
