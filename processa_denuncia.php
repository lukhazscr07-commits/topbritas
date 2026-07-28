<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Captura os dados com sanitização (prevenção contra ataques XSS)
    $perfil = strip_tags(trim($_POST["perfil"] ?? 'Não informado'));
    $nome = strip_tags(trim($_POST["nome"] ?? ''));
    $contato = strip_tags(trim($_POST["contato"] ?? ''));
    $mensagem = strip_tags(trim($_POST["mensagem"] ?? 'Sem mensagem'));

    // Se o nome vier vazio, define como Anônimo
    if (empty($nome)) {
        $nome = "Anônimo (Sigilo Solicitado)";
    }
    if (empty($contato)) {
        $contato = "Não informado";
    }

    // ========================================================
    // ROTEAMENTO INTELIGENTE DE E-MAIL
    // ========================================================
    if ($perfil === "Colaborador") {
        // E-mail responsável por ouvir funcionários (RH, Diretoria ou Compliance)
        $para = "marketing2@britaki.com.br";
        $assunto = "[CANAL DE ÉTICA] - Relato Interno (Colaborador)";
        $corDestaque = "#091045"; // Azul escuro
    } else {
        // E-mail responsável por ouvir clientes (Marketing, Comercial ou SAC)
        $para = "marketing2@britaki.com.br";
        $assunto = "[FALE CONOSCO] - Mensagem de Cliente";
        $corDestaque = "#fc1210"; // Vermelho Britaki
    }
    
    // Layout HTML elegante e formal para a caixa de entrada da empresa
    $corpo_email = "
    <html>
    <head>
      <title>Relato Recebido</title>
    </head>
    <body style='font-family: Arial, sans-serif; color: #333; line-height: 1.6;'>
      <div style='max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-top: 5px solid {$corDestaque}; border-radius: 8px; padding: 20px;'>
          
          <h2 style='color: {$corDestaque}; margin-top: 0;'>Novo Registro no Canal Britaki</h2>
          <p>Um novo relato foi registrado através da plataforma web. Abaixo estão os detalhes processados:</p>
          
          <table border='0' cellpadding='10' cellspacing='0' style='width: 100%; background: #f9f9f9; border-radius: 5px; margin-bottom: 20px;'>
            <tr>
              <td width='130'><strong>Perfil do Relator:</strong></td>
              <td><strong>{$perfil}</strong></td>
            </tr>
            <tr>
              <td><strong>Identificação:</strong></td>
              <td>{$nome}</td>
            </tr>
            <tr>
              <td><strong>Contato:</strong></td>
              <td>{$contato}</td>
            </tr>
          </table>

          <h3 style='color: #444; border-bottom: 1px solid #ddd; padding-bottom: 5px;'>Descrição da Mensagem:</h3>
          <div style='background: #fff; padding: 15px; border-left: 4px solid {$corDestaque}; font-style: italic; color: #555;'>
             " . nl2br($mensagem) . "
          </div>

          <p style='font-size: 11px; color: #999; margin-top: 30px; text-align: center;'>
            Este e-mail foi gerado automaticamente pelo sistema de integridade do site Britaki.<br>
            A procedência do relator anônimo é protegida por lei.
          </p>
      </div>
    </body>
    </html>
    ";

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: sistema@britaki.com.br\r\n"; 

    if (mail($para, $assunto, $corpo_email, $headers)) {
        echo "Sucesso";
    } else {
        echo "Erro ao enviar";
    }
    
} else {
    echo "Acesso Negado.";
}
?>