-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 14 juin 2022 à 13:38
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `proyo`
--

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(32) COLLATE utf8_bin NOT NULL,
  `EMAIL` varchar(64) COLLATE utf8_bin NOT NULL,
  `BIRTHDATE` varchar(16) COLLATE utf8_bin NOT NULL,
  `NOM` varchar(32) COLLATE utf8_bin NOT NULL,
  `PRENOM` varchar(32) COLLATE utf8_bin NOT NULL,
  `LEVEL` tinyint(4) NOT NULL,
  `PASSWORD` varchar(1024) COLLATE utf8_bin NOT NULL,
  `HAS_CONF` tinyint(4) NOT NULL,
  `ADDING_TIME` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=75 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`ID`, `USERNAME`, `EMAIL`, `BIRTHDATE`, `NOM`, `PRENOM`, `LEVEL`, `PASSWORD`, `HAS_CONF`, `ADDING_TIME`) VALUES
(74, 'Jean', 'jphilippe.alle@free.fr', '1995-08-13', 'Dupont', 'Michel', 1, 'cG1Xa1dTQkNMNTFCZmtobjc5eFB1S0JLSHovL0g2QittWTZHOS9laWV1TT0=', 0, 1655199497885829900);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
