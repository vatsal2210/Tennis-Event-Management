CREATE DATABASE  IF NOT EXISTS `tennis` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `tennis`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: tennis
-- ------------------------------------------------------
-- Server version	5.5.48

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `draw`
--

DROP TABLE IF EXISTS `draw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `draw` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `tournament_id` varchar(255) DEFAULT NULL,
  `round_no` varchar(255) DEFAULT NULL,
  `draw_no` varchar(255) DEFAULT NULL,
  `match_no` varchar(255) DEFAULT NULL,
  `reg_no1` varchar(45) DEFAULT NULL,
  `reg_no2` varchar(45) DEFAULT NULL,
  `player1` varchar(255) DEFAULT NULL,
  `player2` varchar(255) DEFAULT NULL,
  `court_no` varchar(255) DEFAULT NULL,
  `match_date` varchar(255) DEFAULT NULL,
  `match_time` varchar(255) DEFAULT NULL,
  `reg_no` varchar(45) DEFAULT NULL,
  `winner` varchar(255) DEFAULT NULL,
  `set1_player1` varchar(255) DEFAULT NULL,
  `set1_player2` varchar(255) DEFAULT NULL,
  `set2_player1` varchar(255) DEFAULT NULL,
  `set2_player2` varchar(255) DEFAULT NULL,
  `set3_player1` varchar(255) DEFAULT NULL,
  `set3_player2` varchar(255) DEFAULT NULL,
  `set4_player1` varchar(255) DEFAULT NULL,
  `set4_player2` varchar(255) DEFAULT NULL,
  `set5_player1` varchar(255) DEFAULT NULL,
  `set5_player2` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `draw`
--

LOCK TABLES `draw` WRITE;
/*!40000 ALTER TABLE `draw` DISABLE KEYS */;
INSERT INTO `draw` VALUES (38,'4','Round-1','4','1','414708','','NISHANT DABAS (DL)','Bye','','','','414708','NISHANT DABAS (DL)','','','','','','','','','','','Girls ','Under-12'),(39,'4','Round-1','4','2','','414748','Bye','DIVESH GAHLOT (HR)','','','','414748','DIVESH GAHLOT (HR)','','','','','','','','','','','Girls ','Under-12'),(40,'4','Round-1','4','3','409243','415289','DENIM YADAV (MP)','DHRUV TANGRI (PB)','2','2016-12-31','12:59','409243','DENIM YADAV (MP)','','','','','','','','','','','Girls ','Under-12'),(41,'4','Round-1','4','4','414702','418850','SUSHANT DABAS (HR)','AMAN DAHIYA (HR)','1','2017-12-31','12:59','418850','AMAN DAHIYA (HR)','','','','','','','','','','','Girls ','Under-12'),(42,'4','Round-2','4','5','414708','414748','NISHANT DABAS (DL)','DIVESH GAHLOT (HR)','','','','414708','NISHANT DABAS (DL)','','','','','','','','','','','Girls ','Under-12'),(43,'4','Round-2','4','6','409243','418850','DENIM YADAV (MP)','AMAN DAHIYA (HR)','','','','418850','AMAN DAHIYA (HR)','','','','','','','','','','','Girls ','Under-12'),(44,'4','Round-3','4','7','414708','418850','NISHANT DABAS (DL)','AMAN DAHIYA (HR)','','','','414708','NISHANT DABAS (DL)','','','','','','','','','','','Girls ','Under-12');
/*!40000 ALTER TABLE `draw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `players` (
  `rank` int(255) DEFAULT NULL,
  `first_name` text,
  `last_name` text,
  `reg_no` int(8) DEFAULT NULL,
  `dob` text,
  `state` varchar(255) DEFAULT NULL,
  `single_point` int(255) DEFAULT NULL,
  `double_point` int(255) DEFAULT NULL,
  `double_point_25` float DEFAULT NULL,
  `under16_point` float DEFAULT NULL,
  `late_wl` float DEFAULT NULL,
  `under14_point` float DEFAULT NULL,
  `total_point` float DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,'SANDEEP','V M',414519,'9/4/2003','(TN)',456,400,100,355.75,0,575,1486.75,'Girls ','Under-12'),(2,'DIVESH','GAHLOT',414748,'1/1/2003','(HR)',425,235,58.75,339.75,0,475,1298.5,'Girls ','Under-12'),(3,'NISHANT','DABAS',414708,'2/12/2003','(DL)',350,465,116.25,237.75,0,570.75,1274.75,'Girls ','Under-12'),(4,'AJAY','MALIK',417007,'16-01-03','(HR)',470,245,61.25,249,0,0,780.25,'Girls ','Under-12'),(5,'KRISHAN','HOODA',417310,'10/3/2003','(HR)',265,280,70,235.75,0,62.5,633.25,'Girls ','Under-12'),(6,'UDIT','GOGOI',415344,'17-12-04','(AS)',280,300,75,246.25,0,2.75,604,'Girls ','Under-12'),(7,'SUSHANT','DABAS',414702,'14-01-03','(HR)',225,400,100,258.25,0,2.5,585.75,'Girls ','Under-12'),(8,'DHRUV','TANGRI',415289,'3/1/2003','(PB)',240,405,101.25,146.5,0,50,537.75,'Girls ','Under-12'),(9,'DENIM','YADAV',409243,'19-08-04','(MP)',225,245,61.25,231,0,0,517.25,'Girls ','Under-12'),(10,'NIKHIL NIRANJAN','THIRUMALE',414260,'31-05-03','(KA)',265,250,62.5,134.5,0,0,462,'Girls ','Under-12'),(11,'AMAN','DAHIYA',418850,'18-08-04','(HR)',210,200,50,146.75,0,0,406.75,'Girls ','Under-12'),(12,'SANJITH','DEVINENI',415548,'25-04-03','(KA)',216,280,70,74.75,0,0,360.75,'Girls ','Under-12'),(13,'RUDRA','KAPOOR',410666,'10/7/2003','(UP)',200,160,40,70,0,40.5,350.5,'Girls ','Under-12'),(14,'ABHISHEK','MOHAPATRA',418075,'16-12-03','(OD)',167,175,43.75,134.25,0,0,345,'Girls ','Under-12'),(14,'VISHAL','REDDY PAGADALA',413741,'7/11/2003','(KA)',175,195,48.75,121.25,0,0,345,'Girls ','Under-12'),(16,'KANISHK','PAL',414642,'17-12-03','(DL)',125,185,46.25,155.75,0,10,337,'Girls ','Under-12'),(17,'KARTIK','SAXENA',416211,'9/11/2003','(DL)',165,175,43.75,91.25,0,21.5,321.5,'Girls ','Under-12'),(18,'KRITANTA','SARMA',414899,'23-08-03','(AS)',130,210,52.5,100.75,0,37.5,320.75,'Girls ','Under-12'),(19,'SHASHIDHAR','KOTA',416105,'15-01-03','(TS)',130,195,48.75,96.75,0,25,300.5,'Girls ','Under-12'),(20,'PRANAV','S IKKURTHY',410729,'19-02-03','(AP)',166,110,27.5,98.75,0,0,292.25,'Girls ','Under-12'),(21,'GIRISH DADASAHEB','CHOUGULE',412134,'6/9/2003','(MH)',140,220,55,89.75,0,0,284.75,'Girls ','Under-12'),(22,'YASHRAJ','S DALVI',416316,'21-04-03','(MH)',173,230,57.5,53,0,0,283.5,'Girls ','Under-12'),(23,'CHIRAG','DUHAN',418841,'1/1/2004','(HR)',155,110,27.5,97,0,0,279.5,'Girls ','Under-12'),(24,'ARJUN','KUNDU',416346,'23-06-03','(GJ)',150,230,57.5,70.5,0,0,278,'Girls ','Under-12'),(25,'SHREEJIT','SEN',414451,'4/2/2003','(MH)',120,200,50,95.25,0,0,265.25,'Girls ','Under-12'),(26,'MOHAMMED KARIM','ALIM KHAN',413958,'8/2/2003','(MH)',158,165,41.25,65.75,0,0,265,'Girls ','Under-12'),(27,'DHANYA','SHAH',415921,'30-01-03','(GJ)',125,230,57.5,74.5,0,7.5,264.5,'Girls ','Under-12'),(28,'AMRUTJAY','MOHANTY',414058,'25-09-03','(OD)',126,125,31.25,83.5,0,20,260.75,'Girls ','Under-12'),(29,'HASITH','SRUJAN G',416159,'30-03-04','(AP)',115,190,47.5,86.5,0,0,249,'Girls ','Under-12'),(30,'SANMAY RAHUL','GANDHI',418555,'30-01-03','(MH)',126,185,46.25,71,0,0,243.25,'Girls ','Under-12'),(31,'VISHESH','JAINISH PATEL',414485,'22-04-04','(GJ)',120,175,43.75,52.75,0,18.25,234.75,'Girls ','Under-12'),(32,'PRANAY','CHOUDHARY',420155,'18-03-03','(RJ)',130,141,35.25,64.5,0,0,229.75,'Girls ','Under-12'),(33,'KARAN','SINGH',424484,'30-06-03','(HR)',77,87,21.75,127.5,0,0,226.25,'Girls ','Under-12'),(34,'RISHI','JALOTA',417189,'10/9/2003','(CH)',100,55,13.75,105.25,0,0,219,'Girls ','Under-12'),(35,'KRISHANG','RAGHUVANSHI',422132,'25-04-05','(HR)',110,130,32.5,72,0,0.75,215.25,'Girls ','Under-12'),(36,'ANIRUDH D','KRISHNA',417040,'24-04-03','(HR)',125,105,26.25,63.5,0,0,214.75,'Girls ','Under-12'),(37,'ADITYA','BALDA',417853,'17-08-03','(HR)',83,35,8.75,110.5,0,7.5,209.75,'Girls ','Under-12'),(38,'AYUSHMAAN','ARJERIA',417609,'8/5/2005','(MP)',126,155,38.75,43.75,0,0,208.5,'Girls ','Under-12'),(39,'LESTON','VAZ',413903,'26-11-03','(MH)',90,145,36.25,48,0,33.25,207.5,'Girls ','Under-12'),(40,'AMANDEEP','RATHEE',422827,'4/4/2003','(DL)',84,35,8.75,109.5,0,0,202.25,'Girls ','Under-12'),(40,'VISHAL','YADAV',416537,'27-05-03','(HR)',101,107,26.75,74.5,0,0,202.25,'Girls ','Under-12'),(42,'AMAAN','WASIM',416170,'6/2/2003','(WB)',135,115,28.75,36.5,0,0,200.25,'Girls ','Under-12'),(43,'RITIK','MANN',418661,'4/5/2003','(HR)',85,60,15,97.25,0,0,197.25,'Girls ','Under-12'),(44,'KUSH','ARJARIA',416381,'21-12-03','(MP)',115,135,33.75,40.75,0,0,189.5,'Girls ','Under-12'),(45,'AJAY','SINGH',418106,'15-04-04','(HR)',84,35,8.75,83.5,0,0,176.25,'Girls ','Under-12'),(46,'SIDDHARTH','MALIK',419950,'11/6/2003','(HR)',80,115,28.75,66,0,0,174.75,'Girls ','Under-12'),(46,'KARKAL S','VARDHAN',411680,'5/10/2003','(MH)',86,120,30,53.75,0,5,174.75,'Girls ','Under-12'),(48,'NIKHIL','MITTAL',419461,'27-10-03','(HR)',109,61,15.25,50,0,0,174.25,'Girls ','Under-12'),(49,'ARYAN ISHAQUE','QURESHI',419318,'27-12-03','(MH)',92,125,31.25,47.5,0,0,170.75,'Girls ','Under-12'),(50,'ARJUN N','GOHAD',416024,'19-07-04','(MH)',136,85,21.25,11,0,0,168.25,'Girls ','Under-12'),(51,'VANSH','YADAV',420253,'10/9/2003','(UP)',77,35,8.75,81.75,0,0,167.5,'Girls ','Under-12'),(52,'ANURAG','KEDIA',418761,'13-03-03','(WB)',120,125,31.25,25.75,10,0,167,'Girls ','Under-12'),(53,'HEERAK','S VORA',415142,'8/5/2003','(GJ)',94,75,18.75,52.75,0,0,165.5,'Girls ','Under-12'),(54,'SARABJOT','SINGH',416168,'12/6/2003','(PB)',74,40,10,75.5,0,0,159.5,'Girls ','Under-12'),(55,'HARSHA','PRADEEP KUMAR',417110,'8/11/2003','(TN)',85,124,31,43.25,0,0,159.25,'Girls ','Under-12'),(56,'DEEP','MUNIM',415220,'1/1/2004','(MP)',92,130,32.5,34.5,0,0,159,'Girls ','Under-12'),(57,'SRIRAM','K DAS',414087,'13-01-03','(KA)',71,90,22.5,65,0,0,158.5,'Girls ','Under-12'),(58,'JITIN KUMAR','CHETRY',422716,'22-02-03','(PB)',69,62,15.5,73.75,0,0,158.25,'Girls ','Under-12'),(59,'DEV UPENDRA','PATEL',419988,'22-06-03','(GJ)',57,66,16.5,50.5,0,31.5,155.5,'Girls ','Under-12'),(60,'SUMIR','SRIVASTAVA',416694,'21-03-03','(DL)',116,40,10,28.25,0,0,154.25,'Girls ','Under-12'),(61,'HITESH','YALAMANCHILI',416602,'4/6/2003','(AP)',98,20,5,48.75,0,1.5,153.25,'Girls ','Under-12'),(62,'KRISH SANJAY','WAGHANI',420868,'10/8/2004','(MH)',99,120,30,24,0,0,153,'Girls ','Under-12'),(63,'HRISHIKESH PARASHAR','SANGANDAHALLI',416536,'23-05-03','(DL)',71,60,15,66.75,0,0,152.75,'Girls ','Under-12'),(64,'FAIZ MOHD','NASYAM',413490,'21-07-03','(MH)',78,140,35,38.5,0,0,151.5,'Girls ','Under-12'),(65,'ARVIND','PEMMARAJU',419660,'2/6/2003','(AP)',90,45,11.25,49,0,0,150.25,'Girls ','Under-12'),(65,'JASMEET','DUHAN',418781,'8/2/2005','(HR)',83,30,7.5,57.5,0,2.25,150.25,'Girls ','Under-12'),(67,'PRANAV','CHOPRA',414438,'24-03-03','(CH)',63,55,13.75,73,0,0,149.75,'Girls ','Under-12');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `result`
--

DROP TABLE IF EXISTS `result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `result` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `round_no` varchar(255) DEFAULT NULL,
  `winner_name` varchar(255) DEFAULT NULL,
  `reg_no` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result`
--

LOCK TABLES `result` WRITE;
/*!40000 ALTER TABLE `result` DISABLE KEYS */;
INSERT INTO `result` VALUES (30,'Round-1','DIVESH GAHLOT (HR)','414748','Girls ','Under-12'),(31,'Round-1','DENIM YADAV (MP)','409243','Girls ','Under-12'),(34,'Round-2','AMAN DAHIYA (HR)','418850','Girls ','Under-12'),(35,'Round-3','NISHANT DABAS (DL)','414708','Girls ','Under-12');
/*!40000 ALTER TABLE `result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `signlist`
--

DROP TABLE IF EXISTS `signlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `signlist` (
  `no` int(255) NOT NULL AUTO_INCREMENT,
  `reg_no` int(255) DEFAULT '0',
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `contactno` varchar(45) DEFAULT '0',
  `dob` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `rank` int(255) DEFAULT '0',
  `point` float DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL,
  UNIQUE KEY `no_UNIQUE` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `signlist`
--

LOCK TABLES `signlist` WRITE;
/*!40000 ALTER TABLE `signlist` DISABLE KEYS */;
INSERT INTO `signlist` VALUES (1,414708,'NISHANT','DABAS','','2/12/2003','(DL)',3,1274.75,'Girls ','Under-12'),(2,414748,'DIVESH','GAHLOT','','1/1/2003','(HR)',2,1298.5,'Girls ','Under-12'),(3,409243,'DENIM','YADAV','','19-08-04','(MP)',9,517.25,'Girls ','Under-12'),(4,415289,'DHRUV','TANGRI','','3/1/2003','(PB)',8,537.75,'Girls ','Under-12'),(5,414702,'SUSHANT','DABAS','','14-01-03','(HR)',7,585.75,'Girls ','Under-12'),(6,418850,'AMAN','DAHIYA','','18-08-04','(HR)',11,406.75,'Girls ','Under-12'),(7,414260,'NIKHIL NIRANJAN','THIRUMALE','','31-05-03','(KA)',10,462,'Girls ','Under-12'),(8,415548,'SANJITH','DEVINENI','','25-04-03','(KA)',12,360.75,'Girls ','Under-12');
/*!40000 ALTER TABLE `signlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament`
--

DROP TABLE IF EXISTS `tournament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tournament` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `age` varchar(255) NOT NULL,
  `startdate` varchar(255) DEFAULT NULL,
  `enddate` varchar(255) DEFAULT NULL,
  `drawno` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament`
--

LOCK TABLES `tournament` WRITE;
/*!40000 ALTER TABLE `tournament` DISABLE KEYS */;
INSERT INTO `tournament` VALUES (4,'Test','Girls','Under-12','2017-12-31','2019-12-31','8');
/*!40000 ALTER TABLE `tournament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'svatsal.1994@gmail.com','123');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-21 10:29:06
