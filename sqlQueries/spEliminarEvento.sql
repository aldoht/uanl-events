CREATE PROCEDURE EliminarEvento
    @IdEvento INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar que el Evento exista
    IF NOT EXISTS (SELECT 1 FROM Eventos WHERE IdEvento = @IdEvento)
    BEGIN
        RAISERROR ('El evento especificado no existe.', 16, 1);
        RETURN;
    END

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Eliminar pagos de los boletos asociados a los registros del evento
        DELETE FROM Pagos
        WHERE IdBoleto IN (
            SELECT b.IdBoleto
            FROM Boletos b
            INNER JOIN Registros r ON b.IdRegistro = r.IdRegistro
            WHERE r.IdEvento = @IdEvento
        );

        -- Eliminar registros en la tabla Boletos relacionados con Registros del evento
        DELETE FROM Boletos
        WHERE IdRegistro IN (SELECT IdRegistro FROM Registros WHERE IdEvento = @IdEvento);

        -- Eliminar registros en la tabla Registros relacionados con el evento
        DELETE FROM Registros WHERE IdEvento = @IdEvento;

        -- Eliminar el evento en la tabla Eventos
        DELETE FROM Eventos WHERE IdEvento = @IdEvento;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;

        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END
GO
