USE master;
GO

CREATE DATABASE db;
GO

USE db;
GO

CREATE TABLE tabela (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100),
    idade INT
);
GO

INSERT INTO tabela (nome, idade)
VALUES ('João', 30), ('Maria', 25), ('Pedro', 40);
GO
