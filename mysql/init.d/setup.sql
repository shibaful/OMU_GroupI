-- 古墳テーブル作成
CREATE TABLE `tombs` (
  `Name` VARCHAR(7) NOT NULL,
  `URL` VARCHAR(50) NOT NULL,
  `Address` VARCHAR(20) NOT NULL,
  `Distance(m)` INT NOT NULL
) DEFAULT CHARSET=utf8mb4;

-- 古墳データ登録
INSERT INTO `tombs` VALUES ('仁徳天皇陵古墳','https://www.sakai-tcb.or.jp/spot/detail/126','堺市堺区大仙町',1317);
INSERT INTO `tombs` VALUES ('履中天皇陵古墳','https://www.sakai-tcb.or.jp/spot/detail/160','堺市西区石津ヶ丘',817);
INSERT INTO `tombs` VALUES ('ニサンザイ古墳','https://www.sakai-tcb.or.jp/spot/detail/122','堺市北区百舌鳥西之町3丁',696);

