CREATE TABLE relatos_governanca (
    id INT AUTO_INCREMENT PRIMARY KEY,
    protocolo VARCHAR(50) NOT NULL UNIQUE,
    perfil VARCHAR(50) NOT NULL,
    nome VARCHAR(150),
    email VARCHAR(150),
    cidade VARCHAR(150),
    material VARCHAR(150),
    nota INT DEFAULT 0,
    assunto VARCHAR(100) NOT NULL,
    tipo_mensagem VARCHAR(50) NOT NULL,
    descricao TEXT NOT NULL,
    estagio VARCHAR(50) DEFAULT 'Recebido',
    resposta_admin TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);