-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2019 at 01:01 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `safeharbor`
--

-- --------------------------------------------------------

--
-- Table structure for table `areas`
--

CREATE TABLE `areas` (
  `id` smallint(6) NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `areas`
--

INSERT INTO `areas` (`id`, `name`) VALUES
(5, 'some block');

-- --------------------------------------------------------

--
-- Table structure for table `crimecodes`
--

CREATE TABLE `crimecodes` (
  `code` bigint(6) NOT NULL,
  `type` enum('property','violent') NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `crimecodes`
--

INSERT INTO `crimecodes` (`code`, `type`, `description`) VALUES
(624, 'violent', 'Battery - Simple Assault');

-- --------------------------------------------------------

--
-- Table structure for table `crimes`
--

CREATE TABLE `crimes` (
  `idDrNumber` bigint(6) NOT NULL,
  `crimeCode` bigint(20) NOT NULL,
  `areaId` bigint(20) NOT NULL,
  `dateOccurred` date NOT NULL,
  `timeOccurred` time NOT NULL,
  `locationLat` double NOT NULL,
  `locationLon` double NOT NULL,
  `dateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `crimes`
--

INSERT INTO `crimes` (`idDrNumber`, `crimeCode`, `areaId`, `dateOccurred`, `timeOccurred`, `locationLat`, `locationLon`, `dateCreated`) VALUES
(190506343, 624, 5, '2019-02-06', '07:09:17', -118.29, 33.7941, '2019-02-27 13:03:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crimecodes`
--
ALTER TABLE `crimecodes`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `crimes`
--
ALTER TABLE `crimes`
  ADD PRIMARY KEY (`idDrNumber`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
