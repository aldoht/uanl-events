CREATE PROCEDURE InsertarEvento
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
    SELECT @UltimoIdEvento = IdEvento
    FROM Eventos
    WHERE IdEvento = (SELECT MAX(IdEvento) FROM Eventos) + 1;
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
END
GO
