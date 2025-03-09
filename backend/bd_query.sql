-- Crear la base de datos
CREATE DATABASE bitacora_trading_bd;
GO
USE bitacora_trading_bd;
GO
--DBCC CHECKIDENT('HistorialAccount', RESEED, 0)
-- Tabla de usuarios
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    email VARCHAR(100),
    usuario VARCHAR(50),
    contrasena VARCHAR(255)
);
GO
-- Tabla de cuentas
CREATE TABLE cuentas (
    id_cuenta INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT,
    tamanio DECIMAL(10, 2),
    empresa VARCHAR(100) NULL,
	fecha_creacion date,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);
GO
-- Tabla de tipos de trades
CREATE TABLE tipos_trades (
    id_tipo_trade INT PRIMARY KEY IDENTITY(1,1),
    tipo_trade VARCHAR(50)
);
GO
-- Tabla de trades
CREATE TABLE trades (
    id_trade INT PRIMARY KEY IDENTITY(1,1),
	id_cuenta INT,
    id_tipo_trade INT,
    fecha_entrada DATETIME,
    fecha_salida DATETIME NULL,
    divisa VARCHAR(10),
    riesgo DECIMAL(10, 2),
    margin DECIMAL(10, 2),
    precio_entrada DECIMAL(10, 2),
    precio_salida DECIMAL(10, 2),
    take_profit DECIMAL(10, 2) NULL,
    stop_loss DECIMAL(10, 2) NULL,
    trade_pips INT,
    porcentaje_pnl DECIMAL(10, 2),
    dinero_pnl DECIMAL(10, 2),
    nota VARCHAR(255) NULL,
	FOREIGN KEY (id_cuenta) REFERENCES cuentas(id_cuenta),
    FOREIGN KEY (id_tipo_trade) REFERENCES tipos_trades(id_tipo_trade)
);
GO
ALTER PROCEDURE CrearTrade
    @divisa VARCHAR(10),
    @id_cuenta INT,
    @id_tipo_trade INT,
    @fecha_entrada DATETIME,
    @fecha_salida DATETIME,
    @riesgo DECIMAL(10,2),
    @margin DECIMAL(10,2),
    @precio_entrada DECIMAL(10,2),
    @precio_salida DECIMAL(10,2),
    @take_profit DECIMAL(10,2),
    @stop_loss DECIMAL(10,2),
    @trade_pips INT,
    @porcentaje_pnl DECIMAL(5,2),
    @dinero_pnl DECIMAL(10,2),
    @nota VARCHAR(255)
AS
BEGIN
    -- Insertar el trade y obtener el número de filas afectadas
    INSERT INTO trades (divisa, id_cuenta, id_tipo_trade, fecha_entrada, fecha_salida, riesgo, margin, precio_entrada, precio_salida, take_profit, stop_loss, trade_pips, porcentaje_pnl, dinero_pnl, nota)
    VALUES (@divisa, @id_cuenta, @id_tipo_trade, @fecha_entrada, @fecha_salida, @riesgo, @margin, @precio_entrada, @precio_salida, @take_profit, @stop_loss, @trade_pips, @porcentaje_pnl, @dinero_pnl, @nota);

END; 
GO
CREATE PROCEDURE EditarTrade
    @id_trade INT,
	@id_cuenta INT,
    @divisa VARCHAR(10),
    @id_tipo_trade INT,
    @fecha_entrada DATETIME,
    @fecha_salida DATETIME,
    @riesgo DECIMAL(10,2),
    @margin DECIMAL(10,2),
    @precio_entrada DECIMAL(10,2),
    @precio_salida DECIMAL(10,2),
    @take_profit DECIMAL(10,2),
    @stop_loss DECIMAL(10,2),
    @trade_pips INT,
    @porcentaje_pnl DECIMAL(5,2),
    @dinero_pnl DECIMAL(10,2),
    @nota VARCHAR(255)
AS
BEGIN
    UPDATE trades
    SET divisa = @divisa, 
        id_tipo_trade = @id_tipo_trade,
        fecha_entrada = @fecha_entrada,
        fecha_salida = @fecha_salida,
        riesgo = @riesgo,
        margin = @margin,
        precio_entrada = @precio_entrada,
        precio_salida = @precio_salida,
        take_profit = @take_profit,
        stop_loss = @stop_loss,
        trade_pips = @trade_pips,
        porcentaje_pnl = @porcentaje_pnl,
        dinero_pnl = @dinero_pnl,
        nota = @nota
    WHERE id_trade = @id_trade;
END;
GO
CREATE PROCEDURE EliminarTrade
    @id_trade INT
AS
BEGIN
    DELETE FROM trades WHERE id_trade = @id_trade;
END;
GO
-- USUARIOS
CREATE PROCEDURE CrearUsuario
    @nombre VARCHAR(100),
    @apellido VARCHAR(100),
    @email VARCHAR(100),
    @usuario VARCHAR(50),
    @contrasena VARCHAR(255)
AS
BEGIN
    -- Validación de correo electrónico único
    IF EXISTS (SELECT 1 FROM usuarios WHERE email = @email)
    BEGIN
        PRINT 'Error: El correo electrónico ya está registrado';
        RETURN;
    END

    -- Insertar usuario
    INSERT INTO usuarios (nombre, apellido, email, usuario, contrasena)
    VALUES (@nombre, @apellido, @email, @usuario, @contrasena);
END;
GO
CREATE PROCEDURE EditarUsuario
    @id_usuario INT,
    @nombre VARCHAR(100) = NULL,
    @apellido VARCHAR(100) = NULL,
    @email VARCHAR(100) = NULL,
    @usuario VARCHAR(50) = NULL,
    @contrasena VARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar si el usuario existe
    IF NOT EXISTS (SELECT 1 FROM usuarios WHERE id_usuario = @id_usuario)
    BEGIN
        PRINT 'Error: El usuario no existe';
        RETURN;
    END

    -- Verificar si el nuevo email ya está en uso por otro usuario (solo si se envía un nuevo email)
    IF @email IS NOT NULL AND EXISTS (SELECT 1 FROM usuarios WHERE email = @email AND id_usuario <> @id_usuario)
    BEGIN
        PRINT 'Error: Este email ya está en uso por otro usuario';
        RETURN;
    END

    -- Verificar si el nuevo nombre de usuario ya está en uso por otro usuario (solo si se envía un nuevo usuario)
    IF @usuario IS NOT NULL AND EXISTS (SELECT 1 FROM usuarios WHERE usuario = @usuario AND id_usuario <> @id_usuario)
    BEGIN
        PRINT 'Error: Este nombre de usuario ya está en uso';
        RETURN;
    END

    -- Actualizar solo los valores proporcionados
    UPDATE usuarios
    SET nombre = ISNULL(@nombre, nombre),
        apellido = ISNULL(@apellido, apellido),
        email = ISNULL(@email, email),
        usuario = ISNULL(@usuario, usuario),
        contrasena = ISNULL(@contrasena, contrasena)
    WHERE id_usuario = @id_usuario;

    PRINT 'Usuario actualizado correctamente';
END;
GO

-- CUENTAS
CREATE PROCEDURE CrearCuenta
    @id_usuario INT,
    @tamano DECIMAL(10, 2),
    @empresa VARCHAR(100) = NULL
AS
BEGIN
    INSERT INTO cuentas (id_usuario, tamanio, empresa, fecha_creacion)
    VALUES (@id_usuario, @tamano, @empresa, GETDATE());
END;
GO
CREATE PROCEDURE EditarCuenta
    @id_cuenta INT,
    @id_usuario INT,
    @tamano DECIMAL(10, 2),
    @empresa VARCHAR(100) = NULL
AS
BEGIN
    UPDATE cuentas
    SET id_usuario = @id_usuario,
        tamanio = @tamano,
        empresa = @empresa
    WHERE id_cuenta = @id_cuenta;
END;
GO
ALTER PROCEDURE EliminarCuenta
    @id_cuenta INT
AS
BEGIN
    IF EXISTS (SELECT * FROM trades where id_cuenta = @id_cuenta) BEGIN
		DELETE FROM trades WHERE id_cuenta = @id_cuenta;
	END
	DELETE FROM cuentas WHERE id_cuenta = @id_cuenta;
END;
GO
CREATE PROCEDURE TraerUsuariosEmail
(@email varchar(100))
as	
	select * from usuarios where email = @email
GO

ALTER PROC PnLWeeklyMonthlyYearly
(@id int, @period int)
AS
	DECLARE @inicio date;

	SET @inicio = 
		CASE
			WHEN @period = 1 THEN DATEADD(WEEK, -1, GETDATE())
			WHEN @period = 2 THEN DATEADD(MONTH, -1, GETDATE())
			WHEN @period = 3 THEN DATEADD(YEAR, -1, GETDATE())
		END;

	IF @id != 0 BEGIN
		SELECT 
		SUM(t.dinero_pnl) AS pnl,
		CONVERT(DATE, t.fecha_entrada) AS fecha
		FROM trades t
		WHERE t.id_cuenta = @id 
		AND t.fecha_entrada BETWEEN @inicio AND GETDATE()
		GROUP BY CONVERT(DATE, t.fecha_entrada)
		ORDER BY fecha DESC;
	END ELSE BEGIN
		SELECT 
		SUM(t.dinero_pnl) AS pnl,
		CONVERT(DATE, t.fecha_entrada) AS fecha
		FROM trades t
		WHERE t.fecha_entrada BETWEEN @inicio AND GETDATE()
		GROUP BY CONVERT(DATE, t.fecha_entrada)
	END

EXEC PnLWeeklyMonthlyYearly 4, 3

ALTER FUNCTION FCPorcentajeWL
(
    @id INT, 
    @period INT
)
RETURNS DECIMAL(15,2)
AS
BEGIN
    DECLARE @wins INT, @total INT, @percentage DECIMAL(15,2), @inicio DATETIME;

    -- Establecer el inicio del rango de fechas según el parámetro @period
    SET @inicio = 
        CASE
            WHEN @period = 1 THEN DATEADD(WEEK, -1, GETDATE()) -- Semana
            WHEN @period = 2 THEN DATEADD(MONTH, -1, GETDATE()) -- Mes
            WHEN @period = 3 THEN DATEADD(YEAR, -1, GETDATE()) -- Año
        END;

   
    IF @id != 0 BEGIN
		SELECT @wins = COUNT(*) 
		FROM trades t
		WHERE id_cuenta = @id
		AND t.fecha_entrada BETWEEN @inicio AND GETDATE()
		AND dinero_pnl > 0;

		SELECT @total = COUNT(*) 
		FROM trades t
		WHERE id_cuenta = @id
		AND t.fecha_entrada BETWEEN @inicio AND GETDATE();
	END
	ELSE BEGIN
		SELECT @wins = COUNT(*) 
		FROM trades t
		WHERE t.fecha_entrada BETWEEN @inicio AND GETDATE()
		AND dinero_pnl > 0;

		SELECT @total = COUNT(*) 
		FROM trades t
		WHERE t.fecha_entrada BETWEEN @inicio AND GETDATE();
	END

    -- Evitar división por cero
    IF @total = 0
        SET @percentage = 0;
    ELSE
        SET @percentage = (@wins * 100.0) / @total;

    -- Retornar el porcentaje
    RETURN @percentage;
END;

CREATE PROCEDURE PorcentajeWL
(@id INT, @period INT)
AS
BEGIN
    SELECT dbo.FCPorcentajeWL(@id, @period) AS percentage_wl;
END;

EXEC PorcentajeWL 4, 1

CREATE PROC PromedioPnl
(@id int)
as
	IF @id != 0 BEGIN
		SELECT 
		AVG(dinero_pnl) AS pnl_avg
		FROM trades
		WHERE id_cuenta = @id
		AND dinero_pnl > 0;
	END ELSE BEGIN
		SELECT 
		AVG(dinero_pnl) AS pnl_avg
		FROM trades
		WHERE dinero_pnl > 0;
	END

EXEC PromedioPnl 2

CREATE PROCEDURE Emocion
(@id INT, @period INT)
AS
BEGIN
    DECLARE @wins INT, @total INT, @percentage DECIMAL(15,2), @emotion varchar(20), @inicio date; 

	SET @inicio = 
		CASE
			WHEN @period = 1 THEN DATEADD(WEEK, -1, GETDATE())
			WHEN @period = 2 THEN DATEADD(MONTH, -1, GETDATE())
			WHEN @period = 3 THEN DATEADD(YEAR, -1, GETDATE())
		END;

    SELECT @percentage = dbo.FCPorcentajeWL(@id, @period);

    SET @emotion =
		CASE
			WHEN @percentage = 0 THEN 'NEUTRAL'
			WHEN @percentage >= 75 THEN 'EXCELENT'
			WHEN @percentage >= 50 AND @percentage < 75 THEN 'GOOD'
			WHEN @percentage >= 25 AND @percentage < 50 THEN 'BAD'
			WHEN @percentage > 0 AND @percentage < 25 THEN 'VERY BAD'
		END;

	SELECT @emotion as Emotion
END;

EXEC Emocion 5, 3

CREATE PROCEDURE CalcularSaldo
    @id_cuenta INT
AS
BEGIN
    DECLARE @saldo_inicial DECIMAL(10, 2);
    DECLARE @saldo_actual DECIMAL(10, 2);
    DECLARE @ganancia_perdida DECIMAL(10, 2);

    SELECT @saldo_inicial = tamanio
    FROM cuentas
    WHERE id_cuenta = @id_cuenta;

    SET @saldo_actual = @saldo_inicial;

    SELECT @ganancia_perdida = SUM(dinero_pnl)
    FROM trades
    WHERE id_cuenta = @id_cuenta;

    SET @saldo_actual = @saldo_inicial + ISNULL(@ganancia_perdida, 0);

    SELECT 
        @saldo_inicial AS saldo_inicial,
        @saldo_actual AS saldo_actual;
END;

EXEC CalcularSaldo 4