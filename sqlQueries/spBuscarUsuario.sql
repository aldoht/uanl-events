CREATE PROCEDURE BuscarUsuario
    @IdUsuario VARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IdUsuario, IdDependencia, Nombre, ApellidoMaterno, ApellidoPaterno, Tel�fono, CorreoUniversitario, IdRol
    FROM Usuarios
    WHERE IdUsuario = @IdUsuario;
END
GO