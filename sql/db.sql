 
DROP TABLE IF EXISTS `adonis_schema`;
CREATE TABLE IF NOT EXISTS `adonis_schema` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  `migration_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `adonis_schema`
--

INSERT INTO `adonis_schema` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, 'database/migrations/1656054685502_users', 1, '2022-06-24 07:47:24'),
(2, 'database/migrations/1656056680827_pets', 1, '2022-06-24 07:47:24');

-- --------------------------------------------------------

--
-- Table structure for table `adonis_schema_versions`
--

DROP TABLE IF EXISTS `adonis_schema_versions`;
CREATE TABLE IF NOT EXISTS `adonis_schema_versions` (
  `version` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `adonis_schema_versions`
--

INSERT INTO `adonis_schema_versions` (`version`) VALUES
(2);

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

DROP TABLE IF EXISTS `pets`;
CREATE TABLE IF NOT EXISTS `pets` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(12,0) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `created` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `avatar` varchar(1024) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(180) NOT NULL,
  `remember_me_token` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `avatar`, `email`, `password`, `remember_me_token`, `created`, `updated`) VALUES
(1, 'vilh', 'images/1660645290958.gif', '0', '$argon2id$v=19$t=3,m=4096,p=1$D/deO7zIXC1LU1R0mih3Fg$PRK33Pmtrum0s2n77AaSsAVc68DTXcXg9lBB89NZGz0', NULL, '2022-07-29 11:01:19', '2022-08-16 17:21:30'),
(3, 'zidane', NULL, 'zidane@gmail.com', '$argon2id$v=19$t=3,m=4096,p=1$cu9QDg0lz9r/tbB11jAdDg$jggcp6qi5Bm4jQ8G44+hQH6lPMD33ISwmExptHMteqE', NULL, '2022-08-16 14:25:57', '2022-08-16 14:25:57');
