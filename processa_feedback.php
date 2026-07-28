<?php
// Permite que o front-end se comunique com este arquivo
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

// Verifica se os dados chegaram corretamente via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Captura e limpa os dados enviados pelo cliente
    $nota = strip_tags(trim($_POST["nota"] ?? '0'));
    $cidade = strip_tags(trim($_POST["cidade"] ?? 'Não informada'));
    $material = strip_tags(trim($_POST["material"] ?? 'Não informado'));
    $mensagem_cliente = strip_tags(trim($_POST["mensagem"] ?? 'Sem mensagem'));

    // ========================================================
    // INTELIGÊNCIA DE ROTEAMENTO DE E-MAIL
    // ========================================================
    if ($material === "Brita" || $material === "Areia Industrial") {
        $para = "marketing2@britaki.com.br";
    } else if ($material === "Concreto Usinado") {
        $para = "marketing@britaki.com.br";
    } else {
        // Se o cliente escolher "Outros" ou "Ainda não comprei", manda para os dois
        $para = "marketing@britaki.com.br, marketing2@britaki.com.br"; 
    }
    
    $assunto = "Avaliação de Atendimento - " . $material . " (" . $nota . " Estrelas)";
    
    // Layout institucional do E-mail
    $corpo_email = "
    <html>
    <head>
      <title>Nova Avaliação</title>
    </head>
    <body style='font-family: Arial, sans-serif; color: #333;'>
      <h2 style='color: rgb(0, 0, 64); border-bottom: 2px solid #fc1210; padding-bottom: 10px;'>Nova Avaliação Recebida!</h2>
      <p>Um cliente acabou de avaliar o atendimento da Britaki. Confira os detalhes:</p>
      
      <table border='0' cellpadding='12' cellspacing='0' style='background: #f4f7f6; width: 100%; max-width: 600px; border-radius: 8px;'>
        <tr>
          <td width='120'><strong>Nota:</strong></td>
          <td style='color: #FFD700; font-size: 18px; font-weight: bold;'>{$nota} / 5 Estrelas</td>
        </tr>
        <tr>
          <td><strong>Cidade:</strong></td>
          <td>{$cidade}</td>
        </tr>
        <tr>
          <td><strong>Material:</strong></td>
          <td>{$material}</td>
        </tr>
        <tr>
          <td valign='top'><strong>Comentário:</strong></td>
          <td style='background: #fff; border-left: 4px solid #fc1210; padding: 10px; font-style: italic;'>{$mensagem_cliente}</td>
        </tr>
      </table>
      <p style='font-size: 12px; color: #999; margin-top: 30px;'>
        Mensagem enviada automaticamente pelo sistema web Britaki.
      </p>
    </body>
    </html>
    ";

    // Cabeçalhos essenciais para formatar HTML e evitar caixa de Spam
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: sistema@britaki.com.br\r\n"; // E-mail que vai disparar (pode ser fictício do seu domínio)

    // Comando de envio nativo do servidor
    if (mail($para, $assunto, $corpo_email, $headers)) {
        echo "Sucesso";
    } else {
        echo "Erro ao tentar enviar o e-mail.";
    }
    
} else {
    echo "Acesso direto a este arquivo não é permitido.";
}
?>