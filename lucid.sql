-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 13, 2024 at 06:12 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lucid`
--

-- --------------------------------------------------------

--
-- Table structure for table `adonis_schema`
--

CREATE TABLE `adonis_schema` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `batch` int NOT NULL,
  `migration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `adonis_schema`
--

INSERT INTO `adonis_schema` (`id`, `name`, `batch`, `migration_time`) VALUES
(172, 'database/migrations/1707307725718_roles', 1, '2024-03-19 15:46:20'),
(173, 'database/migrations/1707307896192_users', 1, '2024-03-19 15:46:20'),
(174, 'database/migrations/1707339659381_stores', 1, '2024-03-19 15:46:21'),
(175, 'database/migrations/1707366410273_categories', 1, '2024-03-19 15:46:21'),
(176, 'database/migrations/1707366430627_products', 1, '2024-03-19 15:46:21'),
(177, 'database/migrations/1707407036923_comments', 1, '2024-03-19 15:46:21'),
(178, 'database/migrations/1707407761410_carts', 1, '2024-03-19 15:46:21'),
(179, 'database/migrations/1707543657185_orders', 1, '2024-03-19 15:46:21'),
(180, 'database/migrations/1707726655353_tokens', 1, '2024-03-19 15:46:21');

-- --------------------------------------------------------

--
-- Table structure for table `adonis_schema_versions`
--

CREATE TABLE `adonis_schema_versions` (
  `version` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `adonis_schema_versions`
--

INSERT INTO `adonis_schema_versions` (`version`) VALUES
(2);

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `store_id` int UNSIGNED DEFAULT NULL,
  `product_id` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `store_id`, `product_id`, `created_at`, `updated_at`) VALUES
(4, 2, 1, 2, '2024-03-19 17:34:39', '2024-03-19 17:34:39'),
(5, 2, 1, 2, '2024-03-20 07:53:21', '2024-03-20 07:53:21'),
(7, 3, 1, 2, '2024-03-20 08:07:29', '2024-03-20 08:07:29'),
(8, 3, 1, 1, '2024-03-20 08:07:30', '2024-03-20 08:07:30'),
(10, 3, 2, 7, '2024-03-20 13:40:58', '2024-03-20 13:40:58'),
(11, 4, 1, 2, '2024-05-23 13:21:29', '2024-05-23 13:21:29'),
(12, 4, 1, 1, '2024-05-23 13:21:31', '2024-05-23 13:21:31'),
(14, 3, 1, 1, '2024-05-30 15:28:41', '2024-05-30 15:28:41'),
(15, 3, 1, 2, '2024-05-30 15:28:51', '2024-05-30 15:28:51'),
(16, 3, 1, 3, '2024-05-30 15:28:54', '2024-05-30 15:28:54'),
(17, 5, 1, 1, '2024-10-13 04:12:34', '2024-10-13 04:12:34');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `image`, `created_at`, `updated_at`) VALUES
(1, 'shirt', 'shirt', 'uploads/20240319-2253219a01ddb-eb81-4d0b-a93d-3e1048165ae8.jpg', '2024-03-19 15:53:02', '2024-03-19 15:53:02'),
(2, 'pants', 'pants', 'uploads/20240319-225319eea14530-6b01-43b8-b0d7-e19ea020109b.jpg', '2024-03-19 15:53:19', '2024-03-19 15:53:19');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int UNSIGNED NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `product_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `comments`, `product_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'kmk', 2, 2, '2024-03-20 08:08:38', '2024-03-20 08:08:38'),
(2, 'njnkjand', 7, 4, '2024-05-23 13:34:14', '2024-05-23 13:34:14'),
(3, 'jnajdkanjkdnjjnkjdndsf', 7, 4, '2024-05-23 13:34:24', '2024-05-23 13:34:24'),
(4, 'dkfkdnfkdnfkdf', 7, 3, '2024-05-23 13:34:58', '2024-05-23 13:34:58'),
(5, 'jkdsnjknfjdsnfjksdf', 7, 3, '2024-05-23 13:35:06', '2024-05-23 13:35:06'),
(6, 'jdkfsnjnjksdnf', 7, 3, '2024-05-23 13:35:10', '2024-05-23 13:35:10');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` char(36) NOT NULL,
  `status` enum('not','pending','paid','canceled') DEFAULT 'not',
  `qty` int DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `product_id` int UNSIGNED DEFAULT NULL,
  `store_id` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `status`, `qty`, `token`, `user_id`, `product_id`, `store_id`, `created_at`, `updated_at`) VALUES
('1d2f6280-af8f-470d-a99f-f0d597f0a389', 'not', 2, '0sHGrYfcY', 4, 1, 1, '2024-05-23 13:22:31', '2024-05-23 13:22:31'),
('2a22b145-a44e-476f-8f44-9f8c4e35a01e', 'paid', 1, 'nSPngRbdk', 2, 5, 1, '2024-03-19 15:57:41', '2024-03-19 15:57:41'),
('34967c2a-7394-414b-a447-a80e94421be3', 'not', 2, '0sHGrYfcY', 4, 2, 1, '2024-05-23 13:22:31', '2024-05-23 13:22:31'),
('3cc25f86-4c83-4286-8cb6-912c1214e7b4', 'paid', 1, 'nSPngRbdk', 2, 4, 1, '2024-03-19 15:57:41', '2024-03-19 15:57:41'),
('44dcc8bb-2c8c-41ab-ac95-1f64f3d0f230', 'not', 1, 'oHir6PCLS', 3, 5, 1, '2024-03-20 13:47:40', '2024-03-20 13:47:40'),
('473e37f7-b155-4230-ae66-f49a67b6bf76', 'not', 1, 'oHir6PCLS', 3, 1, 1, '2024-03-20 13:47:40', '2024-03-20 13:47:40'),
('4d6d4e0c-884e-4811-9b1c-0740f6950cd7', 'not', 1, 'oHir6PCLS', 3, 2, 1, '2024-03-20 13:47:40', '2024-03-20 13:47:40'),
('7033bbd1-d293-48c4-887e-3122d07d2983', 'not', 2, '0sHGrYfcY', 4, 5, 1, '2024-05-23 13:22:31', '2024-05-23 13:22:31'),
('9a379ee1-ea43-4e25-87fa-0a669d46c32b', 'not', 1, 'oHir6PCLS', 3, 7, 2, '2024-03-20 13:47:40', '2024-03-20 13:47:40'),
('c9ea221f-2e15-4126-b36f-b2f8719b3d9d', 'not', 1, 'u3xiFF4Vd', 5, 1, 1, '2024-10-13 04:25:56', '2024-10-13 04:25:56');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `qty` int NOT NULL,
  `price` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` int UNSIGNED DEFAULT NULL,
  `store_id` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `description`, `qty`, `price`, `image`, `category_id`, `store_id`, `created_at`, `updated_at`) VALUES
(1, 'Baju 1', 'baju-1', 'baju ini bagus', 2, 200000, 'uploads/20240319-2255703eb856c-be83-4d84-b636-46929ac5c12e.jpg', 1, 1, '2024-03-19 15:55:07', '2024-03-20 13:23:03'),
(2, 'Baju lalapan 2', 'baju-lalapan-2', 'baju ini bagus sekali cuy cuy cuy cuy cuy', 2, 200000, 'uploads/20240320-202318d5720a04-5094-4c4f-a327-3ded078b85c5.jpg', 1, 1, '2024-03-19 15:55:33', '2024-03-20 13:23:18'),
(3, 'Baju 3', 'baju-3', 'baju ini bagus', 10, 200000, 'uploads/20240319-2256738c73be7-8f6b-49cf-a7b9-d04fb83003e3.jpg', 1, 1, '2024-03-19 15:56:07', '2024-03-19 15:56:07'),
(4, 'Celana 1', 'celana-1', 'celana ini bagus', 3, 100000, 'uploads/20240319-225634ff7aa7e4-3935-40a6-80d5-297a04fcb367.jpg', 2, 1, '2024-03-19 15:56:34', '2024-03-19 15:56:34'),
(5, 'Celana 2', 'celana-2', 'celana ini bagus', 10, 100000, 'uploads/20240319-225657f07c5142-88a0-4cc0-a7cc-76f6802d95a2.jpg', 2, 1, '2024-03-19 15:56:57', '2024-03-19 15:56:57'),
(6, 'Celana 3', 'celana-3', 'celana ini bagus', 10, 100000, 'uploads/20240319-22572498cae684-b000-44ee-81e1-6c6a42c33a85.jpg', 2, 1, '2024-03-19 15:57:24', '2024-03-19 15:57:24'),
(7, 'Baju 1', 'baju-1-2', 'baju ini bagus daripada yang lain', 30, 300000, 'uploads/20240320-204039a041273b-18a2-41aa-8d7e-6999a1414c4a.jpg', 1, 2, '2024-03-20 13:40:39', '2024-03-20 13:40:39');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', NULL, NULL),
(2, 'User', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`id`, `name`, `slug`, `description`, `image`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'toko bagus', 'toko-bagus', 'toko ini bagus', 'uploads/20240319-22543392f9f996-7255-4158-9cc6-d48d127dd15f.png', 2, '2024-03-19 15:54:33', '2024-03-19 15:54:33'),
(2, 'Toko Elian', 'toko-elian', 'toko ini bagus sekali dulur', 'uploads/20240320-2037583b707428-3e19-422e-ba80-657a28134514.png', 3, '2024-03-20 13:37:58', '2024-03-20 13:37:58'),
(3, 'Jajo', 'jajo', 'kdkdkd', 'uploads/20240521-104745a3b12422-5648-480b-b0c5-f5b509b54506.jpg', 3, '2024-05-21 03:47:45', '2024-05-21 03:47:45');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `_zone` varchar(255) DEFAULT NULL,
  `loc` varchar(255) DEFAULT NULL,
  `invalid` varchar(255) DEFAULT NULL,
  `weekData` varchar(255) DEFAULT NULL,
  `localWeekData` varchar(255) DEFAULT NULL,
  `c` varchar(255) DEFAULT NULL,
  `o` varchar(255) DEFAULT NULL,
  `ts` varchar(255) DEFAULT NULL,
  `isLuxonDateTime` varchar(255) DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(180) DEFAULT NULL,
  `remember_me_token` varchar(255) DEFAULT NULL,
  `role_id` int UNSIGNED DEFAULT '2',
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `remember_me_token`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@mail.com', '$scrypt$n=16384,r=8,p=1$nibSsG/jl6MCVbQE1EhMrQ$DibaKqaa3/grYLyM4t0ds0RgBw6EROPvG4VcaE/bOK1DN04d71m8PRnQNhhJMW6vHaMrQNTy1wG80odrXXyMlg', NULL, 1, '2024-03-19 15:47:37', '2024-03-19 15:47:37'),
(2, 'Basri Ismail', 'basrismail98@gmail.com', NULL, NULL, 2, '2024-03-19 15:54:01', '2024-03-19 15:54:01'),
(3, 'elian', 'elian@mail.com', '$scrypt$n=16384,r=8,p=1$fYYSIvRUQhnIw9epCwmy/A$i48NU6x55o6FM2jfJNAsurlyx2aO6n4eSBY9y2Byb6NI5XGLm4HSJtBcJhtbpqyvp9uEGNv+bxQ76f+r/4WyCQ', NULL, 2, '2024-03-20 08:07:24', '2024-03-20 08:07:24'),
(4, 'Elian Hardiawan', 'elian.hardiawan2001@gmail.com', NULL, NULL, 2, '2024-05-23 13:21:19', '2024-05-23 13:21:19'),
(5, 'Elian Hardi', 'elianhardi805@gmail.com', NULL, NULL, 2, '2024-10-13 04:06:48', '2024-10-13 04:06:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_user_id_foreign` (`user_id`),
  ADD KEY `carts_store_id_foreign` (`store_id`),
  ADD KEY `carts_product_id_foreign` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_product_id_foreign` (`product_id`),
  ADD KEY `comments_user_id_foreign` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`),
  ADD KEY `orders_product_id_foreign` (`product_id`),
  ADD KEY `orders_store_id_foreign` (`store_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`),
  ADD KEY `products_store_id_foreign` (`store_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stores_user_id_foreign` (`user_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tokens_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_role_id_foreign` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `stores_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
