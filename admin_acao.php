<?php
// MÁGICA: Painel Exclusivo do Administrador
require_once 'conexao.php';

$protocolo = strip_tags($_GET['protocolo'] ?? '');
$acao = strip_tags($_GET['acao'] ?? '');
$token = strip_tags($_GET['token'] ?? '');

// Validação de Segurança (Impede curiosos de trocarem o status)
$token_esperado = md5($protocolo . "BritakiAdmin26");
if ($token !== $token_esperado) {
    die("<h2 style='color:red; text-align:center; font-family:sans-serif; margin-top:50px;'>Acesso Negado. Token de Segurança Inválido.</h2>");
}

$mensagem_tela = "";
$cor_tela = "#091045";

// LÓGICA DE CAPTAÇÃO E ANÁLISE
if ($acao === 'captar' || $acao === 'analisar') {
    $novo_estagio = ($acao === 'captar') ? 'Captação' : 'Análise';
    
    $stmt = $conn->prepare("UPDATE relatos_governanca SET estagio = ? WHERE protocolo = ?");
    $stmt->bind_param("ss", $novo_estagio, $protocolo);
    
    if ($stmt->execute()) {
        $mensagem_tela = "✅ O relato {$protocolo} foi atualizado para: <strong>{$novo_estagio}</strong>.<br>O cliente já pode ver essa atualização no site.";
        $cor_tela = ($acao === 'captar') ? "#3b82f6" : "#eab308";
    } else {
        $mensagem_tela = "❌ Erro ao atualizar o banco de dados.";
    }
    $stmt->close();
}

// LÓGICA DE RESPOSTA (Se for POST, ele salva. Se for GET, ele mostra o campo para digitar)
if ($acao === 'responder' && $_SERVER["REQUEST_METHOD"] == "POST") {
    $resposta_admin = strip_tags(trim($_POST["resposta_admin"] ?? ''));
    
    if (!empty($resposta_admin)) {
        $stmt = $conn->prepare("UPDATE relatos_governanca SET estagio = 'Concluído', resposta_admin = ? WHERE protocolo = ?");
        $stmt->bind_param("ss", $resposta_admin, $protocolo);
        if ($stmt->execute()) {
            $mensagem_tela = "✅ Resposta enviada com sucesso! O protocolo {$protocolo} foi marcado como <strong>Concluído</strong> e a mensagem já está visível para o cliente no site.";
            $cor_tela = "#25D366";
            $acao = 'sucesso_resposta'; // Trava o formulário
        }
        $stmt->close();
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ação Administrativa - Britaki</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Poppins', sans-serif; background-color: #f4f7f6; color: #333; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; padding: 20px; }
        .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); max-width: 500px; width: 100%; text-align: center; border-top: 6px solid <?php echo $cor_tela; ?>; }
        .btn { background: #091045; color: white; border: none; padding: 15px 25px; border-radius: 8px; font-weight: 800; cursor: pointer; width: 100%; font-size: 1.1rem; margin-top: 15px; transition: 0.3s;}
        .btn:hover { background: #fc1210; }
        textarea { width: 100%; padding: 15px; border: 2px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 1rem; resize: vertical; margin-bottom: 15px; box-sizing: border-box;}
    </style>
</head>
<body>

<div class="card">
    <h2 style="color: <?php echo $cor_tela; ?>; margin-top: 0;">Painel de Ação Britaki</h2>
    
    <?php if ($mensagem_tela): ?>
        <p style="font-size: 1.1rem; line-height: 1.6; color: #555;"><?php echo $mensagem_tela; ?></p>
        <button onclick="window.close();" class="btn" style="background: #999;">Fechar Janela</button>
    <?php endif; ?>

    <?php if ($acao === 'responder'): ?>
        <p style="color: #666; font-size: 0.95rem;">Digite abaixo a solução que será exibida para o cliente no acompanhamento do site:</p>
        <form method="POST" action="">
            <textarea name="resposta_admin" rows="6" placeholder="Ex: Informamos que o material foi reabastecido e seu problema resolvido..." required></textarea>
            <button type="submit" class="btn" style="background: #25D366;">Enviar Resposta ao Cliente</button>
        </form>
    <?php endif; ?>
</div>

</body>
</html>