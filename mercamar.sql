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
-- Temporary table structure for view `almacen_bodega`
--

DROP TABLE IF EXISTS `almacen_bodega`;
/*!50001 DROP VIEW IF EXISTS `almacen_bodega`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `almacen_bodega` (
  `TOTAL_TA` tinyint NOT NULL,
  `TOTAL_VA` tinyint NOT NULL,
  `id` tinyint NOT NULL,
  `precioVenta` tinyint NOT NULL,
  `nombre` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `bodega_camioneta`
--

DROP TABLE IF EXISTS `bodega_camioneta`;
/*!50001 DROP VIEW IF EXISTS `bodega_camioneta`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `bodega_camioneta` (
  `TOTAL_T` tinyint NOT NULL,
  `TOTAL_VCA` tinyint NOT NULL,
  `NOMBRE` tinyint NOT NULL,
  `id` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `bodega_existencia`
--

DROP TABLE IF EXISTS `bodega_existencia`;
/*!50001 DROP VIEW IF EXISTS `bodega_existencia`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `bodega_existencia` (
  `EXISTENTE` tinyint NOT NULL,
  `ENTRADA_C` tinyint NOT NULL,
  `TOTAL_T` tinyint NOT NULL,
  `TOTAL_DV` tinyint NOT NULL,
  `TOTAL_TA` tinyint NOT NULL,
  `TOTAL_VB` tinyint NOT NULL,
  `nombre` tinyint NOT NULL,
  `precioVenta` tinyint NOT NULL,
  `id` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cedula` int(12) DEFAULT NULL,
  `nombre` varchar(25) DEFAULT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `direccion` varchar(30) DEFAULT NULL,
  `barrio` varchar(25) DEFAULT NULL,
  `ciudad` varchar(25) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `entrada_cami`
--

DROP TABLE IF EXISTS `entrada_cami`;
/*!50001 DROP VIEW IF EXISTS `entrada_cami`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `entrada_cami` (
  `ENTRADA_C` tinyint NOT NULL,
  `movimiento` tinyint NOT NULL,
  `producto_ec` tinyint NOT NULL,
  `fecha_movimiento_ec` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `entrada_comp`
--

DROP TABLE IF EXISTS `entrada_comp`;
/*!50001 DROP VIEW IF EXISTS `entrada_comp`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `entrada_comp` (
  `EXISTENTE` tinyint NOT NULL,
  `movimiento` tinyint NOT NULL,
  `producto` tinyint NOT NULL,
  `fecha_movimiento` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `entrada_dv`
--

DROP TABLE IF EXISTS `entrada_dv`;
/*!50001 DROP VIEW IF EXISTS `entrada_dv`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `entrada_dv` (
  `TOTAL_DV` tinyint NOT NULL,
  `movimiento` tinyint NOT NULL,
  `producto_v` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

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
  `proveedor` int(11) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pagos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `saldo` int(11) NOT NULL,
  `idVenta` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  `cuidad` varchar(40) DEFAULT NULL,
  `direccion` varchar(40) DEFAULT NULL,
  `telefono_1` int(11) DEFAULT NULL,
  `telefono_2` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1065635833 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles_user`
--

DROP TABLE IF EXISTS `roles_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol` int(11) DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rol` (`rol`),
  KEY `usuario` (`usuario`),
  CONSTRAINT `roles_user_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`),
  CONSTRAINT `roles_user_ibfk_2` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `traslado_almacen`
--

DROP TABLE IF EXISTS `traslado_almacen`;
/*!50001 DROP VIEW IF EXISTS `traslado_almacen`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `traslado_almacen` (
  `TOTAL_TA` tinyint NOT NULL,
  `movimiento` tinyint NOT NULL,
  `producto_ta` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `traslado_c`
--

DROP TABLE IF EXISTS `traslado_c`;
/*!50001 DROP VIEW IF EXISTS `traslado_c`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `traslado_c` (
  `TOTAL_T` tinyint NOT NULL,
  `movimiento` tinyint NOT NULL,
  `producto_t` tinyint NOT NULL,
  `fecha_movimiento_t` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(15) DEFAULT NULL,
  `user` varchar(15) DEFAULT NULL,
  `pass` varchar(12) DEFAULT NULL,
  `estado_user` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `venta_almacen`
--

DROP TABLE IF EXISTS `venta_almacen`;
/*!50001 DROP VIEW IF EXISTS `venta_almacen`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `venta_almacen` (
  `TOTAL_VA` tinyint NOT NULL,
  `id_movimiento` tinyint NOT NULL,
  `idproducto` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `venta_bodega`
--

DROP TABLE IF EXISTS `venta_bodega`;
/*!50001 DROP VIEW IF EXISTS `venta_bodega`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `venta_bodega` (
  `TOTAL_VB` tinyint NOT NULL,
  `id_movimiento` tinyint NOT NULL,
  `idproducto` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `venta_camioneta`
--

DROP TABLE IF EXISTS `venta_camioneta`;
/*!50001 DROP VIEW IF EXISTS `venta_camioneta`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `venta_camioneta` (
  `TOTAL_VCA` tinyint NOT NULL,
  `id_movimientovc` tinyint NOT NULL,
  `idproductovc` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `formaPago` varchar(20) NOT NULL,
  `tiempoPago` int(11) NOT NULL,
  `descuento` int(11) NOT NULL,
  `descuentoValor` int(11) NOT NULL,
  `abono` int(11) NOT NULL,
  `subtotal` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `numeroCuotas` int(11) NOT NULL,
  `valorCuotas` int(11) NOT NULL,
  `saldo` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ventasproducto`
--

DROP TABLE IF EXISTS `ventasproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ventasproducto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idVenta` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Final view structure for view `almacen_bodega`
--

/*!50001 DROP TABLE IF EXISTS `almacen_bodega`*/;
/*!50001 DROP VIEW IF EXISTS `almacen_bodega`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `almacen_bodega` AS select `traslado_almacen`.`TOTAL_TA` AS `TOTAL_TA`,`venta_almacen`.`TOTAL_VA` AS `TOTAL_VA`,`productos`.`id` AS `id`,`productos`.`precioVenta` AS `precioVenta`,`productos`.`nombre` AS `nombre` from (`productos` left join (`traslado_almacen` left join `venta_almacen` on((`traslado_almacen`.`producto_ta` = `venta_almacen`.`idproducto`))) on((`productos`.`id` = `traslado_almacen`.`producto_ta`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `bodega_camioneta`
--

/*!50001 DROP TABLE IF EXISTS `bodega_camioneta`*/;
/*!50001 DROP VIEW IF EXISTS `bodega_camioneta`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `bodega_camioneta` AS select `traslado_c`.`TOTAL_T` AS `TOTAL_T`,`venta_camioneta`.`TOTAL_VCA` AS `TOTAL_VCA`,`productos`.`nombre` AS `NOMBRE`,`productos`.`id` AS `id` from (`productos` left join (`traslado_c` left join `venta_camioneta` on((`traslado_c`.`producto_t` = `venta_camioneta`.`idproductovc`))) on((`productos`.`id` = `traslado_c`.`producto_t`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `bodega_existencia`
--

/*!50001 DROP TABLE IF EXISTS `bodega_existencia`*/;
/*!50001 DROP VIEW IF EXISTS `bodega_existencia`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `bodega_existencia` AS select `entrada_comp`.`EXISTENTE` AS `EXISTENTE`,`entrada_cami`.`ENTRADA_C` AS `ENTRADA_C`,`traslado_c`.`TOTAL_T` AS `TOTAL_T`,`entrada_dv`.`TOTAL_DV` AS `TOTAL_DV`,`traslado_almacen`.`TOTAL_TA` AS `TOTAL_TA`,`venta_bodega`.`TOTAL_VB` AS `TOTAL_VB`,`productos`.`nombre` AS `nombre`,`productos`.`precioVenta` AS `precioVenta`,`productos`.`id` AS `id` from (`productos` left join (((((`entrada_comp` left join `entrada_cami` on((`entrada_cami`.`producto_ec` = `entrada_comp`.`producto`))) left join `traslado_c` on((`traslado_c`.`producto_t` = `entrada_comp`.`producto`))) left join `entrada_dv` on((`entrada_dv`.`producto_v` = `entrada_comp`.`producto`))) left join `venta_bodega` on((`venta_bodega`.`idproducto` = `entrada_comp`.`producto`))) left join `traslado_almacen` on((`traslado_almacen`.`producto_ta` = `entrada_comp`.`producto`))) on((`productos`.`id` = `entrada_comp`.`producto`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `entrada_cami`
--

/*!50001 DROP TABLE IF EXISTS `entrada_cami`*/;
/*!50001 DROP VIEW IF EXISTS `entrada_cami`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `entrada_cami` AS select sum(`movimientoe`.`cantidad`) AS `ENTRADA_C`,`movimientoe`.`movimiento` AS `movimiento`,`movimientoe`.`producto` AS `producto_ec`,`movimiento`.`fecha_movimiento` AS `fecha_movimiento_ec` from (`movimiento` left join `movimientoe` on((`movimiento`.`id_movimiento` = `movimientoe`.`movimiento`))) where (`movimiento`.`tipo_movimiento` = 'ENTRADA (CAMIONETA)') group by `producto_ec` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `entrada_comp`
--

/*!50001 DROP TABLE IF EXISTS `entrada_comp`*/;
/*!50001 DROP VIEW IF EXISTS `entrada_comp`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `entrada_comp` AS select sum(`movimientoe`.`cantidad`) AS `EXISTENTE`,`movimientoe`.`movimiento` AS `movimiento`,`movimientoe`.`producto` AS `producto`,`movimiento`.`fecha_movimiento` AS `fecha_movimiento` from (`movimiento` left join `movimientoe` on((`movimiento`.`id_movimiento` = `movimientoe`.`movimiento`))) where (`movimiento`.`tipo_movimiento` = 'ENTRADA (COMPRA)') group by `movimientoe`.`producto` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `entrada_dv`
--

/*!50001 DROP TABLE IF EXISTS `entrada_dv`*/;
/*!50001 DROP VIEW IF EXISTS `entrada_dv`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `entrada_dv` AS select sum(`movimientoe`.`cantidad`) AS `TOTAL_DV`,`movimientoe`.`movimiento` AS `movimiento`,`movimientoe`.`producto` AS `producto_v` from (`movimiento` left join `movimientoe` on((`movimiento`.`id_movimiento` = `movimientoe`.`movimiento`))) where (`movimiento`.`tipo_movimiento` = 'ENTRADA (DEVOLUCION)') group by `producto_v` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `traslado_almacen`
--

/*!50001 DROP TABLE IF EXISTS `traslado_almacen`*/;
/*!50001 DROP VIEW IF EXISTS `traslado_almacen`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `traslado_almacen` AS select sum(`movimientot`.`cantidad_t`) AS `TOTAL_TA`,`movimientot`.`movimiento` AS `movimiento`,`movimientot`.`producto_t` AS `producto_ta` from (`movimiento` left join `movimientot` on((`movimiento`.`id_movimiento` = `movimientot`.`movimiento`))) where (`movimiento`.`tipo_movimiento` = 'TRASLADO  (ALMACEN)') group by `producto_ta` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `traslado_c`
--

/*!50001 DROP TABLE IF EXISTS `traslado_c`*/;
/*!50001 DROP VIEW IF EXISTS `traslado_c`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `traslado_c` AS select sum(`movimientot`.`cantidad_t`) AS `TOTAL_T`,`movimientot`.`movimiento` AS `movimiento`,`movimientot`.`producto_t` AS `producto_t`,`movimiento`.`fecha_movimiento` AS `fecha_movimiento_t` from (`movimiento` left join `movimientot` on((`movimiento`.`id_movimiento` = `movimientot`.`movimiento`))) where (`movimiento`.`tipo_movimiento` = 'TRASLADO  (CAMIONETA)') group by `movimientot`.`producto_t` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `venta_almacen`
--

/*!50001 DROP TABLE IF EXISTS `venta_almacen`*/;
/*!50001 DROP VIEW IF EXISTS `venta_almacen`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `venta_almacen` AS select sum(`ventasproducto`.`cantidad`) AS `TOTAL_VA`,`movimiento`.`id_movimiento` AS `id_movimiento`,`ventasproducto`.`idProducto` AS `idproducto` from (`movimiento` left join `ventasproducto` on((`ventasproducto`.`idVenta` = `movimiento`.`id_movimiento`))) where (`movimiento`.`tipo_movimiento` = 'VA') group by `ventasproducto`.`idProducto` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `venta_bodega`
--

/*!50001 DROP TABLE IF EXISTS `venta_bodega`*/;
/*!50001 DROP VIEW IF EXISTS `venta_bodega`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `venta_bodega` AS select sum(`ventasproducto`.`cantidad`) AS `TOTAL_VB`,`movimiento`.`id_movimiento` AS `id_movimiento`,`ventasproducto`.`idProducto` AS `idproducto` from (`movimiento` left join `ventasproducto` on((`ventasproducto`.`idVenta` = `movimiento`.`id_movimiento`))) where (`movimiento`.`tipo_movimiento` = 'VB') group by `ventasproducto`.`idProducto` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `venta_camioneta`
--

/*!50001 DROP TABLE IF EXISTS `venta_camioneta`*/;
/*!50001 DROP VIEW IF EXISTS `venta_camioneta`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `venta_camioneta` AS select sum(`ventasproducto`.`cantidad`) AS `TOTAL_VCA`,`movimiento`.`id_movimiento` AS `id_movimientovc`,`ventasproducto`.`idProducto` AS `idproductovc` from (`movimiento` left join `ventasproducto` on((`ventasproducto`.`idVenta` = `movimiento`.`id_movimiento`))) where (`movimiento`.`tipo_movimiento` = 'VC') group by `ventasproducto`.`idProducto` */;
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

-- Dump completed on 2016-03-24 12:50:43
