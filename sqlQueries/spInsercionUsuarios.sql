CREATE PROCEDURE InsertarUsuario
    @IdUsuario VARCHAR(200),
    @IdDependencia INT,
    @Nombre VARCHAR(100),
    @ApellidoMaterno VARCHAR(100),
    @ApellidoPaterno VARCHAR(100),
    @Telefono CHAR(10),
    @CorreoUniversitario VARCHAR(200),
    @IdRol INT
AS
BEGIN
    -- Verificar que la Categoría exista
    IF NOT EXISTS (SELECT 1 FROM Categorias WHERE IdCategoria = @IdCategoria)
    BEGIN
        RAISERROR ('La categoría especificada no existe.', 16, 1);
        RETURN;
    END

    -- Verificar que el Usuario exista
    IF NOT EXISTS (SELECT 1 FROM Usuarios WHERE IdUsuario = @IdUsuario)
    BEGIN
        RAISERROR ('El usuario especificado no existe.', 16, 1);
        RETURN;
    END

    -- Insertar el nuevo evento en la tabla Eventos
    DECLARE @UltimoIdEvento INT;

    -- Obtener el último IdEvento
    SELECT @UltimoIdEvento = ISNULL(MAX(IdEvento), 0) + 1 FROM Eventos;

    INSERT INTO Eventos (
		IdEvento,
        IdCategoria,
        Nombre,
        Descripcion,
        Fecha,
        Poster,
        Hora,
        IdUsuario,
        Lugar,
        Costo,
        EsNumerado,
        Cupo,
		IdDependencia
    ) VALUES (
		@UltimoIdEvento,
        @IdCategoria,
        @Nombre,
        @Descripcion,
        @Fecha,
        @Poster,
        @Hora,
        @IdUsuario,
        @Lugar,
        @Costo,
        @EsNumerado,
        @Cupo,
		@IdDependencia
    );
	SELECT @UltimoIdEvento AS UltimoIdEvento;
END
GO
