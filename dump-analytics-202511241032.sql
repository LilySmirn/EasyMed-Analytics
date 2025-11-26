-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: analytics
-- ------------------------------------------------------
-- Server version	8.4.5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `external_id` int unsigned NOT NULL,
  `speciality_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_doctor_specialty` (`id`,`speciality_id`),
  UNIQUE KEY `unique_external_id` (`external_id`),
  KEY `doctors_ibfk_1` (`speciality_id`),
  CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`speciality_id`) REFERENCES `specialities` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (1,'110000013',110000013,35),(2,'7125',7125,52),(7,'100000028',100000028,40),(8,'100000011',100000011,39),(9,'7334',7334,42),(12,'7354',7354,35),(14,'110000088',110000088,46),(17,'110000073',110000073,45),(18,'100000004',100000004,54),(19,'7179',7179,46),(21,'100000012',100000012,53),(23,'100000023',100000023,50),(24,'100000031',100000031,55),(28,'7319',7319,42),(29,'100000022',100000022,50),(30,'7304',7304,46),(32,'7282',7282,46),(33,'110000040',110000040,46),(35,'110000014',110000014,63),(37,'110000086',110000086,55),(40,'7046',7046,42),(42,'110000033',110000033,40),(43,'110000045',110000045,45),(44,'100000010',100000010,42),(46,'110000030',110000030,43),(47,'6919',6919,53),(48,'7175',7175,40),(49,'110000071',110000071,58),(50,'100000036',100000036,40),(51,'100000040',100000040,57),(52,'110000012',110000012,46),(60,'110000042',110000042,62),(61,'110000096',110000096,47),(62,'7071',7071,50),(65,'110000072',110000072,45),(66,'100000020',100000020,40),(67,'100000014',100000014,39),(68,'7127',7127,40),(70,'110000020',110000020,45),(71,'110000092',110000092,52),(72,'110000093',110000093,40),(73,'110000074',110000074,64),(77,'100000003',100000003,65),(79,'6747',6747,40),(82,'7080',7080,46),(90,'100000006',100000006,63),(94,'100000017',100000017,46),(96,'110000018',110000018,35),(98,'110000001',110000001,46),(102,'110000099',110000099,39),(104,'7289',7289,61),(105,'110000101',110000101,58),(107,'6905',6905,58),(108,'110000102',110000102,46),(111,'110000103',110000103,67),(115,'110000106',110000106,39),(116,'110000108',110000108,40),(123,'110000111',110000111,46),(129,'110000112',110000112,58),(133,'110000114',110000114,57),(135,'110000113',110000113,52),(137,'110000078',110000078,36),(138,'110000115',110000115,60);
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_services`
--

DROP TABLE IF EXISTS `patient_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_services` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `visit_id` int unsigned NOT NULL,
  `service_id` int unsigned NOT NULL,
  `status` enum('provided','prescribed') NOT NULL,
  `service_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `visit_id` (`visit_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `patient_services_ibfk_1` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`id`),
  CONSTRAINT `patient_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `service_catalog` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_services`
--

LOCK TABLES `patient_services` WRITE;
/*!40000 ALTER TABLE `patient_services` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_catalog`
--

DROP TABLE IF EXISTS `service_catalog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_catalog` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `service_code` varchar(50) NOT NULL,
  `clinic_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_catalog`
--

LOCK TABLES `service_catalog` WRITE;
/*!40000 ALTER TABLE `service_catalog` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_catalog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialities`
--

DROP TABLE IF EXISTS `specialities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialities` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `external_id` int unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_external_id` (`external_id`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialities`
--

LOCK TABLES `specialities` WRITE;
/*!40000 ALTER TABLE `specialities` DISABLE KEYS */;
INSERT INTO `specialities` VALUES (35,55,'МРТ 3 Тесла (Магнитно-резонансная томография)'),(36,35,'Процедурный кабинет'),(37,59,'Лабораторная диагностика (INVITRO)'),(38,10,'Кардиолог'),(39,36,'Оториноларинголог (ЛОР)'),(40,49,'УЗИ'),(41,2,'Гинеколог'),(42,26,'Функциональная диагностика'),(43,40,'Чек-ап программы'),(44,24,'Ю не исп'),(45,33,'СКТ (Спиральная компьютерная томография)'),(46,72,'Манипуляции амбулаторно'),(47,9,'Онколог, Онколог-маммолог'),(48,4,'Эндокринолог'),(49,81,'Хирург'),(50,16,'Невролог'),(51,31,'Дерматовенеролог'),(52,74,'Проктолог'),(53,34,'Диетолог'),(54,12,'Уролог'),(55,62,'Косметолог'),(56,29,'Нефролог'),(57,21,'Травматолог-ортопед'),(58,11,'Массажист'),(59,19,'Остеопат'),(60,28,'Физиотерапевт'),(61,15,'Терапевт'),(62,17,'Гастроэнтеролог'),(63,22,'Сосудистый хирург (Флеболог)'),(64,310075,'Ревматолог'),(65,25,'Гастроэнтеролог детский'),(66,75,'Мануальный терапевт'),(67,18,'Психолог'),(68,54,'Вакцинация');
/*!40000 ALTER TABLE `specialities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visits` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `patient_id` int unsigned NOT NULL,
  `doctor_id` int unsigned NOT NULL,
  `visit_type` enum('primary','repeat') NOT NULL,
  `visit_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `visits_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
/*!40000 ALTER TABLE `visits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'analytics'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-24 10:32:23
