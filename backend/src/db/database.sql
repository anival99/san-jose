CREATE DATABASE IF NOT EXISTS privateSchool;

use privateSchool;

CREATE TABLE student(
   id INT NOT NULL AUTO_INCREMENT,
   nombre VARCHAR(45) NOT NULL,
   fecha_nacimiento DATE NOT NULL,
   direccion VARCHAR(50) NOT NULL,
   telefono VARCHAR(10) NOT NULL,
   fecha_ingreso  DATE NOT NULL,
   PRIMARY KEY(id)

);
  
    INSERT INTO student (nombre, fecha_nacimiento, direccion, telefono, fecha_ingreso) 
    VALUES 
    ('joe', '1997-03-12', 'Av. Grigotá', '76584256', '2022-05-08'),
    ('migeul', '1999-12-22', 'Av. El Trompillo', '76584256', '2022-05-08'),
    ('alexi', '1997-08-15', 'Calle 3 de Febrero', '76584256', '2022-05-08');
      

CREATE TABLE PaymentPlans (
    idPlanPago INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    montoTotal DECIMAL(10, 2) NOT NULL,
    duracion VARCHAR(50) NOT NULL,
    frecuenciaPago VARCHAR(50) NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL
);

INSERT INTO PaymentPlans (descripcion, montoTotal, duracion, frecuenciaPago, fechaInicio, fechaFin)
VALUES 
    ('Plan Anual Completo', 1200.00, '12 meses', 'Mensual', '2024-01-01', '2024-12-31'),
    ('Plan Semestral', 600.00, '6 meses', 'Mensual', '2024-01-01', '2024-06-30'),
    ('Plan Trimestral', 300.00, '3 meses', 'Mensual', '2024-01-01', '2024-03-31'),
    ('Plan Bimestral', 200.00, '2 meses', 'Mensual', '2024-01-01', '2024-02-29'),
    ('Plan Personalizado', 1500.00, '12 meses', 'Trimestral', '2024-01-01', '2024-12-31');


-- Base actualizada

-- Tabla usuario 1
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre CHAR(50) NOT NULL,
    paterno CHAR(50),
    materno CHAR(50),
    email CHAR(100),
    contrasena CHAR(100)
);

-- Tabla inscripcion 2
CREATE TABLE inscripcion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_inscripcion DATE NOT NULL,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

-- Tabla estudiante 3
CREATE TABLE estudiante (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre CHAR(50) NOT NULL,
    paterno CHAR(50),
    materno CHAR(50),
    fecha_nacimiento DATE,
    direccion CHAR(255)
);

-- Tabla padre_tutor 4
CREATE TABLE padre_tutor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre CHAR(50),
    paterno CHAR(50),
    materno CHAR(50),
    ci INT,
    direccion CHAR(255),
    telefono CHAR(15)
);

--Tabla relacion 5
CREATE TABLE relacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_relacion CHAR(50),
    id_estudiante INT,
    id_padre_tutor INT,
    FOREIGN KEY (id_estudiante) REFERENCES estudiante(id),
    FOREIGN KEY (id_padre_tutor) REFERENCES padre_tutor(id)
);

-- Tabla pago 6
CREATE TABLE pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    monto FLOAT NOT NULL,
    fecha_pago DATE NOT NULL,
    metodo_pago CHAR(50),
    id_estudiante INT,
    FOREIGN KEY (id_estudiante) REFERENCES estudiante(id)
);

-- Tabla maestro 7
CREATE TABLE maestro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre CHAR(50),
    paterno CHAR(50),
    materno CHAR(50),
    telefono CHAR(15)
);

-- Tabla materia 8
CREATE TABLE materia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre CHAR(50) NOT NULL
);

-- Tabla curso 9
CREATE TABLE curso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre CHAR(50) NOT NULL,
    descripcion TEXT
);

-- Tabla materia_gestion 10
CREATE TABLE materia_gestion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bimestre CHAR(50),
    id_materia INT,
    id_gestion INT,
    FOREIGN KEY (id_materia) REFERENCES materia(id),
    FOREIGN KEY (id_gestion) REFERENCES gestion(id)
);

-- Tabla mensualidad 11
CREATE TABLE mensualidad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    precio FLOAT NOT NULL,
    id_gestion INT,
    FOREIGN KEY (id_gestion) REFERENCES gestion(id)
);

-- Tabla cobranza 12
CREATE TABLE cobranza (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    monto_total FLOAT NOT NULL
);

-- Tabla mora 13
CREATE TABLE mora (
    id INT AUTO_INCREMENT PRIMARY KEY,
    monto_pendiente FLOAT NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    descripcion CHAR(255),
    id_cobranza INT,
    FOREIGN KEY (id_cobranza) REFERENCES cobranza(id)
);

-- Tabla detalle_mensualidad 14
CREATE TABLE detalle_mensualidad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cantidad INT NOT NULL,
    id_mora INT,
    FOREIGN KEY (id_mora) REFERENCES mora(id)
);

-- Tabla gestion 15
CREATE TABLE gestion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre CHAR(50) NOT NULL
);

-- Poblada de las tablas

-- usuario 1
INSERT INTO usuario (nombre, paterno, materno, email, contrasena)
VALUES
('Juan', 'Pérez', 'Gómez', 'juan.perez@gmail.com', 'pass123'),
('María', 'Gutiérrez', 'López', 'maria.gutierrez@gmail.com', 'pass456'),
('Carlos', 'Ramírez', 'Torres', 'carlos.ramirez@gmail.com', 'pass789'),
('Ana', 'Martínez', 'Díaz', 'ana.martinez@gmail.com', 'pass1011'),
('Luis', 'Sánchez', 'Hernández', 'luis.sanchez@gmail.com', 'pass1213');

-- inscripcion 2
INSERT INTO inscripcion (fecha_inscripcion, id_usuario)
VALUES
('2024-01-15', 1),
('2024-02-10', 2),
('2024-03-05', 3),
('2024-04-20', 4),
('2024-05-12', 5);

-- estudiante 3
INSERT INTO estudiante (nombre, paterno, materno, fecha_nacimiento, direccion)
VALUES
('Luis', 'Cruz', 'Morales', '2008-05-10', 'Av. Siempre Viva 123'),
('Sofia', 'Vargas', 'Jiménez', '2009-08-20', 'Calle Primavera 456'),
('Diego', 'Navarro', 'López', '2010-03-15', 'Calle Central 789'),
('Lucía', 'Gómez', 'Pérez', '2007-12-25', 'Av. Las Flores 987'),
('Marta', 'Santos', 'Torres', '2008-11-02', 'Calle Norte 654');

-- padre_tutor 4
INSERT INTO padre_tutor (nombre, paterno, materno, ci, direccion, telefono)
VALUES
('José', 'Morales', 'Cruz', 12345678, 'Av. Siempre Viva 123', '5551234'),
('Miguel', 'Jiménez', 'Vargas', 87654321, 'Calle Primavera 456', '5555678'),
('Carla', 'López', 'Navarro', 23456789, 'Calle Central 789', '5559101'),
('Elena', 'Pérez', 'Gómez', 98765432, 'Av. Las Flores 987', '5551122'),
('Roberto', 'Torres', 'Santos', 34567890, 'Calle Norte 654', '5553344');

-- relacion 5
INSERT INTO relacion (tipo_relacion, id_estudiante, id_padre_tutor)
VALUES
('Padre', 1, 1),
('Madre', 2, 2),
('Tío', 3, 3),
('Abuela', 4, 4),
('Hermano', 5, 5);

-- pago 6
INSERT INTO pago (monto, fecha_pago, metodo_pago, id_estudiante)
VALUES
(200.50, '2024-06-15', 'Tarjeta', 1),
(150.00, '2024-07-10', 'Efectivo', 2),
(250.75, '2024-08-05', 'Transferencia', 3),
(180.00, '2024-09-20', 'Tarjeta', 4),
(220.30, '2024-10-12', 'Efectivo', 5);

-- maestro 7
INSERT INTO maestro (nombre, paterno, materno, telefono)
VALUES
('Luis', 'Martínez', 'Díaz', '5556789'),
('Mónica', 'Reyes', 'Gómez', '5552345'),
('Jorge', 'López', 'Ramírez', '5557890'),
('Laura', 'Sánchez', 'Hernández', '5553456'),
('Daniel', 'Torres', 'Santos', '5555678');

-- materia 8
INSERT INTO materia (nombre)
VALUES
('Matemáticas'),
('Ciencias'),
('Historia'),
('Lenguaje'),
('Educación Física');

-- curso 9
INSERT INTO curso (nombre, descripcion)
VALUES
('Curso A', 'Curso para estudiantes de primaria'),
('Curso B', 'Curso para estudiantes de secundaria'),
('Curso C', 'Curso avanzado de ciencias'),
('Curso D', 'Curso intermedio de matemáticas'),
('Curso E', 'Curso básico de historia');

-- materia_gestion 10 **
INSERT INTO materia_gestion (bimestre, id_materia, id_gestion)
VALUES
('Primer Bimestre', 1, 1),
('Segundo Bimestre', 2, 2),
('Tercer Bimestre', 3, 3),
('Cuarto Bimestre', 4, 4),
('Primer Bimestre', 5, 5);

-- gestion 11
INSERT INTO gestion (nombre)
VALUES
('2024 Gestión A'),
('2024 Gestión B'),
('2024 Gestión C'),
('2024 Gestión D'),
('2024 Gestión E');

-- mensualidad 12 ***
INSERT INTO mensualidad (fecha, precio, id_gestion)
VALUES
('2024-01-05', 100.50, 1),
('2024-02-10', 150.00, 2),
('2024-03-15', 200.75, 3),
('2024-04-20', 180.00, 4),
('2024-05-25', 220.30, 5);

-- mora 13 ***
INSERT INTO mora (monto_pendiente, fecha_vencimiento, descripcion, id_cobranza)
VALUES
(50.00, '2024-06-15', 'Retraso en el pago', 1),
(75.25, '2024-07-10', 'Pago atrasado', 2),
(120.00, '2024-08-05', 'Pendiente de abono', 3),
(80.50, '2024-09-20', 'Intereses acumulados', 4),
(100.75, '2024-10-12', 'Pago parcial', 5);

-- cobranza 14
INSERT INTO cobranza (fecha, monto_total)
VALUES
('2024-06-01', 200.50),
('2024-07-01', 150.00),
('2024-08-01', 250.75),
('2024-09-01', 180.00),
('2024-10-01', 220.30);

-- detalle_mensualidad 15 ***
INSERT INTO detalle_mensualidad (cantidad, id_mora)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);


-- materia_gestion, mora, mesulidad, detalle_mensualidad estos insertar de ultimo
