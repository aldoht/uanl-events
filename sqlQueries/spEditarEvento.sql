CREATE PROCEDURE EditarEvento
    @IdEvento INT,
    @IdCategoria INT,
    @Nombre VARCHAR(400),
    @Descripcion VARCHAR(5000),
    @Fecha DATE,
    @Poster VARCHAR(1000),
    @Hora TIME,
    @IdUsuario VARCHAR(200),
    @Lugar VARCHAR(400),
    @Costo SMALLMONEY,
    @EsNumerado BIT,
    @Cupo INT,
	@IdDependencia INT
AS
BEGIN
    -- Verificar que el Evento exista
    IF NOT EXISTS (SELECT 1 FROM Eventos WHERE IdEvento = @IdEvento)
    BEGIN
        RAISERROR ('El evento especificado no existe.', 16, 1);
        RETURN;
    END

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

    -- Actualizar el evento en la tabla Eventos
    UPDATE Eventos
    SET 
        IdCategoria = @IdCategoria,
        Nombre = @Nombre,
        Descripcion = @Descripcion,
        Fecha = @Fecha,
        Poster = @Poster,
        Hora = @Hora,
        IdUsuario = @IdUsuario,
        Lugar = @Lugar,
        Costo = @Costo,
        EsNumerado = @EsNumerado,
        Cupo = @Cupo,
		IdDependencia = @IdDependencia
    WHERE IdEvento = @IdEvento;
END
GO
