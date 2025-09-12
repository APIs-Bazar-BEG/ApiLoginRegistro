-- Crear la base de datos para la API de Login/Registro (mysql)
CREATE DATABASE bazarBEG_Login;
GO

-- Usar la base de datos
USE bazarBEG_Login;
GO

-- Tabla: roles
CREATE TABLE roles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);
GO

-- Tabla: usuarios
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(255) NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    foto VARCHAR(255) NULL,
    status INT NOT NULL DEFAULT 1,
    fecha_registro DATETIME NULL DEFAULT GETDATE(),
    rol_id INT,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);
GO

-- Inserción de datos iniciales
INSERT INTO roles (nombre) VALUES ('ADMIN');
INSERT INTO roles (nombre) VALUES ('CLIENTE');
INSERT INTO roles (nombre) VALUES ('VISITANTE');
GO

-- Inserción de un usuario administrador de prueba
-- La contraseña: admin123
INSERT INTO usuarios (nombre, apellido, email, password, rol_id, status)
VALUES ('Admin Beg', NULL, 'adminBEG@gmail.com', '$2b$12$.pMVS5P8ydgbCWta2fOsR.2b7.3HXnvw9jNXo.hJ7mbb79ds3KInu', 1, 1);

GO
