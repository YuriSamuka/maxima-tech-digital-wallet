CREATE EXTENSION  IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS usuario(
    "login" varchar(100) NOT NULL UNIQUE,
    senha varchar(100) NOT NULL,
    nome varchar(100)
);

CREATE TABLE IF NOT EXISTS saldo(
    "login" varchar(100) NOT NULL UNIQUE,
    saldo float(8) NOT NULL
);

CREATE TABLE IF NOT EXISTS movimentacao (
    id_transacao UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    "data" varchar(100) NOT NULL,
    login_origem varchar(100) NOT NULL,
    login_destino varchar(100) NOT NULL,
    valor_transferido float(8) NOT NULL
);