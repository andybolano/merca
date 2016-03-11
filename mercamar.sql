-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-03-2016 a las 22:49:02
-- Versión del servidor: 5.6.24
-- Versión de PHP: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `mercamar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int(11) NOT NULL,
  `cedula` int(12) DEFAULT NULL,
  `nombre` varchar(25) DEFAULT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `direccion` varchar(30) DEFAULT NULL,
  `barrio` varchar(25) DEFAULT NULL,
  `ciudad` varchar(25) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `cedula`, `nombre`, `apellidos`, `direccion`, `barrio`, `ciudad`, `telefono`) VALUES
(1, 1065, 'tatiana', 'gomez', 'calle 15', 'barrio', 'maicao', '353454543'),
(2, 5, 'dfsdfsdf', 'jouiouoi', 'iouoiuo', 'qweqwe', 'sfdsdfds', '87987'),
(3, 54645654, 'sfsrewrwe', 'ewrewrewr', 'dsfsdfsd', 'tgretretre', 'fsdfdsfsdfsd', '543534534543'),
(4, 456456, 'rwer', 'werwer', 'rwerewrew', 'werwerewr', 'rwerwerew', '23423423432'),
(5, 54645654, 'fghfh', 'tretretre', 'dfgdfgfd', 'dfgdfg', 'dgdfgfd', '543543534'),
(6, 8, 'rtyrty', 'rtytry', 'rtyrtyrt', 'rtyrtytr', 'rtyrtytr', '6456456546'),
(7, 6565756, 'werwerwe', 'rtytry', 'rtyrtyrt', 'rtyrtytr', 'rtyrtytr', '6456456546');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimiento`
--

CREATE TABLE IF NOT EXISTS `movimiento` (
  `id_movimiento` varchar(30) NOT NULL,
  `fecha_movimiento` date DEFAULT NULL,
  `tipo_movimiento` varchar(30) DEFAULT NULL,
  `lugar` varchar(30) DEFAULT NULL,
  `estado` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `movimiento`
--

INSERT INTO `movimiento` (`id_movimiento`, `fecha_movimiento`, `tipo_movimiento`, `lugar`, `estado`) VALUES
('7', '2016-03-11', 'VENTA', 'VENTA', 'C');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientoe`
--

CREATE TABLE IF NOT EXISTS `movimientoe` (
  `id_movimiento_e` int(11) NOT NULL,
  `movimiento` varchar(30) DEFAULT NULL,
  `producto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `estado_e` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientot`
--

CREATE TABLE IF NOT EXISTS `movimientot` (
  `id_movimiento_t` int(11) NOT NULL,
  `movimiento` varchar(30) DEFAULT NULL,
  `producto_t` int(11) DEFAULT NULL,
  `cantidad_t` int(11) DEFAULT NULL,
  `estado_t` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE IF NOT EXISTS `pagos` (
  `id` int(11) NOT NULL,
  `valor` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `saldo` int(11) NOT NULL,
  `idVenta` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id`, `valor`, `fecha`, `saldo`, `idVenta`) VALUES
(2, 55000, '2016-03-11', 400000, 2),
(3, 100000, '2016-03-11', 300000, 2),
(4, 100000, '2016-03-11', 200000, 2),
(5, 50000, '2016-03-11', 150000, 2),
(6, 0, '2016-03-18', 100000, 2),
(7, 0, '2016-03-11', 100000, 2),
(8, 0, '2016-03-11', 0, 2),
(9, 23432, '0000-00-00', -23432, 2),
(10, 324234, '0000-00-00', -347666, 2),
(11, 34324, '0000-00-00', -381990, 2),
(12, 33432, '0000-00-00', -415422, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE IF NOT EXISTS `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `proveedor` int(11) NOT NULL,
  `valorUnitario` int(11) NOT NULL,
  `precioVenta` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `proveedor`, `valorUnitario`, `precioVenta`, `descripcion`) VALUES
(7, 'cama', 1, 100000, 200000, 'cama bonita'),
(8, 'mesa', 2, 500000, 600000, 'bonita mesa'),
(9, 'Nevera', 1, 10000000, 1200000, 'Nevera Bonita');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE IF NOT EXISTS `proveedores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `cuidad` varchar(40) DEFAULT NULL,
  `direccion` varchar(40) DEFAULT NULL,
  `telefono_1` int(11) DEFAULT NULL,
  `telefono_2` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id`, `nombre`, `cuidad`, `direccion`, `telefono_1`, `telefono_2`) VALUES
(1, 'Proveedor 1', 'valledupar', 'calle 12', 310, 311),
(2, 'proveedor 2', 'werewr', 'ewrwer', 23423, 34234);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE IF NOT EXISTS `ventas` (
  `id` int(11) NOT NULL,
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
  `saldo` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `cliente`, `fecha`, `formaPago`, `tiempoPago`, `descuento`, `descuentoValor`, `abono`, `subtotal`, `total`, `numeroCuotas`, `valorCuotas`, `saldo`) VALUES
(2, 1, '2016-03-09', 'CONTADO', 3, 35, 245000, 100000, 700000, 455000, 3, 151667, -415422),
(3, 1, '2016-03-09', 'CONTADO', 3, 35, 455000, 100000, 1300000, 845000, 3, 281667, 845000),
(4, 1, '2016-03-09', 'CREDI-CONTADO', 3, 35, 245000, 100000, 700000, 455000, 3, 151667, 455000),
(5, 1, '2016-03-11', 'CONTADO', 1, 0, 0, 200000, 0, 0, 1, 0, 0),
(6, 0, '0000-00-00', '', 0, 0, 0, 0, 0, 0, 0, 0, 400000),
(7, 1, '2016-03-11', 'CONTADO', 1, 0, 0, 2000000, 0, 0, 1, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventasproducto`
--

CREATE TABLE IF NOT EXISTS `ventasproducto` (
  `id` int(11) NOT NULL,
  `idVenta` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ventasproducto`
--

INSERT INTO `ventasproducto` (`id`, `idVenta`, `idProducto`, `cantidad`, `precio`, `total`) VALUES
(1, 2, 7, 1, 200000, 200000),
(2, 2, 8, 1, 600000, 600000),
(3, 3, 7, 1, 200000, 800000),
(4, 3, 8, 1, 600000, 600000),
(5, 4, 7, 1, 200000, 200000),
(6, 4, 8, 1, 600000, 600000),
(7, 5, 7, 1, 200000, 200000),
(8, 7, 7, 1, 200000, 200000),
(9, 7, 8, 1, 600000, 1800000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD PRIMARY KEY (`id_movimiento`);

--
-- Indices de la tabla `movimientoe`
--
ALTER TABLE `movimientoe`
  ADD PRIMARY KEY (`id_movimiento_e`), ADD KEY `producto` (`producto`), ADD KEY `movimientoe_ibfk_2` (`movimiento`);

--
-- Indices de la tabla `movimientot`
--
ALTER TABLE `movimientot`
  ADD PRIMARY KEY (`id_movimiento_t`), ADD KEY `producto_t` (`producto_t`), ADD KEY `movimientot_ibfk_2` (`movimiento`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventasproducto`
--
ALTER TABLE `ventasproducto`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `movimientoe`
--
ALTER TABLE `movimientoe`
  MODIFY `id_movimiento_e` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `movimientot`
--
ALTER TABLE `movimientot`
  MODIFY `id_movimiento_t` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `ventasproducto`
--
ALTER TABLE `ventasproducto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `movimientoe`
--
ALTER TABLE `movimientoe`
ADD CONSTRAINT `movimientoe_ibfk_1` FOREIGN KEY (`producto`) REFERENCES `productos` (`id`) ON UPDATE CASCADE,
ADD CONSTRAINT `movimientoe_ibfk_2` FOREIGN KEY (`movimiento`) REFERENCES `movimiento` (`id_movimiento`) ON DELETE CASCADE;

--
-- Filtros para la tabla `movimientot`
--
ALTER TABLE `movimientot`
ADD CONSTRAINT `movimientot_ibfk_1` FOREIGN KEY (`producto_t`) REFERENCES `productos` (`id`) ON UPDATE CASCADE,
ADD CONSTRAINT `movimientot_ibfk_2` FOREIGN KEY (`movimiento`) REFERENCES `movimiento` (`id_movimiento`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
