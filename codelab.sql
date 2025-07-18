-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: codelab
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(200) DEFAULT NULL,
  `category_description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (4,'Algoritmos e Estrutura de Dados','                    '),(5,'Lógica e Raciocínio Matemático','                    '),(6,'Programação Orientada a Objetos','                    '),(7,'Manipulação de Dados','                    ');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenges`
--

DROP TABLE IF EXISTS `challenges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `challenges` (
  `challenge_id` int(11) NOT NULL AUTO_INCREMENT,
  `challenge_title` varchar(200) DEFAULT NULL,
  `challenge_description` varchar(500) DEFAULT NULL,
  `challenge_difficulty` enum('easy','medium','hard') DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`challenge_id`),
  KEY `created_by` (`created_by`),
  KEY `fk_category` (`category_id`),
  CONSTRAINT `challenges_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenges`
--

LOCK TABLES `challenges` WRITE;
/*!40000 ALTER TABLE `challenges` DISABLE KEYS */;
INSERT INTO `challenges` VALUES (7,'Teste','                    ','easy',1,'2025-05-31',NULL),(8,'Teste','11                    ','easy',1,'2025-05-31',NULL),(11,'Ordenação Customizada de Strings','Desenvolva um algoritmo que ordena uma lista de strings com base em um critério personalizado: primeiro por comprimento da string (menores primeiro), depois em ordem alfabética.                 ','medium',1,'2025-05-31',4),(12,'Sistema de Biblioteca com Empréstimos','Implemente classes para representar livros, usuários e empréstimos. O sistema deve permitir que um usuário pegue um livro emprestado e registre a data. Inclua métodos para verificar disponibilidade e histórico.                    ','hard',1,'2025-05-31',6),(13,'Soma de Números Pares','Dado um array de números inteiros, some apenas os números pares.                    ','easy',1,'2025-05-31',7),(14,'Maior Número em um Array','Crie uma função que retorne o maior número presente em um array.                    ','easy',1,'2025-05-31',7),(19,'Teste','TESTE','easy',1,'2025-07-05',4),(20,'Novo desafio','','easy',1,'2025-07-05',4),(21,'Desafio Simples','Descri??o','easy',NULL,'2025-07-05',4);
/*!40000 ALTER TABLE `challenges` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger before_insert_challenge
before insert on challenges
for each row
set new.created_at = NOW() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `challenges_detalhado`
--

DROP TABLE IF EXISTS `challenges_detalhado`;
/*!50001 DROP VIEW IF EXISTS `challenges_detalhado`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `challenges_detalhado` AS SELECT
 1 AS `challenge_id`,
  1 AS `challenge_title`,
  1 AS `challenge_description`,
  1 AS `challenge_difficulty`,
  1 AS `created_at`,
  1 AS `user_name`,
  1 AS `category_name` */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `challenge_id` int(11) DEFAULT NULL,
  `comment` varchar(100) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `challenge_id` (`challenge_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`challenge_id`) REFERENCES `challenges` (`challenge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorite` (
  `user_id` int(11) NOT NULL,
  `challenge_id` int(11) NOT NULL,
  `favorited_at` date DEFAULT NULL,
  PRIMARY KEY (`user_id`,`challenge_id`),
  KEY `challenge_id` (`challenge_id`),
  CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `favorite_ibfk_2` FOREIGN KEY (`challenge_id`) REFERENCES `challenges` (`challenge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `list_users`
--

DROP TABLE IF EXISTS `list_users`;
/*!50001 DROP VIEW IF EXISTS `list_users`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `list_users` AS SELECT
 1 AS `user_id`,
  1 AS `user_name`,
  1 AS `user_email`,
  1 AS `user_admin` */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `submission`
--

DROP TABLE IF EXISTS `submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `submission` (
  `submission_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `challenge_id` int(11) DEFAULT NULL,
  `submission_code` varchar(100) DEFAULT NULL,
  `submission_score` int(11) DEFAULT NULL,
  `submited_at` date DEFAULT NULL,
  PRIMARY KEY (`submission_id`),
  KEY `fk_user_id` (`user_id`),
  KEY `fk_challenge_id` (`challenge_id`),
  CONSTRAINT `fk_challenge_id` FOREIGN KEY (`challenge_id`) REFERENCES `challenges` (`challenge_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submission`
--

LOCK TABLES `submission` WRITE;
/*!40000 ALTER TABLE `submission` DISABLE KEYS */;
INSERT INTO `submission` VALUES (1,11,14,'function obterMaiorNumeroDoArray(array) {\r\n return array && array.length > 0 ? Math.max(...array) : ',10,'2025-06-16');
/*!40000 ALTER TABLE `submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(30) DEFAULT NULL,
  `user_password` varchar(12) DEFAULT NULL,
  `user_name` varchar(30) DEFAULT NULL,
  `reset_token` varchar(30) DEFAULT NULL,
  `reset_token_expiration` date DEFAULT NULL,
  `user_admin` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'joao@gmail.com','123','joao bagatoli',NULL,NULL,1),(5,'wedley@email.com','123','wedley',NULL,NULL,1),(6,'guilherme@gmail.com','123','Guilherme',NULL,NULL,0),(11,'max@email.com','123','max',NULL,NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `challenges_detalhado`
--

/*!50001 DROP VIEW IF EXISTS `challenges_detalhado`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `challenges_detalhado` AS select `c`.`challenge_id` AS `challenge_id`,`c`.`challenge_title` AS `challenge_title`,`c`.`challenge_description` AS `challenge_description`,`c`.`challenge_difficulty` AS `challenge_difficulty`,`c`.`created_at` AS `created_at`,`u`.`user_name` AS `user_name`,`cat`.`category_name` AS `category_name` from ((`challenges` `c` left join `users` `u` on(`c`.`created_by` = `u`.`user_id`)) left join `categories` `cat` on(`c`.`category_id` = `cat`.`category_id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `list_users`
--

/*!50001 DROP VIEW IF EXISTS `list_users`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `list_users` AS select `users`.`user_id` AS `user_id`,`users`.`user_name` AS `user_name`,`users`.`user_email` AS `user_email`,`users`.`user_admin` AS `user_admin` from `users` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-06 21:38:44
