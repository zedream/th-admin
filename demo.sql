/*
Navicat MySQL Data Transfer

Source Server         : th
Source Server Version : 50731
Source Host           : localhost:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50731
File Encoding         : 65001

Date: 2020-09-27 10:51:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for chatrecord
-- ----------------------------
DROP TABLE IF EXISTS `chatrecord`;
CREATE TABLE `chatrecord` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `from_id` int(16) NOT NULL,
  `to_id` int(16) NOT NULL,
  `from_user` varchar(255) CHARACTER SET utf8 NOT NULL,
  `to_user` varchar(255) CHARACTER SET utf8 NOT NULL,
  `content` longtext CHARACTER SET utf8 NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of chatrecord
-- ----------------------------
INSERT INTO `chatrecord` VALUES ('23', '1', '2', 'tanghao', 'admin', '在干嘛\n', '2020-09-19 16:27:42');
INSERT INTO `chatrecord` VALUES ('24', '2', '1', 'admin', 'tanghao', '上班班', '2020-09-19 16:27:56');
INSERT INTO `chatrecord` VALUES ('25', '1', '2', 'tanghao', 'admin', '什么时候下班啊', '2020-09-19 18:24:28');

-- ----------------------------
-- Table structure for dict
-- ----------------------------
DROP TABLE IF EXISTS `dict`;
CREATE TABLE `dict` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dict_id` int(11) NOT NULL,
  `dict_key` int(11) NOT NULL,
  `dict_value` varchar(255) CHARACTER SET utf8 NOT NULL,
  `sort` int(10) unsigned NOT NULL,
  `dict_type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dict
-- ----------------------------
INSERT INTO `dict` VALUES ('1', '1', '1', '超级管理员', '1', 'role');
INSERT INTO `dict` VALUES ('2', '1', '2', '系统管理员', '2', 'role');
INSERT INTO `dict` VALUES ('3', '1', '9', '游客', '9', 'role');
INSERT INTO `dict` VALUES ('4', '2', '1', '男', '1', 'gender');
INSERT INTO `dict` VALUES ('5', '2', '2', '女', '2', 'gender');
INSERT INTO `dict` VALUES ('6', '2', '3', '未知', '3', 'gender');

-- ----------------------------
-- Table structure for dicttype
-- ----------------------------
DROP TABLE IF EXISTS `dicttype`;
CREATE TABLE `dicttype` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `dict` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `sort` int(11) NOT NULL DEFAULT '1',
  `dicy_type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dicttype
-- ----------------------------
INSERT INTO `dicttype` VALUES ('1', '角色', '1', 'role');
INSERT INTO `dicttype` VALUES ('2', '性别', '1', 'gender');

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `size` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES ('img-916bc457b0be4fe2c7105b3e0ce5242b_mh1598520817994.jpg', 'jpg', '30', 'http://th.vaiwan.com/files/img-916bc457b0be4fe2c7105b3e0ce5242b_mh1598520817994.jpg', '2020-09-09 11:56:54', '1', '721509');
INSERT INTO `file` VALUES ('6B9080A7-F74D-4D48-9E80-FE41F2AB03DF.jpeg', 'jpeg', '31', 'http://th.vaiwan.com/files/6B9080A7-F74D-4D48-9E80-FE41F2AB03DF.jpeg', '2020-09-09 11:58:28', '1', '415221');
INSERT INTO `file` VALUES ('1255C5B9-E638-4F30-A11C-9B5FA6FDB83B.jpeg', 'jpeg', '32', 'http://th.vaiwan.com/files/1255C5B9-E638-4F30-A11C-9B5FA6FDB83B.jpeg', '2020-09-09 11:58:35', '1', '188588');
INSERT INTO `file` VALUES ('778ba06a56d06683.jpg', 'jpg', '33', 'http://th.vaiwan.com/files/778ba06a56d06683.jpg', '2020-09-09 19:07:53', '1', '122336');
INSERT INTO `file` VALUES ('-62942aefcc64176e.jpg', 'jpg', '34', 'http://th.vaiwan.com/files/-62942aefcc64176e.jpg', '2020-09-09 19:09:53', '1', '229019');
INSERT INTO `file` VALUES ('img-df1a35f0e2c6f5a57fbac81eace39fa4.jpg', 'jpg', '35', 'http://th.vaiwan.com/files/img-df1a35f0e2c6f5a57fbac81eace39fa4.jpg', '2020-09-09 19:09:56', '1', '197226');
INSERT INTO `file` VALUES ('img-14a109983e7523905437a4e50972ee56.jpg', 'jpg', '36', 'http://th.vaiwan.com/files/img-14a109983e7523905437a4e50972ee56.jpg', '2020-09-09 19:14:14', '1', '41914');
INSERT INTO `file` VALUES ('mmexport1595585735313.jpg', 'jpg', '37', 'http://th.vaiwan.com/files/mmexport1595585735313.jpg', '2020-09-09 19:14:16', '1', '229538');
INSERT INTO `file` VALUES ('1592554916276.jpeg', 'jpeg', '38', 'http://th.vaiwan.com/files/1592554916276.jpeg', '2020-09-09 19:14:19', '1', '79279');
INSERT INTO `file` VALUES ('-11783d6d5f033c1d.jpg', 'jpg', '39', 'http://th.vaiwan.com/files/-11783d6d5f033c1d.jpg', '2020-09-09 19:14:22', '1', '50115');
INSERT INTO `file` VALUES ('login_bg.jpg', 'jpg', '40', 'http://th.vaiwan.com/files/login_bg.jpg', '2020-09-10 11:06:04', '3', '138603');
INSERT INTO `file` VALUES ('avatar.png', 'png', '42', 'http://th.vaiwan.com/files/avatar.png', '2020-09-10 11:08:01', '3', '91999');
INSERT INTO `file` VALUES ('delete.png', 'png', '60', 'http://th.vaiwan.com/files/delete.png', '2020-09-12 14:26:48', '1', '384');
INSERT INTO `file` VALUES ('search.png', 'png', '62', 'http://th.vaiwan.com/files/search.png', '2020-09-12 14:46:17', '1', '363');
INSERT INTO `file` VALUES ('love.png', 'png', '63', 'http://th.vaiwan.com/files/love.png', '2020-09-12 14:46:17', '1', '732');
INSERT INTO `file` VALUES ('share.png', 'png', '64', 'http://th.vaiwan.com/files/share.png', '2020-09-12 14:46:17', '1', '565');
INSERT INTO `file` VALUES ('zj.jpg', 'jpg', '65', 'http://th.vaiwan.com/files/zj.jpg', '2020-09-15 11:36:02', '7', '176103');
INSERT INTO `file` VALUES ('-5ff03517d692aba9.gif', 'gif', '66', 'http://th.vaiwan.com/files/-5ff03517d692aba9.gif', '2020-09-18 19:27:02', '2', '4296');
INSERT INTO `file` VALUES ('1587516659754.jpeg', 'jpeg', '67', 'http://th.vaiwan.com/files/1587516659754.jpeg', '2020-09-18 19:27:06', '2', '133594');

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `permission` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES ('1', '1', '1,2,3,4,5,6,7,8,9,10,11');
INSERT INTO `permission` VALUES ('2', '2', '1,2,3,4,5,9,10,11');
INSERT INTO `permission` VALUES ('3', '9', '1,3,4,5,10,11');

-- ----------------------------
-- Table structure for router
-- ----------------------------
DROP TABLE IF EXISTS `router`;
CREATE TABLE `router` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `component` varchar(255) NOT NULL,
  `meta` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `icon` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of router
-- ----------------------------
INSERT INTO `router` VALUES ('1', '0', '/system', '', '{\"title\": \"系统管理\"}', 'icon-zhankai');
INSERT INTO `router` VALUES ('2', '1', '/system/user', 'user', '{\"title\": \"用户管理\"}', 'icon-zhankai');
INSERT INTO `router` VALUES ('3', '1', '/system/menu', 'menu', '{\"title\": \"菜单管理\"}', 'icon-zhankai');
INSERT INTO `router` VALUES ('4', '0', '/file', '', '{\"title\": \"文件管理\"}', 'icon-zhankai');
INSERT INTO `router` VALUES ('5', '4', '/file/file', 'file', '{\"title\": \"文件管理\"}', 'icon-zhankai');
INSERT INTO `router` VALUES ('6', '4', '/file/test', 'test', '{\"title\": \"测试\"}', 'icon-zhankai');
INSERT INTO `router` VALUES ('7', '6', '/file/test/child', 'child', '{\"title\": \"子菜单\"}', 'icon-zhankai');
INSERT INTO `router` VALUES ('8', '1', '/system/test', 'test', '{\"title\": \"测试\"}', 'icon-zhankai');
INSERT INTO `router` VALUES ('9', '1', '/system/dict', 'dict', '{\"title\": \"数据字典\"}', 'icon-zhankai');
INSERT INTO `router` VALUES ('10', '0', '/ws', '', '{\"title\": \"WebSocket测试\"}', 'icon-zhankai');
INSERT INTO `router` VALUES ('11', '10', '/ws/chat', 'chat', '{\"title\": \"简易聊天\"}', 'icon-zhankai');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `gender` int(2) unsigned NOT NULL DEFAULT '3',
  `online` int(1) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'tanghao', '111111', 'th404', 'http://th.vaiwan.com/files/img-df1a35f0e2c6f5a57fbac81eace39fa4.jpg', null, '2', '1', '1');
INSERT INTO `user` VALUES ('2', 'admin', 'admin1220', '超级管理员', 'http://th.vaiwan.com/files/-5ff03517d692aba9.gif', null, '1', '3', '0');
INSERT INTO `user` VALUES ('3', 'visitor', '111111', '游客', 'http://th.vaiwan.com/files/1587516659754.jpeg', null, '9', '3', '0');
INSERT INTO `user` VALUES ('7', 'zhaojiao', '111111', '赵阿娇', 'http://th.vaiwan.com/files/img-df1a35f0e2c6f5a57fbac81eace39fa4.jpg', null, '9', '3', '0');
INSERT INTO `user` VALUES ('10', 'test', '1', '测试一号', 'http://th.vaiwan.com/files/avatar.png', null, '9', '3', '0');
