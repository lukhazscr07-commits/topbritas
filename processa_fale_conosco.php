<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header('Content-Type: application/json; charset=utf-8');

error_reporting(0);

try {
    // Inclui a conexão segura com o banco de dados (HostGator)
    require_once 'conexao.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        // 1. CAPTURA E SANITIZAÇÃO DE DADOS (Blindagem básica)
        $perfil = strip_tags(trim($_POST["perfil"] ?? 'Não classificado'));
        $empresa = strip_tags(trim($_POST["empresa"] ?? 'Não informada')); 
        $assunto = strip_tags(trim($_POST["assunto"] ?? 'Não definido'));
        $tipoMensagem = strip_tags(trim($_POST["tipoMensagem"] ?? 'Não classificado'));
        $descricao = strip_tags(trim($_POST["descricao"] ?? 'Sem texto'));
        $email_cliente = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
        $nome = strip_tags(trim($_POST["nome"] ?? ''));
        
        // Dados exclusivos de Cliente (para roteamento e banco)
        $cidade = strip_tags(trim($_POST["cidade"] ?? 'Não informado'));
        $material = strip_tags(trim($_POST["material_comprado"] ?? 'Não informado'));
        $nota = intval($_POST["nota"] ?? 0);

        // 2. GERAÇÃO DO PROTOCOLO ÚNICO (ex: BRK-20231027-A7X9)
        $data_hoje = date('Ymd');
        $hash_aleatorio = strtoupper(substr(md5(uniqid(rand(), true)), 0, 6));
        $numero_protocolo = "BRK-{$data_hoje}-{$hash_aleatorio}";

        // 3. TRATAMENTO DE IDENTIFICAÇÃO (Para Anônimo)
        if (empty($email_cliente)) {
            $identificacao = "<span style='color: #d00f0d; font-weight: bold;'>REMETENTE ANÔNIMO (Rastreio Bloqueado)</span>";
            $email_reply = "no-reply@britaki.com.br";
            $nome_db = "Anônimo";
        } else {
            $identificacao = $email_cliente;
            $email_reply = $email_cliente;
            $nome_db = $nome;
        }

        $estagio_inicial = "Envio";
        
        // Array para guardar os caminhos dos até 3 arquivos
        $caminhos_evidencia = [null, null, null];

        // ========================================================
        // 4. PROCESSAMENTO DE MÚLTIPLOS UPLOADS (Até 3)
        // ========================================================
        if (isset($_FILES['evidencias'])) {
            $total_arquivos = count($_FILES['evidencias']['name']);
            $diretorio_destino = 'uploads/';
            
            if (!is_dir($diretorio_destino)) {
                mkdir($diretorio_destino, 0755, true);
            }

            // Limita a varredura a no máximo 3 arquivos, caso haja falha no JS
            $limite = min(3, $total_arquivos);

            for ($i = 0; $i < $limite; $i++) {
                if ($_FILES['evidencias']['error'][$i] === UPLOAD_ERR_OK) {
                    $extensao = strtolower(pathinfo($_FILES['evidencias']['name'][$i], PATHINFO_EXTENSION));
                    $nome_arquivo_seguro = $numero_protocolo . '_anexo' . ($i + 1) . '_' . uniqid() . '.' . $extensao;
                    $caminho_completo = $diretorio_destino . $nome_arquivo_seguro;
                    
                    if (move_uploaded_file($_FILES['evidencias']['tmp_name'][$i], $caminho_completo)) {
                        $caminhos_evidencia[$i] = $caminho_completo;
                    }
                }
            }
        }

        // ========================================================
        // 5. SALVANDO NO BANCO DE DADOS (CSC Support como Gestor)
        // ========================================================
        $query = "INSERT INTO relatos_governanca (protocolo, perfil, empresa, nome, email, cidade, material, nota, assunto, tipo_mensagem, descricao, estagio, evidencia, evidencia2, evidencia3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        
        if (!$stmt) {
            ob_end_clean();
            echo json_encode(["status" => "erro", "mensagem" => "Erro SQL: " . $conn->error]);
            exit;
        }

        // 15 Parâmetros (14 strings 's', 1 inteiro 'i' na nota) -> sssssssisssssss
        $stmt->bind_param(
            "sssssssisssssss", 
            $numero_protocolo, $perfil, $empresa, $nome_db, $email_cliente, 
            $cidade, $material, $nota, $assunto, $tipoMensagem, 
            $descricao, $estagio_inicial, 
            $caminhos_evidencia[0], $caminhos_evidencia[1], $caminhos_evidencia[2]
        );
        
        if (!$stmt->execute()) {
            echo json_encode(["status" => "erro", "mensagem" => "Falha ao gravar no banco. Erro: " . $stmt->error]);
            $stmt->close();
            $conn->close();
            exit;
        }
        $stmt->close();

        // ========================================================
        // 6. ROTEAMENTO DINÂMICO DE E-MAIL (NOVA LÓGICA)
        // ========================================================
        // E-mail padrão de marketing que sempre recebe cópia
        $marketing_email = "marketing@britaki.com.br"; // <-- COLOQUE AQUI O E-MAIL REAL DO MARKETING
        
        // Array para armazenar os destinatários específicos
        $destinatarios_especificos = [];
        
        // Lógica de roteamento baseada no perfil e material
        if ($perfil === 'Colaborador') {
            // E-mail específico para o canal de colaboradores
            $destinatarios_especificos[] = "saritacolombimorelato@mineracaosaovicente.com.br";
        } elseif ($perfil === 'Cliente') {
            
            // Lógica baseada na Empresa (chegada via POST) e Material
            switch ($empresa) {
                case 'Britaki':
                    if ($material === 'Brita' || $material === 'Areia Industrial') {
                        $destinatarios_especificos[] = "comercial2@mineracaosaovicente.com.br";
                    }
                    break;
                case 'Britaki Concreto':
                    if ($material === 'Concreto Usinado') {
                        $destinatarios_especificos[] = "comercial1@britaki.com.br, filipe@mineracaosaovicente.com.br";
                    }
                    break;
                case 'Superbritas':
                    $destinatarios_especificos[] = "gerencia1@superbritas.com.br";
                    break;
                case 'Topbritas':
                    $destinatarios_especificos[] = "gerencia1@topbritas.com.br";
                    break;
                case 'Pedreira Vale Verde':
                    $destinatarios_especificos[] = "adm1@pedreiravaleverde.com.br";
                    break;
                case 'Pedra Forte':
                    $destinatarios_especificos[] = "adm1@mineracaosaovicente.com.br";
                    break;
                case 'Mineração São Vicente':
                    $destinatarios_especificos[] = "adm1@mineracaosaovicente.com.br";
                    break;
                case 'CSC Support':
                    $destinatarios_especificos[] = "juridico1@britaki.com.br";
                    break;
                case 'CSC Automecânico':
                    $destinatarios_especificos[] = "oficina1@britaki.com.br";
                    break;
            }
        }
        // Nota: Se o perfil não for 'Cliente' nem 'Colaborador', 
        // ou se for cliente Britaki/Britaki Concreto mas material diferente dos mapeados,
        // apenas o marketing receberá.

        // Cria a lista final de destinatários combinando marketing e e-mails específicos
        $destinatarios_completos = array_merge([$marketing_email], $destinatarios_especificos);
        
        // Transforma o array em uma string separada por vírgulas para a função mail()
        $para = implode(", ", $destinatarios_completos);
        
        // ========================================================
        // 7. MONTAGEM E ENVIO DO E-MAIL (HTML)
        // ========================================================
        $corPainel = "#001F54"; // Azul escuro CSC (Gestor Independente)
        $tag = "[PORTAL CSC]";
        
        // Configurações visuais condicional se for Denúncia
        if ($tipoMensagem === 'Denúncia') {
            $corPainel = "#d00f0d"; // Vermelho Alerta
            $tag = "[ALERTA DE DENÚNCIA - SIGILO]";
        }

        $assunto_email = "{$tag} Protocolo: {$numero_protocolo} - {$empresa}";
        $estrelas_visuais = str_repeat("★", $nota) . str_repeat("☆", 5 - $nota);
        
        // URLs base para os links de anexo e ações administrativas
        $protocolo_http = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? "https" : "http";
        $base_url = $protocolo_http . "://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']);

        // Monta os botões HTML para cada anexo que foi enviado
        $link_evidencia_html = "";
        foreach ($caminhos_evidencia as $index => $caminho) {
            if ($caminho) {
                $num_anexo = $index + 1;
                $url_arquivo = $base_url . "/" . $caminho;
                $link_evidencia_html .= "
                <tr style='background-color: #ffe4e4;'>
                    <td style='border-bottom: 1px solid #eee; color: #d00f0d;'><strong>Anexo {$num_anexo}:</strong></td>
                    <td style='border-bottom: 1px solid #eee;'>
                        <a href='{$url_arquivo}' target='_blank' style='display: inline-block; background-color: #FF7A00; color: white; text-decoration: none; padding: 8px 15px; border-radius: 5px; font-weight: bold;'>📁 Visualizar Anexo {$num_anexo}</a>
                    </td>
                </tr>";
            }
        }
        
        // Bloco HTML condicional para dados de Cliente
        $bloco_cliente_html = "";
        if ($perfil === "Cliente") {
            $bloco_cliente_html = "
            <tr><td style='border-bottom: 1px solid #eee;'><strong>Cidade:</strong></td><td style='border-bottom: 1px solid #eee;'>{$cidade}</td></tr>
            <tr style='background-color: #fafafa;'><td style='border-bottom: 1px solid #eee;'><strong>Material/Serviço:</strong></td><td style='border-bottom: 1px solid #eee;'>{$material}</td></tr>
            <tr><td style='border-bottom: 1px solid #eee;'><strong>Avaliação:</strong></td><td style='border-bottom: 1px solid #eee; font-size: 20px; color: #FF7A00;'>{$estrelas_visuais} ({$nota}/5)</td></tr>";
        }

        // Token de segurança para ações administrativas (md5 do protocolo + chave secreta)
        $token_seguranca = md5($numero_protocolo . "BritakiAdmin26"); 

        // URLs administrativas com token de segurança
        $link_captar = "{$base_url}/admin_acao.php?protocolo={$numero_protocolo}&acao=captar&token={$token_seguranca}";
        $link_analisar = "{$base_url}/admin_acao.php?protocolo={$numero_protocolo}&acao=analisar&token={$token_seguranca}";
        $link_responder = "{$base_url}/admin_acao.php?protocolo={$numero_protocolo}&acao=responder&token={$token_seguranca}";

        $corpo_email = "
        <html><body style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; background-color: #f4f7f6; padding: 20px;'>
          <div style='max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #ddd; border-top: 6px solid {$corPainel}; border-radius: 8px; padding: 30px;'>
              <h2 style='color: {$corPainel}; margin-top: 0;'>Relato Recebido no Portal de Integridade (Morelato/Britaki)</h2>
              <p>Uma nova manifestação foi registrada através do portal web e requer atenção da equipe responsável definida nas regras de governança.</p>
              
              <div style='background: #eef2f5; padding: 10px 15px; border-radius: 6px; margin-bottom: 25px;'>
                  <strong>Número de Protocolo:</strong> <span style='font-size: 1.1rem; color: #FF7A00; font-weight: bold;'>{$numero_protocolo}</span><br>
                  <strong>Status Inicial:</strong> Encaminhado para Triagem/Captação
              </div>

              <table border='0' cellpadding='12' cellspacing='0' style='width: 100%; border: 1px solid #eee; margin-bottom: 25px;'>
                <tr style='background-color: #fafafa;'><td width='150' style='border-bottom: 1px solid #eee;'><strong>Empresa Destino:</strong></td><td style='border-bottom: 1px solid #eee; font-weight: bold; color: {$corPainel};'>{$empresa}</td></tr>
                <tr><td style='border-bottom: 1px solid #eee;'><strong>Classificação:</strong></td><td style='border-bottom: 1px solid #eee; font-weight: bold;'>{$tipoMensagem}</td></tr>
                <tr style='background-color: #fafafa;'><td style='border-bottom: 1px solid #eee;'><strong>Assunto Raiz:</strong></td><td style='border-bottom: 1px solid #eee;'>{$assunto}</td></tr>
                <tr><td style='border-bottom: 1px solid #eee;'><strong>Contato:</strong></td><td style='border-bottom: 1px solid #eee;'>{$identificacao}</td></tr>
                <tr style='background-color: #fafafa;'><td style='border-bottom: 1px solid #eee;'><strong>Perfil:</strong></td><td style='border-bottom: 1px solid #eee;'>{$perfil}</td></tr>
                {$bloco_cliente_html}
                {$link_evidencia_html}
              </table>
              <h3 style='color: #444; font-size: 1.1rem; margin-bottom: 10px;'>Termo Descritivo:</h3>
              <div style='background: #f9f9f9; padding: 20px; border-left: 4px solid {$corPainel}; font-style: italic; color: #555; margin-bottom: 30px;'>" . nl2br($descricao) . "</div>

              <div style='background: #001F54; padding: 25px; border-radius: 8px; text-align: center;'>
                  <h3 style='color: white; margin-top: 0; font-size: 1.1rem;'>AÇÕES DO ADMINISTRADOR (CSC)</h3>
                  <p style='color: #aaa; font-size: 0.9rem; margin-bottom: 20px;'>Clique nos botões abaixo para atualizar o status do cliente em tempo real no site.</p>
                  
                  <a href='{$link_captar}' style='display: inline-block; background-color: #3b82f6; color: white; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-weight: bold; margin: 5px;'>1. Captar Relato</a>
                  
                  <a href='{$link_analisar}' style='display: inline-block; background-color: #eab308; color: white; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-weight: bold; margin: 5px;'>2. Iniciar Análise</a>
                  
                  <br><br>
                  <a href='{$link_responder}' style='display: inline-block; background-color: #25D366; color: white; text-decoration: none; padding: 15px 25px; border-radius: 5px; font-weight: bold; width: 80%; text-transform: uppercase;'>3. Responder (Concluir)</a>
              </div>
          </div>
        </body></html>";

        // Cabeçalhos para e-mail HTML com codificação UTF-8
        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8\r\n";
        $headers .= "From: governanca@britaki.com.br\r\n"; 
        $headers .= "Reply-To: {$email_reply}\r\n";

        // Envia o e-mail para os destinatários dinâmicos definidos
        $email_enviado = mail($para, $assunto_email, $corpo_email, $headers);
        
        ob_end_clean();
        if ($email_enviado) {
            // Retorna o protocolo gerado para o front-end exibir a tela de sucesso
            echo json_encode(["status" => "sucesso", "protocolo" => $numero_protocolo]);
        } else {
            // Retorna erro se o e-mail não pôde ser enviado, mesmo gravando no banco
            echo json_encode(["status" => "erro", "mensagem" => "Relato salvo, mas bloqueio de servidor ao disparar notificação por email."]);
        }
        $conn->close();

    } else {
        // Bloqueia acesso direto via GET
        ob_end_clean();
        echo json_encode(["status" => "erro", "mensagem" => "Acesso Negado."]);
    }
} catch (\Throwable $e) {
    // Tratamento de erros fatais do servidor
    ob_end_clean();
    echo json_encode(["status" => "erro", "mensagem" => "Erro Fatal Servidor: " . $e->getMessage()]);
}
?>