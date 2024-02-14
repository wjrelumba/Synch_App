-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2024 at 04:19 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `synchdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `access_types`
--

CREATE TABLE `access_types` (
  `access_level` int(2) NOT NULL,
  `access_desc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `access_types`
--

INSERT INTO `access_types` (`access_level`, `access_desc`) VALUES
(3, 'Owner'),
(2, 'Administrator'),
(1, 'Member');

-- --------------------------------------------------------

--
-- Table structure for table `clients_users`
--

CREATE TABLE `clients_users` (
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL,
  `organization` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients_users`
--

INSERT INTO `clients_users` (`name`, `username`, `id`, `organization`) VALUES
('Monique Enciso', 'Polariaris', 'ddW2XaQRIga10pwcH1S+usRDerCLhbLoFiGsMzM3AUlpgGTHVA', 'OLFU'),
('William James', 'Simonde44', 'VRc/yKxH/4sFW2rkwQ2MUScUg3jLS1W+TeAchZyejZx8XNZFAs', 'PUP'),
('Joseph Joestar', 'jojostar', 'zAyk8U+2lJY9eOvi7/JQDn6ih6HI2USyn69vHj0OHG314DGa2Q', 'Speedwagon'),
('Gojo Satoru', 'GS', 'zHv9J3JkNizZnQNFKZyKhu76k12L/z8qyHyuVW1tvfVlVnOa/p', 'JJK'),
('Yuji Itadori', 'YI', 'noINA7/4dvh5Xxo5gfJTrb0EaHxuvP4EtJ+5HMHRJYXrjplXQ/', 'Jujutsu High'),
('Megumi Fushiguro', 'MF', '9bfPmhqnN25087CVw2qgm6IsLa4W/PGoRVD0tnGOYyMlVPkxsb', 'Jujutsu High'),
('Johnny C. Isla', 'Cielow', 'lRCCdFTtwIr4IN7Iclaiw91SLYWs47Ho3DKE0wHMaIbUzEKYsN', 'Wattpad');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `send_to` varchar(255) NOT NULL,
  `sent_from` varchar(255) NOT NULL,
  `request_type` int(1) NOT NULL,
  `status` int(1) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `team_id` varchar(255) NOT NULL,
  `req_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `request_details`
--

CREATE TABLE `request_details` (
  `req_id` varchar(255) NOT NULL,
  `req_info` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `req_types`
--

CREATE TABLE `req_types` (
  `request_type` int(255) NOT NULL,
  `detail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `req_types`
--

INSERT INTO `req_types` (`request_type`, `detail`) VALUES
(1, 'team_invite');

-- --------------------------------------------------------

--
-- Table structure for table `secret_creds`
--

CREATE TABLE `secret_creds` (
  `user_id` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `secret_creds`
--

INSERT INTO `secret_creds` (`user_id`, `pass`) VALUES
('Polariaris', '$2b$05$o3qzbD2GFI5e7tZ1DHAGw.JBGADjxQ4Ww8GZ32qsg2sVIWW71Fqze'),
('Simonde44', '$2b$05$2IHZgK8Q3170hfPGB9rtZODFUpfvwTwV4HLWW0tXscqScP18oPfu.'),
('jojo2star', '$2b$05$fiAa6..9ufpOH43SiUf4Leeuu/uiaEub6XviQFxLcT5q7zDVche6i'),
('jojo2star', '$2b$05$SySG0D9XuVAcz.B7Gb5Nn.Oebw0YLm3.rxuJ4bQyZU5nWGt1wEoP.'),
('jojo2star', '$2b$05$zDew9nW0aYyrc19dHwd84u7OP1/jn2lfnlMmDzBmHLmH9/rTuLvuq'),
('jojo2star', '$2b$05$bIr0fwuDPgeuS0IEIESF6O6TmILvlAiMcY0so7i.CpS.Kl6e2xbN6'),
('jojostar', '$2b$05$fuylS4grqkfUmcNvOo8Vpe/6/lbpkSLaDps708ok1zKfKqD6Lfbqq'),
('GS', '$2b$05$cRyBiSlVUtV6lr19WNfC9euAwnmSvlHhXO9tliutnPOfd1d5nOWLO'),
('YI', '$2b$05$CXcMrOTHmtUBm1Per6NfyOwK1oPbFH6b971ebID4nKQMUXqqOIS9.'),
('MF', '$2b$05$zkZrmpcK/GAyWxyE6bGwuunuwi0r.w4xpMw2kxZfPVOfwzb9TXAz.'),
('Cielow', '$2b$05$nJwpKjr75HKt9iphpGrNyuVxQ8.r6HBRaGMAZx6yjuR4IYhz03vmS');

-- --------------------------------------------------------

--
-- Table structure for table `task_members_list`
--

CREATE TABLE `task_members_list` (
  `task_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task_members_list`
--

INSERT INTO `task_members_list` (`task_id`, `user_id`) VALUES
('ScripWrite', 'Polariaris'),
('VidEditors', 'Simonde44'),
('VidEditors', 'Polariaris'),
('VidEditors', 'jojostar'),
('dnxmd4fg9n/Q4SxSDd', 'Polariaris'),
('dnxmd4fg9n/Q4SxSDd', 'Simonde44'),
('F8GuI4uSXXRgrIql5+', 'jojostar'),
('sIEemIzBDFcAsybQZ2', 'Polariaris'),
('sIEemIzBDFcAsybQZ2', 'Simonde44'),
('VidEditors', 'GS'),
('VidEditors', 'YI'),
('ictJqPlZREBs0AVTZw', 'Polariaris'),
('ictJqPlZREBs0AVTZw', 'Simonde44'),
('ScripWrite', 'Simonde44');

-- --------------------------------------------------------

--
-- Table structure for table `task_names_group`
--

CREATE TABLE `task_names_group` (
  `task_name` varchar(255) NOT NULL,
  `task_id` varchar(255) NOT NULL,
  `team_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task_names_group`
--

INSERT INTO `task_names_group` (`task_name`, `task_id`, `team_id`) VALUES
('Video Editor', 'VidEditors', 'WD_2024'),
('Script Writer', 'ScripWrite', 'WD_2024'),
('Front End', 'dnxmd4fg9n/Q4SxSDd', 'WD_2024'),
('Back End Programmer', 'F8GuI4uSXXRgrIql5+', 'WD_2024'),
('Networks Associate', 'sIEemIzBDFcAsybQZ2', 'DDC_2024'),
('PCB Soldering', 'ictJqPlZREBs0AVTZw', 'CET_2024');

-- --------------------------------------------------------

--
-- Table structure for table `team_groups_name`
--

CREATE TABLE `team_groups_name` (
  `team_name` varchar(255) NOT NULL,
  `team_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_groups_name`
--

INSERT INTO `team_groups_name` (`team_name`, `team_id`) VALUES
('Web Development', 'WD_2024'),
('Forensic Photography', 'FORP_2024'),
('Human Rights', 'FSHR_212'),
('Comp Eng 5', 'CET_2024'),
('Data and Digital Communications', 'DDC_2024'),
('Tampoy2', 'TMPY_2024'),
('Elumba Family', 'Eli'),
('Jujutsu High', 'JJH');

-- --------------------------------------------------------

--
-- Table structure for table `team_members_list`
--

CREATE TABLE `team_members_list` (
  `user_id` varchar(255) NOT NULL,
  `team_id` varchar(255) NOT NULL,
  `access_level` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_members_list`
--

INSERT INTO `team_members_list` (`user_id`, `team_id`, `access_level`) VALUES
('Polariaris', 'FORP_2024', 3),
('Simonde44', 'WD_2024', 3),
('Polariaris', 'FSHR_212', 3),
('Simonde44', 'FSHR_212', 1),
('Polariaris', 'WD_2024', 1),
('jojostar', 'WD_2024', 1),
('Simonde44', 'CET_2024', 3),
('jojostar', 'CET_2024', 1),
('Polariaris', 'CET_2024', 1),
('jojostar', 'FSHR_212', 1),
('Simonde44', 'DDC_2024', 3),
('Polariaris', 'DDC_2024', 1),
('Simonde44', 'TMPY_2024', 3),
('Polariaris', 'TMPY_2024', 1),
('Polariaris', 'Eli', 3),
('Simonde44', 'Eli', 1),
('GS', 'WD_2024', 1),
('YI', 'WD_2024', 1),
('YI', 'JJH', 3),
('GS', 'JJH', 1),
('Simonde44', 'JJH', 1),
('Simonde44', 'FORP_2024', 1),
('MF', 'WD_2024', 1),
('MF', 'FORP_2024', 1),
('MF', 'JJH', 1),
('MF', 'FSHR_212', 1),
('Cielow', 'FORP_2024', 1),
('Polariaris', 'JJH', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
