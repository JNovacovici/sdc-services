-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Questions'
--
-- ---

DROP TABLE IF EXISTS `Questions`;

CREATE TABLE `Questions` (
  `product_id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `question_id` INTEGER NULL DEFAULT NULL,
  `question_text` VARCHAR(1000) NULL DEFAULT NULL,
  `question_date` TIMESTAMP NULL DEFAULT NULL,
  `asker_name` VARCHAR(60) NULL DEFAULT NULL,
  `helpfulness` INTEGER NULL DEFAULT NULL,
  `reported` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`question_id`)
);

-- ---
-- Table 'Answers'
--
-- ---

DROP TABLE IF EXISTS `Answers`;

CREATE TABLE `Answers` (
  `question_id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `answer_id` INTEGER NULL DEFAULT NULL,
  `answer_text` VARCHAR(1000) NULL DEFAULT NULL,
  `answer_date` TIMESTAMP NULL DEFAULT NULL,
  `answer_name` VARCHAR(60) NULL DEFAULT NULL,
  `helpfulness` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`answer_id`)
);

-- ---
-- Table 'Photos'
--
-- ---

DROP TABLE IF EXISTS `Photos`;

CREATE TABLE `Photos` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `answer_id` INTEGER NULL DEFAULT NULL,
  `url` VARCHAR(2083) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Product'
--
-- ---

DROP TABLE IF EXISTS `Product`;

CREATE TABLE `Product` (
  `product_id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  PRIMARY KEY (`product_id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Questions` ADD FOREIGN KEY (product_id) REFERENCES `Product` (`product_id`);
ALTER TABLE `Answers` ADD FOREIGN KEY (question_id) REFERENCES `Questions` (`question_id`);
ALTER TABLE `Photos` ADD FOREIGN KEY (answer_id) REFERENCES `Answers` (`answer_id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Questions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Answers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Questions` (`product_id`,`question_id`,`question_text`,`question_date`,`asker_name`,`helpfulness`,`reported`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `Answers` (`question_id`,`answer_id`,`answer_text`,`answer_date`,`answer_name`,`helpfulness`) VALUES
-- ('','','','','','');
-- INSERT INTO `Photos` (`id`,`answer_id`,`url`) VALUES
-- ('','','');
-- INSERT INTO `Product` (`product_id`) VALUES
-- ('');