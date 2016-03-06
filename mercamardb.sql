CREATE DATABASE  IF NOT EXISTS `mercamar` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mercamar`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: localhost    Database: mercamar
-- ------------------------------------------------------
-- Server version	5.6.20

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
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `cedula` int(12) DEFAULT NULL,
  `nombre` varchar(25) DEFAULT NULL,
  `p_apellido` varchar(20) DEFAULT NULL,
  `s_apellido` varchar(20) DEFAULT NULL,
  `direccion` varchar(30) DEFAULT NULL,
  `barrio` varchar(25) DEFAULT NULL,
  `cuidad` varchar(25) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `movimiento`
--

DROP TABLE IF EXISTS `movimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movimiento` (
  `id_movimiento` varchar(30) NOT NULL,
  `fecha_movimiento` date DEFAULT NULL,
  `tipo_movimiento` varchar(30) DEFAULT NULL,
  `lugar` varchar(30) DEFAULT NULL,
  `estado` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`id_movimiento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `movimientoe`
--

DROP TABLE IF EXISTS `movimientoe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movimientoe` (
  `id_movimiento_e` int(11) NOT NULL AUTO_INCREMENT,
  `movimiento` varchar(30) DEFAULT NULL,
  `producto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `estado_e` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`id_movimiento_e`),
  KEY `producto` (`producto`),
  KEY `movimientoe_ibfk_2` (`movimiento`),
  CONSTRAINT `movimientoe_ibfk_1` FOREIGN KEY (`producto`) REFERENCES `productos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `movimientoe_ibfk_2` FOREIGN KEY (`movimiento`) REFERENCES `movimiento` (`id_movimiento`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `movimientot`
--

DROP TABLE IF EXISTS `movimientot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movimientot` (
  `id_movimiento_t` int(11) NOT NULL AUTO_INCREMENT,
  `movimiento` varchar(30) DEFAULT NULL,
  `producto_t` int(11) DEFAULT NULL,
  `cantidad_t` int(11) DEFAULT NULL,
  `estado_t` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`id_movimiento_t`),
  KEY `producto_t` (`producto_t`),
  KEY `movimientot_ibfk_2` (`movimiento`),
  CONSTRAINT `movimientot_ibfk_1` FOREIGN KEY (`producto_t`) REFERENCES `productos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `movimientot_ibfk_2` FOREIGN KEY (`movimiento`) REFERENCES `movimiento` (`id_movimiento`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `proveedor` int(11) NOT NULL,
  `valorUnitario` int(11) NOT NULL,
  `precioVenta` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `cuidad` varchar(40) DEFAULT NULL,
  `direccion` varchar(40) DEFAULT NULL,
  `telefono_1` int(11) DEFAULT NULL,
  `telefono_2` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-06 11:11:31
