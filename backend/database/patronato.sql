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
  codigoProy VARCHAR(50) DEFAULT '',
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
  id_servicio INTEGER DEFAULT NULL,
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
  lugarNacimiento VARCHAR(100) NULL DEFAULT NULL,
  nacionalidad VARCHAR(50) NOT NULL,
  grupoCultural VARCHAR(50) NOT NULL,
  sexo VARCHAR(10) NOT NULL,
  discapacidad VARCHAR(200) NULL DEFAULT NULL,
  viveCon VARCHAR(50) NULL DEFAULT NULL,
  estadoCivil VARCHAR(20) NULL DEFAULT NULL,
  institucion VARCHAR(200) NULL DEFAULT NULL,
  instruccion VARCHAR(50) NULL DEFAULT 'Sin Estudios',
  empresa VARCHAR(100) NULL DEFAULT '',
  ocupacion VARCHAR(100) NULL DEFAULT '',
  seguro VARCHAR(100) NULL DEFAULT 'No tiene',
  referido VARCHAR(100) NULL DEFAULT '',
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
  id_usuario Integer,
  fecha DATE NOT NULL,
  hora VARCHAR(6) NOT NULL,
  observacion VARCHAR(300) NULL DEFAULT NULL,
  valor CHAR(20) NOT NULL,
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
  direccion VARCHAR(300) NULL DEFAULT NULL,
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
  direccion VARCHAR(300) NULL DEFAULT NULL,
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
  contrasena VARCHAR(100) NOT NULL,
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
  parentId INTEGER DEFAULT NULL,
  urlAcc VARCHAR(50) DEFAULT NULL,
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
  edad INTEGER NULL DEFAULT NULL,
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
-- Table 'Nacionalidad'
--
-- ---

DROP TABLE IF EXISTS Nacionalidad;

CREATE SEQUENCE Nacionalidad_seq;

CREATE TABLE Nacionalidad (
  id INTEGER DEFAULT NEXTVAL ('Nacionalidad_seq'),
  nombre VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'GrupoCultural'
--
-- ---

DROP TABLE IF EXISTS GrupoCultural;

CREATE SEQUENCE GrupoCultural_seq;

CREATE TABLE GrupoCultural (
  id INTEGER DEFAULT NEXTVAL ('GrupoCultural_seq'),
  nombre VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'EstadoCivil'
--
-- ---

DROP TABLE IF EXISTS EstadoCivil;

CREATE SEQUENCE EstadoCivil_seq;

CREATE TABLE EstadoCivil (
  id INTEGER DEFAULT NEXTVAL ('EstadoCivil_seq'),
  nombre VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Instruccion'
--
-- ---

DROP TABLE IF EXISTS Instruccion;

CREATE SEQUENCE Instruccion_seq;

CREATE TABLE Instruccion (
  id INTEGER DEFAULT NEXTVAL ('Instruccion_seq'),
  nombre VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Parentesco'
--
-- ---

DROP TABLE IF EXISTS Parentesco;

CREATE SEQUENCE Parentesco_seq;

CREATE TABLE Parentesco (
  id INTEGER DEFAULT NEXTVAL ('Parentesco_seq'),
  nombre VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Discapacidad'
--
-- ---

DROP TABLE IF EXISTS Discapacidad;

CREATE SEQUENCE Discapacidad_seq;

CREATE TABLE Discapacidad (
  id INTEGER DEFAULT NEXTVAL ('Discapacidad_seq'),
  nombre VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Institucion'
--
-- ---

DROP TABLE IF EXISTS Institucion;

CREATE SEQUENCE Institucion_seq;

CREATE TABLE Institucion (
  id INTEGER DEFAULT NEXTVAL ('Institucion_seq'),
  nombre VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'TipoExoneración'
--
-- ---

DROP TABLE IF EXISTS TipoExoneracion;

CREATE SEQUENCE TipoExoneracion_seq;

CREATE TABLE TipoExoneracion (
  id INTEGER DEFAULT NEXTVAL ('TipoExoneracion_seq'),
  nombre VARCHAR(30) NOT NULL,
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
ALTER TABLE Atencion ADD FOREIGN KEY (id_usuario) REFERENCES Usuario (id);
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
ALTER TABLE Accion ADD FOREIGN KEY (parentId) REFERENCES Accion (id);

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

INSERT INTO Provincia (nombre) VALUES ('Pastaza');

INSERT INTO Canton (nombre,id_provincia) VALUES ('Pastaza','1');
INSERT INTO Canton (nombre,id_provincia) VALUES ('Mera','1');
INSERT INTO Canton (nombre,id_provincia) VALUES ('Arajuno','1');
INSERT INTO Canton (nombre,id_provincia) VALUES ('Santa Clara','1');

INSERT INTO Parroquia (nombre,id_canton) VALUES ('Puyo','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Arajuno','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Canelos','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Curaray','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Diez de Agosto','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Fátima','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Montalvo (Andoas)','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Pomona','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Rio Corrientes','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Rio Tigre','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Santa Clara','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Sarayacu','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Simón Bolivar','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Tarqui','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Teniente Hugo Ortiz','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Veracruz (Indillama)','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('El Triunfo','1');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Mera','2');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Madre Tierra','2');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Shell','2');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Santa Clara','3');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('San Jose','3');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Arajuno','4');
INSERT INTO Parroquia (nombre,id_canton) VALUES ('Curaray','4');

INSERT INTO Nacionalidad (nombre) VALUES ('Argentina');
INSERT INTO Nacionalidad (nombre) VALUES ('Boliviana');
INSERT INTO Nacionalidad (nombre) VALUES ('Brasileña');
INSERT INTO Nacionalidad (nombre) VALUES ('Chilena');
INSERT INTO Nacionalidad (nombre) VALUES ('Colombiana');
INSERT INTO Nacionalidad (nombre) VALUES ('Ecuatoriana');
INSERT INTO Nacionalidad (nombre) VALUES ('Paraguaya');
INSERT INTO Nacionalidad (nombre) VALUES ('Peruana');
INSERT INTO Nacionalidad (nombre) VALUES ('Uruguaya');
INSERT INTO Nacionalidad (nombre) VALUES ('Venezolana');

INSERT INTO GrupoCultural (nombre) VALUES ('Mestizo');
INSERT INTO GrupoCultural (nombre) VALUES ('Afro-Ecuatoriano');
INSERT INTO GrupoCultural (nombre) VALUES ('Montubio');
INSERT INTO GrupoCultural (nombre) VALUES ('Blancos');
INSERT INTO GrupoCultural (nombre) VALUES ('Shuar');
INSERT INTO GrupoCultural (nombre) VALUES ('Ashuar');
INSERT INTO GrupoCultural (nombre) VALUES ('Huaorani');
INSERT INTO GrupoCultural (nombre) VALUES ('Siona-Secoya');

INSERT INTO EstadoCivil (nombre) VALUES ('Soltero (a)');
INSERT INTO EstadoCivil (nombre) VALUES ('Casado (a)');
INSERT INTO EstadoCivil (nombre) VALUES ('Union Libre');
INSERT INTO EstadoCivil (nombre) VALUES ('Divorciado (a)');
INSERT INTO EstadoCivil (nombre) VALUES ('Viudo (a)');

INSERT INTO Instruccion (nombre) VALUES ('Sin Estudios');
INSERT INTO Instruccion (nombre) VALUES ('Primaria');
INSERT INTO Instruccion (nombre) VALUES ('Secundaria');
INSERT INTO Instruccion (nombre) VALUES ('Superior');

INSERT INTO Parentesco (nombre) VALUES ('Conyuge');
INSERT INTO Parentesco (nombre) VALUES ('Madre');
INSERT INTO Parentesco (nombre) VALUES ('Padre');
INSERT INTO Parentesco (nombre) VALUES ('Hermano (a)');
INSERT INTO Parentesco (nombre) VALUES ('Tio (a)');
INSERT INTO Parentesco (nombre) VALUES ('Primo (a)');
INSERT INTO Parentesco (nombre) VALUES ('Sobrino (a)');

INSERT INTO TipoExoneracion (nombre) VALUES ('Pagado');
INSERT INTO TipoExoneracion (nombre) VALUES ('Convenio');
INSERT INTO TipoExoneracion (nombre) VALUES ('Proyecto');
INSERT INTO TipoExoneracion (nombre) VALUES ('Grupo Prioritario');

INSERT INTO Compania (nombre,detalle,direccion) VALUES ('Patronato','Servicio Social','Pastaza');

INSERT INTO Unidad (nombre,detalle,direccion,id_compania) VALUES('Consultorio Tipo A','Servicios Medicos','Puyo','1');
INSERT INTO Unidad (nombre,detalle,direccion,id_compania) VALUES('CITET','CITET','Fátima','1');
INSERT INTO Unidad (nombre,detalle,direccion,id_compania) VALUES('Patronato','Patronato','Puyo','1');

INSERT INTO Proyecto (nombre,codigoProy) VALUES ('Patronato Servicios Médicos', 'serviciosmedicos'); -- 1
INSERT INTO Proyecto (nombre,codigoProy) VALUES ('CITET', 'citet'); -- 2
INSERT INTO Proyecto (nombre,codigoProy) VALUES ('Años Dorados', 'aniosdorados'); -- 3
INSERT INTO Proyecto (nombre,codigoProy) VALUES ('Por una Vida Mejor', 'porunavidamejor'); -- 4
INSERT INTO Proyecto (nombre,codigoProy) VALUES ('Brigadas Médicas Fluviales', 'brigadasfluviales'); -- 5
INSERT INTO Proyecto (nombre,codigoProy) VALUES ('Brigadas Médicas Terrestres', 'brigadasterrestres'); -- 6
INSERT INTO Proyecto (nombre,codigoProy) VALUES ('Pastaza Aprende a Emprender', 'aprendeaemprender'); -- 7
INSERT INTO Proyecto (nombre,codigoProy) VALUES ('Apoyo Psicopedagógico', 'apoyopsicopedagogico'); -- 8
INSERT INTO Proyecto (nombre,codigoProy) VALUES ('Mi Presente y Mi Futuro en mis Manos', 'presentefuturoenmismanos'); -- 9
INSERT INTO Proyecto (nombre,codigoProy) VALUES ('TIC', 'tic'); -- 10
INSERT INTO Proyecto (nombre,codigoProy) VALUES ('Personal Administrativo', 'administracion'); -- 11

INSERT INTO ProyUni (id_unidad,id_proyecto) VALUES ('1','1');
INSERT INTO ProyUni (id_unidad,id_proyecto) VALUES ('2','2');
INSERT INTO ProyUni (id_unidad,id_proyecto) VALUES ('3','10');

INSERT INTO Servicio (tipo,id_proyUni) VALUES ('General','1');
INSERT INTO Servicio (tipo,id_proyUni) VALUES ('Medicina General','1');
INSERT INTO Servicio (tipo,id_proyUni) VALUES ('Odontología','1');
INSERT INTO Servicio (tipo,id_proyUni) VALUES ('Terapia de Lenguaje','1');
INSERT INTO Servicio (tipo,id_proyUni) VALUES ('Terapia Física','1');
INSERT INTO Servicio (tipo,id_proyUni) VALUES ('Psicología','1');
INSERT INTO Servicio (tipo,id_proyUni) VALUES ('Equinoterapia','1');
INSERT INTO Servicio (tipo,id_proyUni) VALUES ('Estimulación Temprana','1');

INSERT INTO Rol (nombre,id_servicio) VALUES ('Administrador','1');
INSERT INTO Rol (nombre,id_servicio) VALUES ('Asistente','1');
INSERT INTO Rol (nombre,id_servicio) VALUES ('Médico','2');
INSERT INTO Rol (nombre,id_servicio) VALUES ('Terapeuta Físico','5');
INSERT INTO Rol (nombre,id_servicio) VALUES ('Terapeuta Lenguaje','4');
INSERT INTO Rol (nombre,id_servicio) VALUES ('Psicólogo','6');
INSERT INTO Rol (nombre,id_servicio) VALUES ('Odontólogo','3');
INSERT INTO Rol (nombre,id_servicio) VALUES ('Equinoterapeuta','7');
INSERT INTO Rol (nombre,id_servicio) VALUES ('Especialista','8');

INSERT INTO Accion (id, nombre) VALUES ('1', 'Pacientes');
INSERT INTO Accion (id, nombre) VALUES ('2', 'Citas medicas');
INSERT INTO Accion (id, nombre, parentId, urlAcc) VALUES ('3', 'Ingreso', '1', '/pacientes/ingreso');
INSERT INTO Accion (id, nombre, parentId, urlAcc) VALUES ('4', 'Consulta', '1', '/pacientes/consulta');
INSERT INTO Accion (id, nombre, parentId, urlAcc) VALUES ('5', 'Ingreso', '2', '/citas/ingreso');
INSERT INTO Accion (id, nombre, parentId, urlAcc) VALUES ('6', 'Consulta', '2', '/citas/consulta');

INSERT INTO RolAcc (id_rol,id_accion) VALUES ('1','1');
INSERT INTO RolAcc (id_rol,id_accion) VALUES ('2','1');
INSERT INTO RolAcc (id_rol,id_accion) VALUES ('3','1');
INSERT INTO RolAcc (id_rol,id_accion) VALUES ('4','1');
INSERT INTO RolAcc (id_rol,id_accion) VALUES ('5','1');
INSERT INTO RolAcc (id_rol,id_accion) VALUES ('6','1');
INSERT INTO RolAcc (id_rol,id_accion) VALUES ('7','1');

INSERT INTO Usuario (nombre,apellido,identificacion,telefono,fechaIngreso,correo,contrasena) VALUES
  ('Erick','Pérez','0912324323','0912344321','2018-12-06','erialper@espol.edu.ec','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');
INSERT INTO Usuario (nombre,apellido,identificacion,telefono,fechaIngreso,correo,contrasena) VALUES
  ('Maribel','Moreno','0922324323','0922344321','2018-12-06','mmoreno@patronato.com','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');
INSERT INTO Usuario (nombre,apellido,identificacion,telefono,fechaIngreso,correo,contrasena) VALUES
  ('Julian','Adams','0950322529','0981262314','2018-12-06','jadams@espol.edu.ec','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');
INSERT INTO Usuario (nombre,apellido,identificacion,telefono,fechaIngreso,correo,contrasena) VALUES
  ('Luis','Tipan','0923254523','0932674321','2018-12-13','ltipan@patronato.com','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');
INSERT INTO Usuario (nombre,apellido,identificacion,telefono,fechaIngreso,correo,contrasena) VALUES
  ('Rosa','Moreno','0924554523','0932674321','2018-12-13','rmoreno@patronato.com','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');
INSERT INTO Usuario (nombre,apellido,identificacion,telefono,fechaIngreso,correo,contrasena) VALUES
  ('Vanesa','Moreno','0623554523','0932674321','2018-12-13','vmoreno@patronato.com','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');
INSERT INTO Usuario (nombre,apellido,identificacion,telefono,fechaIngreso,correo,contrasena) VALUES
  ('Laura','Cruz','0935554523','0932674321','2018-12-13','lcruz@patronato.com','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');
INSERT INTO Usuario (nombre,apellido,identificacion,telefono,fechaIngreso,correo,contrasena) VALUES
  ('Tania','Mite','0943554523','0932674321','2018-12-13','tmite@patronato.com','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');
INSERT INTO Usuario (nombre,apellido,identificacion,telefono,fechaIngreso,correo,contrasena) VALUES
  ('Joaquin','Duarte','0963554523','0932674321','2018-12-13','jduarte@patronato.com','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');
INSERT INTO Usuario (nombre,apellido,identificacion,telefono,fechaIngreso,correo,contrasena) VALUES
  ('Tito','Toledo','0943574523','0932674321','2018-12-13','ttoledo@patronato.com','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');
INSERT INTO Usuario (nombre,apellido,identificacion,telefono,fechaIngreso,correo,contrasena) VALUES
  ('Jose','Manrique','0938554523','0932674321','2018-12-13','jmanrique@patronato.com','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');
INSERT INTO Usuario (nombre,apellido,identificacion,telefono,fechaIngreso,correo,contrasena) VALUES
  ('Tania','Peña','0943559523','0932674321','2018-12-13','tpeña@patronato.com','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');
INSERT INTO Usuario (nombre,apellido,identificacion,telefono,fechaIngreso,correo,contrasena) VALUES
  ('Luz','Guillen','0933524523','0932674321','2018-12-13','lguillen@patronato.com','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');

INSERT INTO Cargo (id_usuario,id_Rol,id_ProyUni) VALUES ('3','1','1');
INSERT INTO Cargo (id_usuario,id_Rol,id_ProyUni) VALUES ('3','1','2');
INSERT INTO Cargo (id_usuario,id_Rol,id_ProyUni) VALUES ('2','2','1');
INSERT INTO Cargo (id_usuario,id_Rol,id_ProyUni) VALUES ('4','3','1');
INSERT INTO Cargo (id_usuario,id_Rol,id_ProyUni) VALUES ('5','3','1');
INSERT INTO Cargo (id_usuario,id_Rol,id_ProyUni) VALUES ('6','4','1');
INSERT INTO Cargo (id_usuario,id_Rol,id_ProyUni) VALUES ('7','5','1');
INSERT INTO Cargo (id_usuario,id_Rol,id_ProyUni) VALUES ('8','6','1');
INSERT INTO Cargo (id_usuario,id_Rol,id_ProyUni) VALUES ('9','7','1');
INSERT INTO Cargo (id_usuario,id_Rol,id_ProyUni) VALUES ('10','8','1');
INSERT INTO Cargo (id_usuario,id_Rol,id_ProyUni) VALUES ('11','9','1');
INSERT INTO Cargo (id_usuario,id_Rol,id_ProyUni) VALUES ('12','7','1');
INSERT INTO Cargo (id_usuario,id_Rol,id_ProyUni) VALUES ('13','4','1');

INSERT INTO Beneficiario (nombre,apellido,identificacion,direccion,barrio,zona,telefono,fechaNacimiento,
  lugarNacimiento,nacionalidad,grupoCultural,sexo,discapacidad,estadoCivil,empresa,ocupacion,
  seguro,id_parroquia) VALUES
  ('Juan','Fernandez','1010102020','Sur','Pomona','Urbana','0910102030','1982-10-01',
    'Pastaza','Ecuatoriana','Mestizo','Masculino','No presenta','Soltero (a)','Tienda','Tendero',
    'No tiene','10');
INSERT INTO Beneficiario (nombre,apellido,identificacion,direccion,barrio,zona,telefono,fechaNacimiento,
  lugarNacimiento,nacionalidad,grupoCultural,sexo,discapacidad,estadoCivil,empresa,ocupacion,
  seguro,id_parroquia) VALUES
  ('Lusmila','Tapia','2020302020','Norte','Pomona','Urbana','0930102030','1962-10-01',
    'Pastaza','Ecuatoriana','Mestizo','Femenino','No presenta','Soltero (a)','Costuras','Costurera',
    'No tiene','10');
INSERT INTO Beneficiario (nombre,apellido,identificacion,direccion,barrio,zona,telefono,fechaNacimiento,
  lugarNacimiento,nacionalidad,grupoCultural,sexo,discapacidad,estadoCivil,instruccion,id_parroquia) VALUES
  ('Evelyn','Tapia','4520342020','Norte','Pomona','Urbana','0930145630','2009-01-01',
    'Pastaza','Ecuatoriana','Mestizo','Femenino','Auditiva','Soltero (a)','Primaria','5');
INSERT INTO Beneficiario (nombre,apellido,identificacion,direccion,barrio,zona,telefono,fechaNacimiento,
  lugarNacimiento,nacionalidad,grupoCultural,sexo,discapacidad,estadoCivil,instruccion,id_parroquia) VALUES
  ('Jose','Lara','4530342050','Este','Araujo','Rural','0920145630','2010-01-01',
    'Pastaza','Ecuatoriana','Mestizo','Masculino','Retraso','Soltero (a)','Sin estudios','4');

INSERT INTO Responsable (nombre,apellido,parentesco,telefono,id_beneficiario) VALUES
  ('Juana','Martin','Conyuge','0929393929','1');
INSERT INTO Responsable (nombre,apellido,parentesco,telefono,id_beneficiario) VALUES
  ('Luisa','Martinez','Hermano (a)','0919292919','2');
INSERT INTO Responsable (nombre,apellido,identificacion,parentesco,id_beneficiario) VALUES
  ('Luna','Lino','1029102934','Madre','3');
INSERT INTO Responsable (nombre,apellido,identificacion,parentesco,id_beneficiario) VALUES
  ('Marcos','Tapia','1034142934','Padre','3');
INSERT INTO Responsable (nombre,apellido,identificacion,parentesco,id_beneficiario) VALUES
  ('Marcos','Lara','2024242934','Padre','4');

INSERT INTO Admision(id_proyUni,id_beneficiario,fechaAdmi) VALUES ('1','1','2019-02-07');
INSERT INTO Admision(id_proyUni,id_beneficiario,fechaAdmi) VALUES ('1','2','2019-02-07');
INSERT INTO Admision(id_proyUni,id_beneficiario,fechaAdmi) VALUES ('2','3','2019-02-07');
INSERT INTO Admision(id_proyUni,id_beneficiario,fechaAdmi) VALUES ('2','4','2019-02-07');

INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('2','1','4','2019-02-07','08:30','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('2','2','4','2019-02-07','09:30','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('3','1','9','2019-02-07','10:30','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('3','2','9','2019-02-07','11:30','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('4','1','7','2019-02-07','14:00','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('4','2','7','2019-02-07','15:00','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('5','1','6','2019-02-07','15:15','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('5','2','6','2019-02-07','16:00','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('6','1','8','2019-02-07','16:30','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('6','2','8','2019-02-08','08:30','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('7','1','10','2019-02-08','09:30','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('7','2','10','2019-02-08','10:30','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('8','1','11','2019-02-08','11:30','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('8','2','11','2019-02-08','14:00','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('2','1','5','2019-02-08','15:00','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('2','2','5','2019-02-08','15:15','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('3','1','12','2019-02-08','16:00','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('3','2','12','2019-02-08','16:30','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('5','1','13','2019-02-07','14:15','Pagado');
INSERT INTO Atencion (id_servicio,id_beneficiario,id_usuario,fecha,hora,valor) VALUES ('5','2','13','2019-02-07','14:00','Pagado');
