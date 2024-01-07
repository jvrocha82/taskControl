-- cria tabela
CREATE TABLE chamados (
    id SERIAL PRIMARY KEY,
    numeroChamado VARCHAR(255),
    status VARCHAR(255),
    responsavel INT,
    descricao TEXT,
    dtCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dataConclusao DATE,
    projeto VARCHAR(255),
    criador INT NOT NULL,
    tribunal VARCHAR(255),
    consulta VARCHAR(255),
    linkVersao VARCHAR(255),
    numeroVersao VARCHAR(255),
    segmento VARCHAR(255);
);

    CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);