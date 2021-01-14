# Host: localhost  (Version: 5.5.53)
# Date: 2021-01-14 18:15:17
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `nickname` varchar(255) DEFAULT NULL COMMENT '昵称',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COMMENT='用户列表';

#
# Data for table "users"
#

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'tiantian','123123','娜娜的爸爸'),(2,'nana','123456','小美女'),(3,'nannan','123456','大傻逼'),(4,'jiefu','112211','大家的姐夫'),(21,'hkjhkjh','hjhjhjh','hjhjhj'),(22,'sbsbsb','nishidashabi','sbaq'),(23,'sbsbsb','nishidashabi','sbaq');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
