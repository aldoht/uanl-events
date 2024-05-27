CREATE PROCEDURE InsertarBoleto
    @IdRegistro INT,
    @CodigoQR VARCHAR(1000),
    @Asistencia BIT,
    @Imagen VARCHAR(1000)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Boletos (IdRegistro, CodigoQR, Asistencia, Imagen)
    VALUES (@IdRegistro, @CodigoQR, @Asistencia, @Imagen);
END
GO
