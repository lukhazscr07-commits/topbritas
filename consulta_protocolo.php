<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header('Content-Type: application/json; charset=utf-8');

error_reporting(0);

try {
    require_once 'conexao.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        $protocolo = strip_tags(trim($_POST["protocolo"] ?? ''));

        if (empty($protocolo)) {
            echo json_encode(["status" => "erro", "mensagem" => "Por favor, insira o número do protocolo."]);
            exit;
        }

        $stmt = $conn->prepare("SELECT estagio, resposta_admin FROM relatos_governanca WHERE protocolo = ? LIMIT 1");
        
        if (!$stmt) {
            echo json_encode(["status" => "erro", "mensagem" => "A tabela não existe no banco de dados. " . $conn->error]);
            exit;
        }

        $stmt->bind_param("s", $protocolo);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($linha = $resultado->fetch_assoc()) {
            echo json_encode([
                "status" => "sucesso",
                "estagio" => $linha['estagio'],
                "resposta" => $linha['resposta_admin']
            ]);
        } else {
            echo json_encode([
                "status" => "erro", 
                "mensagem" => "Protocolo não encontrado no sistema. Verifique a digitação."
            ]);
        }

        $stmt->close();
        $conn->close();

    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Acesso Negado."]);
    }
} catch (\Throwable $e) {
    echo json_encode(["status" => "erro", "mensagem" => "Erro Fatal Servidor: " . $e->getMessage()]);
}
?>