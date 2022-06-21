CREATE TABLE IF NOT EXISTS usuario(
    "login" varchar(100) NOT NULL PRIMARY KEY,
    senha varchar(100) NOT NULL,
    nome varchar(100)
);

CREATE TABLE IF NOT EXISTS saldo(
    "login" varchar(100) NOT NULL PRIMARY KEY,
    saldo float(8) NOT NULL,
    CONSTRAINT fk_saldo FOREIGN KEY("login") REFERENCES usuario("login")
);

CREATE TABLE IF NOT EXISTS movimentacao (
    id_transacao SERIAL PRIMARY KEY,
    "data" TIMESTAMP NOT NULL DEFAULT NOW(),
    login_origem varchar(100) NOT NULL,
    login_destino varchar(100) NOT NULL,
    valor_transferido float(8) NOT NULL,
    CONSTRAINT fk_movimentacao_1 FOREIGN KEY(login_origem) REFERENCES usuario("login"),
    CONSTRAINT fk_movimentacao_2 FOREIGN KEY(login_origem) REFERENCES usuario("login")
);