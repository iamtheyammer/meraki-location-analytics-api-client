```
CREATE TABLE `[TABLE NAME]` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `apMac` char(17) NOT NULL DEFAULT '',
  `clientMac` char(17) NOT NULL DEFAULT '',
  `ipv4` varchar(18) DEFAULT NULL,
  `ipv6` varchar(25) DEFAULT NULL,
  `seenEpoch` int(17) NOT NULL,
  `ssid` varchar(30) DEFAULT NULL,
  `rssi` mediumint(2) DEFAULT NULL,
  `manufacturer` varchar(35) DEFAULT NULL,
  `os` varchar(35) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `unc` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```
