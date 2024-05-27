USE PIA_BASEDEDATOS;
-- Esto es para la tabla de Permisos:
INSERT INTO Permisos (IdPermiso, Nombre, Descripción) VALUES
(1, 'CrearVerEditar', 'Permiso para crear, ver y editar contenidos'),
(2, 'RegistrarInvitados', 'Permiso para registrar invitados'),
(3, 'Admin', 'Permiso de administrador con acceso total'),
(4, 'Ver', 'Permiso para solo ver contenidos');

-- Y esto es para la tabla de los roles:
INSERT INTO Roles (IdRol, Nombre, IdPermiso) VALUES
(1, 'Administrador general', 3),
(2, 'Administrador por dependencia', 1),
(3, 'Operador', 2),
(4, 'Invitado-cliente', 4),
(5, 'Invitado', 4);

--- Dependencias (Ojo, no son todas)
INSERT INTO Dependencias (IdDependencia, Nombre) VALUES
(1, 'Rectoria'),
(2, 'Facultad de Ciencias Físico Matemáticas'),
(3, 'Facultad de Ingeniería Mecánica y Eléctrica'),
(4, 'Facultad de Ciencias Químicas'),
(5, 'Facultad de Contaduría Pública y Administración'),
(6, 'Facultad de Economía'),
(7, 'Facultad de Enfermería'),
(8, 'Facultad de Ciencias Políticas y Relaciones Internacionales'),
(9, 'Facultad de Arquitectura');


--- Categorias
INSERT INTO Categorias (IdCategoria, Nombre) VALUES
(1, 'Académico'),
(2, 'AFI'),
(3, 'Becas'),
(4, 'Caminata'),
(5, 'Campamento'),
(6, 'Campaña'),
(7, 'Cátedra'),
(8, 'Ceremonia'),
(9, 'Certamen'),
(10, 'Certificación'),
(11, 'Ciclo de películas'),
(12, 'Clase magistral'),
(13, 'Coloquio'),
(14, 'Concurso'),
(15, 'Conferencia'),
(16, 'Congreso'),
(17, 'Convocatoria'),
(18, 'Cultura'),
(19, 'Cumbre'),
(20, 'Curso'),
(21, 'Danza'),
(22, 'Deportes'),
(23, 'Diálogo'),
(24, 'Diplomado'),
(25, 'Emprendimiento'),
(26, 'Encuentro'),
(27, 'Espectáculo'),
(28, 'Espectáculo Danza'),
(29, 'Eventos'),
(30, 'Exposición'),
(31, 'Feria'),
(32, 'Jornada'),
(33, 'Masterclass'),
(34, 'Musical'),
(35, 'Ópera'),
(36, 'Pláticas'),
(37, 'Premio'),
(38, 'Presentación'),
(39, 'Programa'),
(40, 'Recorridos'),
(41, 'Responsabilidad Social'),
(42, 'Reunión'),
(43, 'Seminario'),
(44, 'Sesión Informativa'),
(45, 'Simposio'),
(46, 'Sorteo'),
(47, 'Taller'),
(48, 'Teatro'),
(49, 'Torneo'),
(50, 'Transmisión'),
(51, 'Turismo'),
(52, 'Webinar');


--- Eventos (Son diez en total)
--- Esto es un "usuario" con el IdUsuario 'user1'
INSERT INTO Usuarios (IdUsuario, IdDependencia, Nombre, ApellidoMaterno, ApellidoPaterno, Teléfono, CorreoUniversitario, IdRol) VALUES
('user1', 1, 'Juan', 'Pérez', 'Hernández', '1234567890', 'juan.perez@gmail.com', 1);

INSERT INTO Eventos (IdEvento, IdCategoria, Nombre, Descripcion, Fecha, Poster, Hora, IdUsuario, Lugar, Costo, EsNumerado, Cupo, IdDependencia) VALUES
(1, 1, 'Evento 1', 'Descripción del evento 1', '2024-06-01', 'poster1.jpg', '10:00:00', 'user1', 'Lugar 1', 100.00, 1, 50, 1),
(2, 2, 'Evento 2', 'Descripción del evento 2', '2024-06-02', 'poster2.jpg', '11:00:00', 'user1', 'Lugar 2', 150.00, 0, 100, 2),
(3, 3, 'Evento 3', 'Descripción del evento 3', '2024-06-03', 'poster3.jpg', '12:00:00', 'user1', 'Lugar 3', 200.00, 1, 150, 3),
(4, 4, 'Evento 4', 'Descripción del evento 4', '2024-06-04', 'poster4.jpg', '13:00:00', 'user1', 'Lugar 4', 250.00, 0, 200, 4),
(5, 5, 'Evento 5', 'Descripción del evento 5', '2024-06-05', 'poster5.jpg', '14:00:00', 'user1', 'Lugar 5', 300.00, 1, 250, 5),
(6, 6, 'Evento 6', 'Descripción del evento 6', '2024-06-06', 'poster6.jpg', '15:00:00', 'user1', 'Lugar 6', 350.00, 0, 300, 6),
(7, 7, 'Evento 7', 'Descripción del evento 7', '2024-06-07', 'poster7.jpg', '16:00:00', 'user1', 'Lugar 7', 400.00, 1, 350, 7),
(8, 8, 'Evento 8', 'Descripción del evento 8', '2024-06-08', 'poster8.jpg', '17:00:00', 'user1', 'Lugar 8', 450.00, 0, 400, 8),
(9, 9, 'Evento 9', 'Descripción del evento 9', '2024-06-09', 'poster9.jpg', '18:00:00', 'user1', 'Lugar 9', 500.00, 1, 450, 9),
(10, 10, 'Evento 10', 'Descripción del evento 10', '2024-06-10', 'poster10.jpg', '19:00:00', 'user1', 'Lugar 10', 550.00, 0, 500, 1);