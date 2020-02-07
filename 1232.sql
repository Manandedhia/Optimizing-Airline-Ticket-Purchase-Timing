-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2018 at 01:42 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `1232`
--

-- --------------------------------------------------------

--
-- Table structure for table `flightdataset`
--

CREATE TABLE `flightdataset` (
  `id` int(11) NOT NULL,
  `departureDate` varchar(100) NOT NULL,
  `stops` int(10) NOT NULL,
  `ticket_price` varchar(100) NOT NULL,
  `departure` varchar(100) NOT NULL,
  `arrival` varchar(100) NOT NULL,
  `flight_duration` varchar(100) NOT NULL,
  `airline` varchar(100) NOT NULL,
  `plane` varchar(100) NOT NULL,
  `departure_time` varchar(100) NOT NULL,
  `arrival_time` varchar(100) NOT NULL,
  `plane_code` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `flightdetails`
--

CREATE TABLE `flightdetails` (
  `id` int(11) NOT NULL,
  `departureDate` varchar(100) NOT NULL,
  `stops` int(10) NOT NULL,
  `ticket_price` varchar(100) NOT NULL,
  `departure` varchar(100) NOT NULL,
  `arrival` varchar(100) NOT NULL,
  `flight_duration` varchar(100) NOT NULL,
  `airline` varchar(100) NOT NULL,
  `plane` varchar(100) NOT NULL,
  `departure_time` varchar(100) NOT NULL,
  `arrival_time` varchar(100) NOT NULL,
  `plane_code` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flightdataset`
--
ALTER TABLE `flightdataset`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `flightdetails`
--
ALTER TABLE `flightdetails`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `flightdataset`
--
ALTER TABLE `flightdataset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `flightdetails`
--
ALTER TABLE `flightdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
