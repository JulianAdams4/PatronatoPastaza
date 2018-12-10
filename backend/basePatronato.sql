-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Proyecto'
--
-- ---

DROP TABLE IF EXISTS `Proyecto`;

CREATE TABLE `Proyecto` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `estProy` CHAR(1) NOT NULL DEFAULT 'I',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Cantones'
--
-- ---

DROP TABLE IF EXISTS `Cantones`;

CREATE TABLE `Cantones` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `nombre` VARCHAR(30) NOT NULL,
  `id_provincia` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Roles'
--
-- ---

DROP TABLE IF EXISTS `Roles`;

CREATE TABLE `Roles` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `estRol` CHAR(1) NOT NULL DEFAULT 'I',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'ProyRol'
--
-- ---

DROP TABLE IF EXISTS `ProyRol`;

CREATE TABLE `ProyRol` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_proyecto` INTEGER NULL DEFAULT NULL,
  `id_roles` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'RolAcc'
--
-- ---

DROP TABLE IF EXISTS `RolAcc`;

CREATE TABLE `RolAcc` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_roles` INTEGER NULL DEFAULT NULL,
  `id_acciones` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Beneficiario'
--
-- ---

DROP TABLE IF EXISTS `Beneficiario`;

CREATE TABLE `Beneficiario` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `apellidos` VARCHAR(100) NOT NULL,
  `nombres` VARCHAR(100) NOT NULL,
  `identificacion` VARCHAR(20) NULL DEFAULT NULL,
  `direccion` VARCHAR(300) NULL DEFAULT NULL,
  `barrio` VARCHAR(100) NULL DEFAULT NULL,
  `parroquia` INTEGER(10) NOT NULL,
  `canton` INTEGER(10) NOT NULL,
  `provincia` INTEGER(10) NOT NULL,
  `zona` VARCHAR(10) NOT NULL,
  `telefono` VARCHAR(50) NOT NULL,
  `fechaNacimiento` DATE NOT NULL,
  `lugarNacimiento` VARCHAR(100) NULL DEFAULT NULL,
  `nacionalidad` INTEGER(10) NOT NULL,
  `grupoCultural` VARCHAR(50) NOT NULL,
  `sexo` VARCHAR(10) NOT NULL,
  `discapacidad` VARCHAR(200) NULL DEFAULT NULL,
  `estadoCivil` VARCHAR(20) NOT NULL,
  `instruccion` VARCHAR(50) NOT NULL,
  `empresa` VARCHAR(100) NULL DEFAULT NULL,
  `ocupacion` VARCHAR(100) NULL DEFAULT NULL,
  `seguro` VARCHAR(100) NULL DEFAULT NULL,
  `referido` VARCHAR(100) NULL DEFAULT NULL,
  `responsable1` VARCHAR(200) NOT NULL,
  `parentesco1` VARCHAR(100) NOT NULL,
  `direRes1` VARCHAR(300) NULL DEFAULT NULL,
  `fonoRes1` VARCHAR(50) NOT NULL,
  `responsable2` VARCHAR(200) NULL DEFAULT NULL,
  `parentesco2` VARCHAR(50) NULL DEFAULT NULL,
  `fonoRes2` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Servicios'
--
-- ---

DROP TABLE IF EXISTS `Servicios`;

CREATE TABLE `Servicios` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `tipo` VARCHAR(50) NOT NULL,
  `estServ` CHAR(1) NOT NULL DEFAULT 'I',
  `id_proyecto` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Atencion'
--
-- ---

DROP TABLE IF EXISTS `Atencion`;

CREATE TABLE `Atencion` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_servicios` INTEGER NULL DEFAULT NULL,
  `id_beneficiario` INTEGER NULL DEFAULT NULL,
  `fecha` DATE NOT NULL,
  `estAtenc` CHAR(1) NOT NULL DEFAULT 'P',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'UsuProy'
--
-- ---

DROP TABLE IF EXISTS `UsuProy`;

CREATE TABLE `UsuProy` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_usuarios` INTEGER NULL DEFAULT NULL,
  `id_proyecto` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'ProyBene'
--
-- ---

DROP TABLE IF EXISTS `ProyBene`;

CREATE TABLE `ProyBene` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_proyecto` INTEGER NULL DEFAULT NULL,
  `id_beneficiario` INTEGER NULL DEFAULT NULL,
  `fechaAdmi` DATE NOT NULL,
  `estAdmi` CHAR(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Compania'
--
-- ---

DROP TABLE IF EXISTS `Compania`;

CREATE TABLE `Compania` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `nombre` VARCHAR(30) NOT NULL,
  `detalle` VARCHAR(300) NULL DEFAULT NULL,
  `ubicacion` VARCHAR(300) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Provincia'
--
-- ---

DROP TABLE IF EXISTS `Provincia`;

CREATE TABLE `Provincia` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `nombre` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Parroquia'
--
-- ---

DROP TABLE IF EXISTS `Parroquia`;

CREATE TABLE `Parroquia` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `nombre` VARCHAR(30) NOT NULL,
  `id_cantones` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Unidades'
--
-- ---

DROP TABLE IF EXISTS `Unidades`;

CREATE TABLE `Unidades` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `nombre` VARCHAR NULL DEFAULT NULL,
  `detalle` VARCHAR(250) NULL DEFAULT NULL,
  `ubicacion` VARCHAR(300) NULL DEFAULT NULL,
  `estUnid` CHAR(1) NOT NULL DEFAULT 'I',
  `id_compañia` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Usuarios'
--
-- ---

DROP TABLE IF EXISTS `Usuarios`;

CREATE TABLE `Usuarios` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido` VARCHAR(100) NOT NULL,
  `identificacion` VARCHAR(30) NOT NULL,
  `telefono` VARCHAR(20) NULL DEFAULT NULL,
  `fechaIngreso` DATE NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `contrasena` VARCHAR(20) NOT NULL,
  `estUsua` CHAR(1) NOT NULL DEFAULT 'I',
  `estCont` CHAR NOT NULL DEFAULT 'P',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Acciones'
--
-- ---

DROP TABLE IF EXISTS `Acciones`;

CREATE TABLE `Acciones` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `estAcc` CHAR(1) NOT NULL DEFAULT 'I',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'ProyUnid'
--
-- ---

DROP TABLE IF EXISTS `ProyUnid`;

CREATE TABLE `ProyUnid` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_unidades` INTEGER NULL DEFAULT NULL,
  `id_proyecto` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Nacionalidad'
--
-- ---

DROP TABLE IF EXISTS `Nacionalidad`;

CREATE TABLE `Nacionalidad` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `nombre` VARCHAR(100) NOT NULL DEFAULT 'Ecuatoriana',
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Cantones` ADD FOREIGN KEY (id_provincia) REFERENCES `Provincia` (`id`);
ALTER TABLE `ProyRol` ADD FOREIGN KEY (id_proyecto) REFERENCES `Proyecto` (`id`);
ALTER TABLE `ProyRol` ADD FOREIGN KEY (id_roles) REFERENCES `Roles` (`id`);
ALTER TABLE `RolAcc` ADD FOREIGN KEY (id_roles) REFERENCES `Roles` (`id`);
ALTER TABLE `RolAcc` ADD FOREIGN KEY (id_acciones) REFERENCES `Acciones` (`id`);
ALTER TABLE `Servicios` ADD FOREIGN KEY (id_proyecto) REFERENCES `Proyecto` (`id`);
ALTER TABLE `Atencion` ADD FOREIGN KEY (id_servicios) REFERENCES `Servicios` (`id`);
ALTER TABLE `Atencion` ADD FOREIGN KEY (id_beneficiario) REFERENCES `Beneficiario` (`id`);
ALTER TABLE `UsuProy` ADD FOREIGN KEY (id_usuarios) REFERENCES `Usuarios` (`id`);
ALTER TABLE `UsuProy` ADD FOREIGN KEY (id_proyecto) REFERENCES `Proyecto` (`id`);
ALTER TABLE `ProyBene` ADD FOREIGN KEY (id_proyecto) REFERENCES `Proyecto` (`id`);
ALTER TABLE `ProyBene` ADD FOREIGN KEY (id_beneficiario) REFERENCES `Beneficiario` (`id`);
ALTER TABLE `Parroquia` ADD FOREIGN KEY (id_cantones) REFERENCES `Cantones` (`id`);
ALTER TABLE `Unidades` ADD FOREIGN KEY (id_compañia) REFERENCES `Compania` (`id`);
ALTER TABLE `ProyUnid` ADD FOREIGN KEY (id_unidades) REFERENCES `Unidades` (`id`);
ALTER TABLE `ProyUnid` ADD FOREIGN KEY (id_proyecto) REFERENCES `Proyecto` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Proyecto` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Cantones` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Roles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `ProyRol` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `RolAcc` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Beneficiario` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Servicios` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Atencion` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `UsuProy` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `ProyBene` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Compania` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Provincia` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Parroquia` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Unidades` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Usuarios` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Acciones` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `ProyUnid` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Nacionalidad` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Proyecto` (`id`,`nombre`,`estProy`) VALUES
-- ('','','');
-- INSERT INTO `Cantones` (`id`,`nombre`,`id_provincia`) VALUES
-- ('','','');
-- INSERT INTO `Roles` (`id`,`nombre`,`estRol`) VALUES
-- ('','','');
-- INSERT INTO `ProyRol` (`id`,`id_proyecto`,`id_roles`) VALUES
-- ('','','');
-- INSERT INTO `RolAcc` (`id`,`id_roles`,`id_acciones`) VALUES
-- ('','','');
-- INSERT INTO `Beneficiario` (`id`,`apellidos`,`nombres`,`identificacion`,`direccion`,`barrio`,`parroquia`,`canton`,`provincia`,`zona`,`telefono`,`fechaNacimiento`,`lugarNacimiento`,`nacionalidad`,`grupoCultural`,`sexo`,`discapacidad`,`estadoCivil`,`instruccion`,`empresa`,`ocupacion`,`seguro`,`referido`,`responsable1`,`parentesco1`,`direRes1`,`fonoRes1`,`responsable2`,`parentesco2`,`fonoRes2`) VALUES
-- ('','','','','','','','','','','','','','','','','','','','','','','','','','','','','','');
-- INSERT INTO `Servicios` (`id`,`tipo`,`estServ`,`id_proyecto`) VALUES
-- ('','','','');
-- INSERT INTO `Atencion` (`id`,`id_servicios`,`id_beneficiario`,`fecha`,`estAtenc`) VALUES
-- ('','','','','');
-- INSERT INTO `UsuProy` (`id`,`id_usuarios`,`id_proyecto`) VALUES
-- ('','','');
-- INSERT INTO `ProyBene` (`id`,`id_proyecto`,`id_beneficiario`,`fechaAdmi`,`estAdmi`) VALUES
-- ('','','','','');
-- INSERT INTO `Compania` (`id`,`nombre`,`detalle`,`ubicacion`) VALUES
-- ('','','','');
-- INSERT INTO `Provincia` (`id`,`nombre`) VALUES
-- ('','');
-- INSERT INTO `Parroquia` (`id`,`nombre`,`id_cantones`) VALUES
-- ('','','');
-- INSERT INTO `Unidades` (`id`,`nombre`,`detalle`,`ubicacion`,`estUnid`,`id_compañia`) VALUES
-- ('','','','','','');
-- INSERT INTO `Usuarios` (`id`,`nombre`,`apellido`,`identificacion`,`telefono`,`fechaIngreso`,`correo`,`contrasena`,`estUsua`,`estCont`) VALUES
-- ('','','','','','','','','','');
-- INSERT INTO `Acciones` (`id`,`nombre`,`estAcc`) VALUES
-- ('','','');
-- INSERT INTO `ProyUnid` (`id`,`id_unidades`,`id_proyecto`) VALUES
-- ('','','');
-- INSERT INTO `Nacionalidad` (`id`,`nombre`) VALUES
-- ('','');
