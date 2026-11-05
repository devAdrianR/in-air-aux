CREATE TABLE reporte_incomodidad (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  codigo          VARCHAR(20) UNIQUE,
  id_usuario      INT NOT NULL,
  autor           VARCHAR(120) NOT NULL,
  id_salon        INT NOT NULL,
  tipo            VARCHAR(30) NOT NULL,
  descripcion     VARCHAR(300) NOT NULL,
  situacion       VARCHAR(20) NOT NULL DEFAULT 'Pendiente',
  respuesta       VARCHAR(300) NULL,
  respondido_por  VARCHAR(120) NULL,
  fecha_respuesta DATETIME NULL,
  estado          TINYINT NOT NULL DEFAULT 1,
  creado          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE accion_ventilacion (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  codigo       VARCHAR(20) UNIQUE,
  id_alerta    INT NULL,
  id_reporte   INT NULL,
  id_usuario   INT NOT NULL,
  tecnico      VARCHAR(120) NOT NULL,
  id_salon     INT NOT NULL,
  tipo_accion  VARCHAR(50) NOT NULL,
  descripcion  VARCHAR(300) NOT NULL,
  resultado    VARCHAR(200) NULL,
  fecha_accion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado       TINYINT NOT NULL DEFAULT 1,
  creado       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_reporte) REFERENCES reporte_incomodidad(id)
);

CREATE TABLE mantenimiento (
  id                    INT AUTO_INCREMENT PRIMARY KEY,
  codigo                VARCHAR(20) UNIQUE,
  id_usuario            INT NOT NULL,
  tecnico               VARCHAR(120) NOT NULL,
  id_dispositivo        INT NOT NULL,
  tipo                  VARCHAR(30) NOT NULL,
  descripcion           VARCHAR(300) NOT NULL,
  fecha_mantenimiento   DATE NOT NULL,
  proximo_mantenimiento DATE NULL,
  estado                TINYINT NOT NULL DEFAULT 1,
  creado                DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);