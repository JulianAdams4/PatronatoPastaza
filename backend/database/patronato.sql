-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Proyecto'
--
-- ---

DROP TABLE IF EXISTS Proyecto;

CREATE SEQUENCE Proyecto_seq;

CREATE TABLE Proyecto (
  id INTEGER DEFAULT NEXTVAL ('Proyecto_seq'),
  nombre VARCHAR(100) NOT NULL,
  estProy CHAR(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (id)
);

-- ---
-- Table 'Canton'
--
-- ---

DROP TABLE IF EXISTS Canton;

CREATE SEQUENCE Canton_seq;

CREATE TABLE Canton (
  id INTEGER DEFAULT NEXTVAL ('Canton_seq'),
  nombre VARCHAR(30) NOT NULL,
  id_provincia INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Rol'
--
-- ---

DROP TABLE IF EXISTS Rol;

CREATE SEQUENCE Rol_seq;

CREATE TABLE Rol (
  id INTEGER DEFAULT NEXTVAL ('Rol_seq'),
  nombre VARCHAR(50) NOT NULL,
  estRol CHAR(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (id)
);

-- ---
-- Table 'RolAcc'
--
-- ---

DROP TABLE IF EXISTS RolAcc;

CREATE SEQUENCE RolAcc_seq;

CREATE TABLE RolAcc (
  id INTEGER DEFAULT NEXTVAL ('RolAcc_seq'),
  id_rol INTEGER,
  id_accion INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Beneficiario'
--
-- ---

DROP TABLE IF EXISTS Beneficiario;

CREATE SEQUENCE Beneficiario_seq;

CREATE TABLE Beneficiario (
  id INTEGER DEFAULT NEXTVAL ('Beneficiario_seq'),
  nombre VARCHAR(200) NOT NULL,
  apellido VARCHAR(200) NOT NULL,
  identificacion VARCHAR(20) NULL DEFAULT NULL,
  direccion VARCHAR(300) NULL DEFAULT NULL,
  barrio VARCHAR(100) NULL DEFAULT NULL,
  zona VARCHAR(10) NULL DEFAULT NULL,
  telefono VARCHAR(50) NULL DEFAULT NULL,
  fechaNacimiento DATE NULL DEFAULT NULL,
  edad INTEGER NOT NULL,
  lugarNacimiento VARCHAR(100) NULL DEFAULT NULL,
  nacionalidad VARCHAR(50) NOT NULL,
  grupoCultural VARCHAR(50) NOT NULL,
  sexo VARCHAR(10) NOT NULL,
  discapacidad VARCHAR(200) NULL DEFAULT NULL,
  viveCon VARCHAR(50) NULL DEFAULT NULL,
  estadoCivil VARCHAR(20) NULL DEFAULT NULL,
  institucion VARCHAR(200) NULL DEFAULT NULL,
  instruccion VARCHAR(50) NULL DEFAULT NULL,
  empresa VARCHAR(100) NULL DEFAULT NULL,
  ocupacion VARCHAR(100) NULL DEFAULT NULL,
  seguro VARCHAR(100) NULL DEFAULT NULL,
  referido VARCHAR(100) NULL DEFAULT NULL,
  id_parroquia INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Servicio'
--
-- ---

DROP TABLE IF EXISTS Servicio;

CREATE SEQUENCE Servicio_seq;

CREATE TABLE Servicio (
  id INTEGER DEFAULT NEXTVAL ('Servicio_seq'),
  tipo VARCHAR(50) NOT NULL,
  estServ CHAR(1) NOT NULL DEFAULT 'A',
  id_proyUni INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Atencion'
--
-- ---

DROP TABLE IF EXISTS Atencion;

CREATE SEQUENCE Atencion_seq;

CREATE TABLE Atencion (
  id INTEGER DEFAULT NEXTVAL ('Atencion_seq'),
  id_servicio INTEGER,
  id_beneficiario INTEGER,
  fecha DATE NOT NULL,
  observacion VARCHAR(300) NULL DEFAULT NULL,
  estAtenc CHAR(1) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id)
);

-- ---
-- Table 'Cargo'
--
-- ---

DROP TABLE IF EXISTS Cargo;

CREATE SEQUENCE Cargo_seq;

CREATE TABLE Cargo (
  id INTEGER DEFAULT NEXTVAL ('Cargo_seq'),
  id_usuario INTEGER,
  id_rol INTEGER,
  id_proyUni INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Admision'
--
-- ---

DROP TABLE IF EXISTS Admision;

CREATE SEQUENCE Admision_seq;

CREATE TABLE Admision (
  id INTEGER DEFAULT NEXTVAL ('Admision_seq'),
  id_proyUni INTEGER,
  id_beneficiario INTEGER,
  fechaAdmi DATE NOT NULL,
  estAdmi CHAR(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (id)
);

-- ---
-- Table 'Compania'
--
-- ---

DROP TABLE IF EXISTS Compania;

CREATE SEQUENCE Compania_seq;

CREATE TABLE Compania (
  id INTEGER DEFAULT NEXTVAL ('Compania_seq'),
  nombre VARCHAR(30) NOT NULL,
  detalle VARCHAR(300) NULL DEFAULT NULL,
  ubicacion VARCHAR(300) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Provincia'
--
-- ---

DROP TABLE IF EXISTS Provincia;

CREATE SEQUENCE Provincia_seq;

CREATE TABLE Provincia (
  id INTEGER DEFAULT NEXTVAL ('Provincia_seq'),
  nombre VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Parroquia'
--
-- ---

DROP TABLE IF EXISTS Parroquia;

CREATE SEQUENCE Parroquia_seq;

CREATE TABLE Parroquia (
  id INTEGER DEFAULT NEXTVAL ('Parroquia_seq'),
  nombre VARCHAR(30) NOT NULL,
  id_canton INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Unidad'
--
-- ---

DROP TABLE IF EXISTS Unidad;

CREATE SEQUENCE Unidad_seq;

CREATE TABLE Unidad (
  id INTEGER DEFAULT NEXTVAL ('Unidad_seq'),
  nombre VARCHAR(100) NOT NULL,
  detalle VARCHAR(250) NULL DEFAULT NULL,
  ubicacion VARCHAR(300) NULL DEFAULT NULL,
  estUnid CHAR(1) NOT NULL DEFAULT 'A',
  id_compania INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Usuario'
--
-- ---

DROP TABLE IF EXISTS Usuario;

CREATE SEQUENCE Usuario_seq;

CREATE TABLE Usuario (
  id INTEGER DEFAULT NEXTVAL ('Usuario_seq'),
  nombre VARCHAR(200) NOT NULL,
  apellido VARCHAR(200) NOT NULL,
  identificacion VARCHAR(30) NOT NULL,
  telefono VARCHAR(20) NULL DEFAULT NULL,
  fechaIngreso DATE NOT NULL,
  correo VARCHAR(100) NOT NULL,
  contrasena VARCHAR(20) NOT NULL,
  estUsua CHAR(1) NOT NULL DEFAULT 'A',
  estCont CHAR(1) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id)
);

-- ---
-- Table 'Accion'
--
-- ---

DROP TABLE IF EXISTS Accion;

CREATE SEQUENCE Accion_seq;

CREATE TABLE Accion (
  id INTEGER DEFAULT NEXTVAL ('Accion_seq'),
  nombre VARCHAR(50) NOT NULL,
  estAcc CHAR(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (id)
);

-- ---
-- Table 'Responsable'
--
-- ---

DROP TABLE IF EXISTS Responsable;

CREATE SEQUENCE Responsable_seq;

CREATE TABLE Responsable (
  id INTEGER DEFAULT NEXTVAL ('Responsable_seq'),
  nombre VARCHAR(200) NOT NULL,
  apellido VARCHAR(200) NOT NULL,
  identificacion VARCHAR(20) NULL DEFAULT NULL,
  edad INTEGER NOT NULL,
  parentesco VARCHAR(50) NOT NULL,
  telefono VARCHAR(50) NULL DEFAULT NULL,
  direccion VARCHAR(200) NULL DEFAULT NULL,
  instruccion VARCHAR(200) NULL DEFAULT NULL,
  ocupacion VARCHAR(100) NULL DEFAULT NULL,
  id_beneficiario INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Table 'ProyUni'
--
-- ---

DROP TABLE IF EXISTS ProyUni;

CREATE SEQUENCE ProyUni_seq;

CREATE TABLE ProyUni (
  id INTEGER DEFAULT NEXTVAL ('ProyUni_seq'),
  id_proyecto INTEGER,
  id_unidad INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE Canton ADD FOREIGN KEY (id_provincia) REFERENCES Provincia (id);
ALTER TABLE RolAcc ADD FOREIGN KEY (id_rol) REFERENCES Rol (id);
ALTER TABLE RolAcc ADD FOREIGN KEY (id_accion) REFERENCES Accion (id);
ALTER TABLE Beneficiario ADD FOREIGN KEY (id_parroquia) REFERENCES Parroquia (id);
ALTER TABLE Servicio ADD FOREIGN KEY (id_proyUni) REFERENCES ProyUni (id);
ALTER TABLE Atencion ADD FOREIGN KEY (id_servicio) REFERENCES Servicio (id);
ALTER TABLE Atencion ADD FOREIGN KEY (id_beneficiario) REFERENCES Beneficiario (id);
ALTER TABLE Cargo ADD FOREIGN KEY (id_usuario) REFERENCES Usuario (id);
ALTER TABLE Cargo ADD FOREIGN KEY (id_rol) REFERENCES Rol (id);
ALTER TABLE Cargo ADD FOREIGN KEY (id_proyUni) REFERENCES ProyUni (id);
ALTER TABLE Admision ADD FOREIGN KEY (id_proyUni) REFERENCES ProyUni (id);
ALTER TABLE Admision ADD FOREIGN KEY (id_beneficiario) REFERENCES Beneficiario (id);
ALTER TABLE Parroquia ADD FOREIGN KEY (id_canton) REFERENCES Canton (id);
ALTER TABLE Unidad ADD FOREIGN KEY (id_compania) REFERENCES Compania (id);
ALTER TABLE Responsable ADD FOREIGN KEY (id_beneficiario) REFERENCES Beneficiario (id);
ALTER TABLE ProyUni ADD FOREIGN KEY (id_proyecto) REFERENCES Proyecto (id);
ALTER TABLE ProyUni ADD FOREIGN KEY (id_unidad) REFERENCES Unidad (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Proyecto` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Canton` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Rol` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `RolAcc` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Beneficiario` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Servicio` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Atencion` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Cargo` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Admision` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Compania` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Provincia` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Parroquia` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Unidad` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Usuario` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Accion` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Responsable` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `ProyUni` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Seed Data
-- ---

INSERT INTO Compania (nombre,detalle,direccion) VALUES ('Patronato','Servicio Social','Pastaza');
INSERT INTO Unidad (nombre,detalle,direccion,id_compania) VALUES('Consultorio Tipo A','Servicios Medicos','Puyo','1');
INSERT INTO Unidad (nombre,detalle,direccion,id_compania) VALUES('CITET','CITET','Fátima','1');

INSERT INTO Proyecto (nombre) VALUES ('Patronato Servicios Médicos');
INSERT INTO Proyecto (nombre) VALUES ('CITET');
INSERT INTO Proyecto (nombre) VALUES ('Años Dorados');
INSERT INTO Proyecto (nombre) VALUES ('Por una Vida Mejor');
INSERT INTO Proyecto (nombre) VALUES ('Brigadas Médicas Fluviales');
INSERT INTO Proyecto (nombre) VALUES ('Brigadas Médicas Terrestres');
INSERT INTO Proyecto (nombre) VALUES ('Aprende a Emprender');
INSERT INTO Proyecto (nombre) VALUES ('Apoyo Psicopedagógico');
INSERT INTO Proyecto (nombre) VALUES ('Mi Presente y Mi Futuro en mis manos');
INSERT INTO Proyecto (nombre) VALUES ('TIC');
INSERT INTO Proyecto (nombre) VALUES ('Personal Administrativo');

INSERT INTO ProyUni (id_unidad,id_proyecto) VALUES ('1','1');
INSERT INTO ProyUni (id_unidad,id_proyecto) VALUES ('2','2');

INSERT INTO Servicio (tipo,id_proyUni) VALUES ('Medicina General','1');
INSERT INTO Servicio (tipo,id_proyUni) VALUES ('Odontología','1');
INSERT INTO Servicio (tipo,id_proyUni) VALUES ('Terapia de Lenguaje','1');
INSERT INTO Servicio (tipo,id_proyUni) VALUES ('Terapia Física','1');
INSERT INTO Servicio (tipo,id_proyUni) VALUES ('Psicología','1');

INSERT INTO Rol (nombre) VALUES ('Administrador');
INSERT INTO Rol (nombre) VALUES ('Asistente');
INSERT INTO Rol (nombre) VALUES ('Médico');
INSERT INTO Rol (nombre) VALUES ('Terapeuta Físico');
INSERT INTO Rol (nombre) VALUES ('Terapeuta Lenguaje');
INSERT INTO Rol (nombre) VALUES ('Psicólogo');

--INSERT INTO Accion (nombre) VALUES ('');

--INSERT INTO RolAcc (id_rol,id_accion) VALUES ('','');

INSERT INTO Provincia (nombre) VALUES ('Pastaza');
INSERT INTO Canton (nombre,id_provincia) VALUES ('Pastaza','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Puyo','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Arajuno','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Canelos','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Curaray','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Diez de Agosto','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Fátima','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Montalvo (Andoas)','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Pomona','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Río Corrientes','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Río Tigre','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Santa Clara','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Sarayacu','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Simón Bolívar','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Tarqui','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Teniente Hugo Ortiz','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Veracruz (Indillama)','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('El Triunfo','1');
INSERT INTO Canton (nombre,id_provincia) VALUES ('Mera','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Mera','2');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Madre Tierra','2');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Shell','2');
INSERT INTO Canton (nombre,id_provincia) VALUES ('Santa Clara','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Santa Clara','3');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('San José','3');
INSERT INTO Canton (nombre,id_provincia) VALUES ('Arajuno','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Arajuno','4');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Curaray','4');

-- ---
-- Test Data
-- ---

-- INSERT INTO Proyecto (`id`,`nombre`,`estProy`) VALUES
-- ('','','');
-- INSERT INTO `Canton` (`id`,`nombre`,`id_provincia`) VALUES
-- ('','','');
-- INSERT INTO `Rol` (`id`,`nombre`,`estRol`) VALUES
-- ('','','');
-- INSERT INTO `RolAcc` (`id`,`id_rol`,`id_accion`) VALUES
-- ('','','');
-- INSERT INTO `Beneficiario` (`id`,`apellidos`,`nombres`,`identificacion`,`direccion`,`barrio`,`zona`,`telefono`,`fechaNacimiento`,`edad`,`lugarNacimiento`,`nacionalidad`,`grupoCultural`,`sexo`,`discapacidad`,`viveCon`,`estadoCivil`,`institucion`,`instruccion`,`empresa`,`ocupacion`,`seguro`,`referido`,`id_parroquia`) VALUES
-- ('','','','','','','','','','','','','','','','','','','','','','','','');
-- INSERT INTO `Servicio` (`id`,`tipo`,`estServ`,`id_ProyUni`) VALUES
-- ('','','','');
-- INSERT INTO `Atencion` (`id`,`id_servicio`,`id_beneficiario`,`fecha`,`observacion`,`estAtenc`) VALUES
-- ('','','','','','');
-- INSERT INTO `Cargo` (`id`,`id_usuario`,`id_Rol`,`id_ProyUni`) VALUES
-- ('','','','');
-- INSERT INTO `Admision` (`id`,`id_proyUni`,`id_beneficiario`,`fechaAdmi`,`estAdmi`) VALUES
-- ('','','','','');
-- INSERT INTO `Compania` (`id`,`nombre`,`detalle`,`ubicacion`) VALUES
-- ('','','','');
-- INSERT INTO `Provincia` (`id`,`nombre`) VALUES
-- ('','');
-- INSERT INTO `Parroquia` (`id`,`nombre`,`id_canton`) VALUES
-- ('','','');
-- INSERT INTO `Unidad` (`id`,`nombre`,`detalle`,`ubicacion`,`estUnid`,`id_compañia`) VALUES
-- ('','','','','','');
-- INSERT INTO `Usuario` (`id`,`nombre`,`apellido`,`identificacion`,`telefono`,`fechaIngreso`,`correo`,`contrasena`,`estUsua`,`estCont`) VALUES
-- ('','','','','','','','','','');
-- INSERT INTO `Accion` (`id`,`nombre`,`estAcc`) VALUES
-- ('','','');
-- INSERT INTO `Responsable` (`id`,`nombres`,`apellidos`,`identificacion`,`edad`,`parentesco`,`telefono`,`direccion`,`instruccion`,`ocupacion`,`id_beneficiario`) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO `ProyUni` (`id`,`id_proyecto`,`id_unidad`) VALUES
-- ('','','');
