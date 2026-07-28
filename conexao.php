<?php
// Oculta alertas nativos do PHP
error_reporting(0);

// MÁGICA: Impede o PHP 8.1+ de gerar Erro 500 ao encontrar problemas no banco
mysqli_report(MYSQLI_REPORT_OFF);

// Configurações do Banco de Dados HostGator
$host = "localhost"; 
$usuario = "topbr592_morelat"; 
$senha = "x*MX^QMrkO{~";     
$banco = "topbr592_morelat"; 

$conn = @new mysqli($host, $usuario, $senha, $banco);

if ($conn->connect_error) {
    header('Content-Type: application/json');
    echo json_encode([
        "status" => "erro", 
        "mensagem" => "Falha no Banco de Dados: " . $conn->connect_error
    ]);
    exit;
}

$conn->set_charset("utf8mb4");
?>