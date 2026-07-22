CREATE DATABASE sistema_ventas_ssd;
USE sistema_ventas_ssd;

SHOW DATABASES;

-- Tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Categorias
CREATE TABLE Categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE DetalleVenta (

    id_detalle INT AUTO_INCREMENT PRIMARY KEY,

    id_venta INT NOT NULL,

    id_producto INT NOT NULL,

    cantidad INT NOT NULL,

    precio DECIMAL(10,2) NOT NULL,

    subtotal DECIMAL(10,2) NOT NULL,


    CONSTRAINT FK_DetalleVenta_Ventas
    FOREIGN KEY(id_venta)
    REFERENCES Ventas(id_venta),


    CONSTRAINT FK_DetalleVenta_Productos
    FOREIGN KEY(id_producto)
    REFERENCES Productos(id_producto)

);
-- Tabla Productos
CREATE TABLE Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(150) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    stock_minimo INT NOT NULL DEFAULT 5,
    id_categoria INT NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_Productos_Categorias
    FOREIGN KEY (id_categoria)
    REFERENCES Categorias(id_categoria)
);

-- Tabla Movimientos
CREATE TABLE Movimientos (
    id_movimiento INT AUTO_INCREMENT PRIMARY KEY,

    tipo VARCHAR(10) NOT NULL,

    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    cantidad INT NOT NULL,

    observacion VARCHAR(255),

    id_producto INT NOT NULL,

    id_usuario INT NOT NULL,

    CONSTRAINT FK_Movimientos_Productos
    FOREIGN KEY (id_producto)
    REFERENCES Productos(id_producto),

    CONSTRAINT FK_Movimientos_Usuarios
    FOREIGN KEY (id_usuario)
    REFERENCES Usuarios(id_usuario),

    CHECK (tipo IN ('ENTRADA','SALIDA')),

    CHECK (cantidad > 0)
);

-- Usuario administrador
INSERT INTO Usuarios(nombre,usuario,password,rol)
VALUES
('Administrador','admin','admin123','Administrador');

-- Categorías
INSERT INTO Categorias(nombre,descripcion)
VALUES
('Mouse','Dispositivos apuntadores'),
('Teclados','Teclados mecánicos y de membrana'),
('Monitores','Pantallas LED'),
('Audífonos','Auriculares y Headsets'),
('Memorias USB','Almacenamiento portátil');

-- Productos
INSERT INTO Productos
(codigo,nombre,descripcion,precio,stock,stock_minimo,id_categoria)
VALUES
('P001','Mouse Logitech M90','Mouse USB',35.00,20,5,1),
('P002','Teclado Redragon Kumara','Teclado Mecánico',180.00,10,3,2),
('P003','Monitor Samsung 24','Monitor Full HD',650.00,8,2,3),
('P004','Audífonos HyperX','Headset Gamer',250.00,12,4,4),
('P005','Memoria Kingston 64GB','USB 3.0',45.00,30,5,5);

SHOW TABLES;

CREATE TABLE Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(15) UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    estado BOOLEAN DEFAULT TRUE,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,

    id_cliente INT NOT NULL,
    id_usuario INT NOT NULL,

    FOREIGN KEY (id_cliente)
        REFERENCES Clientes(id_cliente),

    FOREIGN KEY (id_usuario)
        REFERENCES Usuarios(id_usuario)
);


USE sistema_ventas_ssd;

SHOW TABLES;