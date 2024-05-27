CREATE TABLE Categorias (
    IdCategoria INT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Dependencias (
    IdDependencia INT PRIMARY KEY,
    Nombre VARCHAR(200) NOT NULL
);

CREATE TABLE Permisos (
    IdPermiso INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Descripción VARCHAR(5000) NOT NULL
);

CREATE TABLE Roles (
    IdRol INT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    IdPermiso INT NOT NULL,
    FOREIGN KEY (IdPermiso) REFERENCES Permisos(IdPermiso)
);

CREATE TABLE Usuarios (
    IdUsuario VARCHAR(200) PRIMARY KEY,
    IdDependencia INT NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    ApellidoMaterno VARCHAR(100) NOT NULL,
    ApellidoPaterno VARCHAR(100) NOT NULL,
    Teléfono CHAR(10) NOT NULL,
    CorreoUniversitario VARCHAR(200) NOT NULL,
    IdRol INT NOT NULL,
    FOREIGN KEY (IdDependencia) REFERENCES Dependencias(IdDependencia),
    FOREIGN KEY (IdRol) REFERENCES Roles(IdRol)
);


CREATE TABLE Eventos (
    IdEvento INT PRIMARY KEY,
    IdCategoria INT NOT NULL,
    Nombre VARCHAR(400) NOT NULL,
    Descripcion VARCHAR(5000) NOT NULL,
    Fecha DATE NOT NULL,
    Poster VARCHAR(1000) NOT NULL,
    Hora TIME NOT NULL,
    IdUsuario VARCHAR(200) NOT NULL,
    Lugar VARCHAR(400) NOT NULL,
    Costo SMALLMONEY NOT NULL,
    EsNumerado BIT NOT NULL,
    Cupo INT NOT NULL,
	IdDependencia INT NOT NULL,
    FOREIGN KEY (IdCategoria) REFERENCES Categorias(IdCategoria),
    FOREIGN KEY (IdUsuario) REFERENCES Usuarios(IdUsuario),
	FOREIGN KEY (IdDependencia) REFERENCES Dependencias(IdDependencia)
);

CREATE TABLE Asientos (
    IdAsiento INT PRIMARY KEY,
    Asiento VARCHAR(100) NOT NULL
);

CREATE TABLE Registros (
    IdRegistro INT PRIMARY KEY,
    IdEvento INT NOT NULL,
    Nombre VARCHAR(200) NOT NULL,
    ApellidoMaterno VARCHAR(200) NOT NULL,
    ApellidoPaterno VARCHAR(200) NOT NULL,
    Teléfono CHAR(10) NOT NULL,
    CorreoElectrónico VARCHAR(200) NOT NULL,
    IdDependencia INT NOT NULL,
    IdAsiento INT NOT NULL DEFAULT 1,
    FOREIGN KEY (IdEvento) REFERENCES Eventos(IdEvento),
    FOREIGN KEY (IdDependencia) REFERENCES Dependencias(IdDependencia),
    FOREIGN KEY (IdAsiento) REFERENCES Asientos(IdAsiento)
);

CREATE TABLE Boletos (
    IdBoleto INT PRIMARY KEY,
    IdRegistro INT NOT NULL,
    CodigoQR VARCHAR(1000) NOT NULL,
    Asistencia BIT NOT NULL DEFAULT 0,
    Imagen VARCHAR(1000) NOT NULL,
    FOREIGN KEY (IdRegistro) REFERENCES Registros(IdRegistro)
);

CREATE TABLE MetodosPago (
    IdMetodoPago INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Tipo INT NOT NULL,
    CorreoPaypal VARCHAR(200),
    NumeroTarjeta VARCHAR(20),
    FechaVencimiento DATE,
    CVV CHAR(3)
);

CREATE TABLE Pagos (
    IdPago INT PRIMARY KEY,
    IdBoleto INT NOT NULL,
    IdMetodoPago INT NOT NULL,
    FechaPago DATE NOT NULL,
    FOREIGN KEY (IdBoleto) REFERENCES Boletos(IdBoleto),
    FOREIGN KEY (IdMetodoPago) REFERENCES MetodosPago(IdMetodoPago)
);