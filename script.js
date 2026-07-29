/* ========================================================== */
/* --- LÓGICA DO CHAT - VICENTINHO (TOPBRITAS)            --- */
/* ========================================================== */

// Defina aqui o número de WhatsApp comercial da pedreira (com DDI e DDD)
const whatsappVendas = "5575982129181"; 

let chatMemory = { 
    fluxo: null,            
    material: null, 
    regiao: null,
    esperandoCidade: false, 
    cidadeDigitada: ""      
};

// NOVA VARIÁVEL: Controla se o bot já deu "oi"
let chatIniciado = false; 

// Funções Globais do Chat
function toggleChat() {
    const chatWindow = document.getElementById('caixa-chat');
    const inputChat = document.querySelector('.chat-input input');
    
    if(chatWindow) {
        chatWindow.classList.toggle('ativo');

        if (chatWindow.classList.contains('ativo')) {
            // Esconde o número 1 quando o chat abre
            const badge = document.getElementById('badge-chat');
            if(badge) badge.style.display = 'none';
             
            // FOCA IMEDIATAMENTE no campo de texto para FORÇAR o teclado a subir no celular
            if(inputChat) {
                inputChat.focus();
            }
            
            // 1. Se for a primeira vez abrindo, o bot manda mensagem sozinho!
            if (!chatIniciado) {
                // Aciona a palavra 'oi' invisivelmente no cérebro do bot
                setTimeout(() => {
                    const saudacaoInicial = getVicentinhoResponse('oi');
                    addMessageToChat(saudacaoInicial, 'bot-message');
                    chatIniciado = true; // Marca que já iniciou para não repetir
                }, 400); // 400 milissegundos de delay para parecer humano
            }
        } else {
            // Se o cliente fechou o chat, tira o foco do campo para o teclado baixar e não atrapalhar a tela
            if(inputChat) {
                inputChat.blur();
            }
        }
    }
}
function sendChatMessage() {
    // Usando querySelector para garantir que pega o input dentro do chat
    const input = document.querySelector('.chat-input input');
    if(!input) return;

    const text = input.value.trim();
    if (text === '') return;
    
    addMessageToChat(text, 'user-message');
    input.value = ''; 
    
    setTimeout(() => {
        const reply = getVicentinhoResponse(text);
        addMessageToChat(reply, 'bot-message');
    }, 800); 
}

function handleChatOption(optionText) {
    addMessageToChat(optionText, 'user-message');
    setTimeout(() => {
        const reply = getVicentinhoResponse(optionText);
        addMessageToChat(reply, 'bot-message');
    }, 800);
}

// Construtor Visual das Mensagens do Chat
function addMessageToChat(text, className) {
    const messagesContainer = document.querySelector('.chat-body');
    if(!messagesContainer) return;

    const msgDiv = document.createElement('div');
    msgDiv.style.marginBottom = '15px';
    msgDiv.style.padding = '10px';
    msgDiv.style.borderRadius = '8px';
    msgDiv.style.maxWidth = '90%';
    msgDiv.style.fontSize = '14px';
    msgDiv.style.lineHeight = '1.4';

    if (className === 'user-message') {
        msgDiv.style.backgroundColor = '#f0f0f0';
        msgDiv.style.color = '#333';
        msgDiv.style.marginLeft = 'auto';
        msgDiv.style.borderBottomRightRadius = '0';
    } else {
        msgDiv.style.backgroundColor = '#e6f2f8'; 
        msgDiv.style.color = '#004160'; 
        msgDiv.style.borderBottomLeftRadius = '0';
        msgDiv.style.border = '1px solid #cce4f0';
    }
    
    let optionsHtml = '';
    if (text.includes('|OPTIONS|')) {
        const parts = text.split('|OPTIONS|');
        text = parts[0]; 
        const options = parts[1].split(','); 
        
        options.forEach(opt => {
            optionsHtml += `<button onclick="handleChatOption('${opt.trim()}')" style="display: block; width: 100%; margin-top: 8px; padding: 10px; background-color: #84110A; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 0.9rem; text-align: center; transition: background 0.3s;" onmouseover="this.style.backgroundColor='#630c07'" onmouseout="this.style.backgroundColor='#84110A'">${opt.trim()}</button>`;
        });
    }

    if (className === 'bot-message' && text.includes('|URL|')) {
        const parts = text.split('|URL|');
        const textPart = parts[0].replace(/\n/g, '<br>'); 
        const urlPart = parts[1].trim(); 
        
        msgDiv.innerHTML = textPart;
        
        const btn = document.createElement('a');
        btn.target = '_blank';
        btn.style.cssText = 'display: inline-block; color: white; padding: 10px 15px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 0.9rem; margin-top: 10px; width: 100%; text-align: center; box-sizing: border-box;';
        
        if (urlPart.includes('wa.me')) {
            btn.innerHTML = '📱 Chamar no WhatsApp';
            btn.style.backgroundColor = '#25D366';
            btn.href = urlPart;
        } 
        else if (urlPart.includes('trabalhe')) {
            btn.innerHTML = '💼 Ver Vagas Disponíveis';
            btn.style.backgroundColor = '#004160'; 
            btn.href = urlPart;
        } 
        else if (urlPart.includes('catalogo')) {
            btn.innerHTML = '📄 Ver Catálogo Completo';
            btn.style.backgroundColor = '#004160';
            btn.href = urlPart;
        }
        else {
            btn.innerHTML = '🔗 Acessar Link';
            btn.style.backgroundColor = '#004160';
            btn.href = urlPart;
        }
        
        msgDiv.appendChild(btn);
    } else {
        msgDiv.innerHTML = text.replace(/\n/g, '<br>');
    }

    if (optionsHtml !== '') {
        const optionsContainer = document.createElement('div');
        optionsContainer.style.marginTop = '10px';
        optionsContainer.innerHTML = optionsHtml;
        msgDiv.appendChild(optionsContainer);
    }
    
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// "Cérebro" do Chat
function getVicentinhoResponse(rawText) {
    const msg = rawText.toLowerCase();

    // 1. Saudação e Menu Inicial
    if (msg === 'oi' || msg === 'olá' || msg === 'ola' || msg === 'menu' || msg === 'início' || msg === 'inicio' || msg === '🏠 menu inicial') {
        chatMemory = { fluxo: null, material: null, regiao: null, esperandoCidade: false, cidadeDigitada: "" };
        return "Olá! Eu sou o assistente virtual da TopBritas. Nossa jazida fica em Nazaré-BA e estamos prontos para atender sua obra. O que você deseja?|OPTIONS|🛒 Comprar Material, ❓ Tirar Dúvidas, 💼 Trabalhe Conosco, 🏢 Sobre a Pedreira";
    }

    // 2. Sobre a Pedreira
    if (msg === '🏢 sobre a pedreira' || msg.includes('sobre')) {
        chatMemory = { fluxo: null, material: null, regiao: null, esperandoCidade: false, cidadeDigitada: "" }; 
        return "Nossa operação valoriza a cadeia da construção civil, extraindo agregados de altíssima qualidade direto de Nazaré-BA. Quer conhecer mais produtos?|OPTIONS|🛒 Comprar Material, 🏠 Menu Inicial"; 
    }

    // 3. Vagas / Trabalhe Conosco
    if (msg.includes('vaga') || msg.includes('trabalhe') || msg.includes('emprego') || msg.includes('currículo')) {
        chatMemory = { fluxo: null, material: null, regiao: null, esperandoCidade: false, cidadeDigitada: "" }; 
        return "Temos vagas para operadores, motoristas e setor administrativo na nossa jazida! Clique abaixo para ir para a página de vagas:|URL|https://gruposv.vagas.solides.com.br/";
    } 

    // 4. Tirar Dúvidas Técnicas
    if (msg === '❓ tirar dúvidas' || msg === 'tirar dúvidas' || msg === 'dúvida' || msg === 'novas dúvidas') {
        chatMemory.fluxo = 'duvidas';
        chatMemory.material = null; 
        return "A qualidade da nossa rocha garante máxima resistência. Sobre qual material você tem dúvidas?|OPTIONS|📖 Dúvida sobre Brita, 📖 Dúvida sobre Areia Industrial";
    }

    if (msg.includes('dúvida sobre brita') || msg.includes('brita') && chatMemory.fluxo === 'duvidas') {
        chatMemory = { fluxo: null, material: null, regiao: null, esperandoCidade: false, cidadeDigitada: "" };
        return "Temos Brita 0, 1, 2, 3 e Brita Graduada. Nosso processo de britagem garante uma pedra limpa, livre de pó excessivo, essencial para concretos estruturais de alta resistência.\n\nVeja as especificações completas:|URL|catalogo.html|OPTIONS|🛒 Comprar Material, 🏠 Menu Inicial";
    }
    
    if (msg.includes('dúvida sobre areia') || msg.includes('pó de pedra') && chatMemory.fluxo === 'duvidas') {
        chatMemory = { fluxo: null, material: null, regiao: null, esperandoCidade: false, cidadeDigitada: "" };
        return "Nossa Areia Industrial (Pó de Pedra) é sustentável e isenta de matéria orgânica (barro)! Ela substitui a areia de rio com perfeição, evitando trincas no reboco e gerando grande economia de cimento.\n\nVeja no catálogo:|URL|catalogo.html|OPTIONS|🛒 Comprar Material, 🏠 Menu Inicial";
    }

    // ==========================================
    // 5. FLUXO DE VENDAS E ORÇAMENTO (O FUNIL)
    // ==========================================

    if (msg.includes('comprar') || msg.includes('orçamento') || msg.includes('orcamento') || msg.includes('cotar')) {
        chatMemory.fluxo = 'compra';
        if (!chatMemory.material) {
            return "Excelente! Nossa produção é contínua. Qual agregado você precisa cotar para a sua obra?|OPTIONS|Brita (Diversas Bitolas), Areia Industrial (Pó de Pedra)";
        }
    }

    // Define o material escolhido
    if (msg.includes('areia industrial') || msg.includes('pó de pedra')) { chatMemory.fluxo = 'compra'; chatMemory.material = 'Areia Industrial'; }
    else if (msg.includes('brita') && chatMemory.fluxo === 'compra') { chatMemory.fluxo = 'compra'; chatMemory.material = 'Brita'; }

    // Pergunta sobre a Logística
    if (chatMemory.material && !chatMemory.esperandoCidade) {
        
        // Clicou em "Retirar na Pedreira"
        if (msg === '📍 retirar na pedreira (nazaré)' || msg.includes('retirar') || msg.includes('nazaré')) {
            let textoZap = encodeURIComponent(`Olá! Falei com o assistente virtual no site. Gostaria de cotar *${chatMemory.material}* para *RETIRADA* direto na Pedreira em Nazaré.`);
            let linkWhatsapp = `https://wa.me/${whatsappVendas}?text=${textoZap}`;
            
            // Reseta a memória para o próximo atendimento
            chatMemory = { fluxo: null, material: null, regiao: null, esperandoCidade: false, cidadeDigitada: "" };
            
            return `Perfeito! O setor de **Vendas** já está aguardando seu contato para liberar os valores de retirada.\n\nClique no botão verde abaixo para falar com eles no WhatsApp:|URL|${linkWhatsapp}`;
        }

        // Clicou em "Entregar em Outra Cidade"
        if (msg === '🚚 entregar em outra cidade' || msg.includes('entregar') || msg.includes('outra')) {
            chatMemory.esperandoCidade = true;
            return "Certo! Precisamos calcular a logística de entrega saindo da nossa base. 🚚\n\nPor favor, **digite o nome da cidade** onde o material será descarregado:";
        }

        // Se ainda não escolheu nem retirada nem entrega, faz a pergunta:
        return `Boa escolha! Nossa jazida fica em Nazaré-BA.\n\nO material será retirado na nossa pedreira ou precisaremos calcular o frete para entrega?|OPTIONS|📍 Retirar na Pedreira (Nazaré), 🚚 Entregar em Outra Cidade`;
    }

    // Recebe a cidade digitada e encaminha para Vendas
    if (chatMemory.esperandoCidade && msg.length > 2) {
        let cidade = rawText.trim();
        let textoZap = encodeURIComponent(`Olá! Falei com o assistente virtual no site. Gostaria de cotar *${chatMemory.material}* com *ENTREGA* para a cidade de *${cidade}*.`);
        let linkWhatsapp = `https://wa.me/${whatsappVendas}?text=${textoZap}`;
        
        // Reseta a memória para o próximo atendimento
        chatMemory = { fluxo: null, material: null, regiao: null, esperandoCidade: false, cidadeDigitada: "" };
        
        return `Tudo anotado! O setor de **Vendas** vai calcular o frete para ${cidade} e te passar o melhor orçamento.\n\nClique no botão verde abaixo para falar com o vendedor responsável:|URL|${linkWhatsapp}`;
    }

    // 6. Resposta Padrão para quando ele não entende a mensagem
    return "Desculpe, não entendi. 😅\n\nPara facilitar o atendimento, por favor, **escolha uma das opções:**|OPTIONS|🛒 Comprar Material, ❓ Tirar Dúvidas, 🏠 Menu Inicial";
}


/* ========================================================== */
/* --- INICIALIZAÇÃO DA PÁGINA (EVENTOS E INTERFACE)      --- */
/* ========================================================== */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Lógica do Slider Hero (Imagens Passando na Entrada) ---
    const slides = document.querySelectorAll('.slide');
    let slideAtual = 0;

    // Só inicia o slider se as imagens existirem na página atual
    if (slides.length > 0) {
        function proximoSlide() {
            slides[slideAtual].classList.remove('ativo');
            slideAtual = (slideAtual + 1) % slides.length;
            slides[slideAtual].classList.add('ativo');
        }
        setInterval(proximoSlide, 5000);
    }


    // --- 2. Lógica do Assistente Virtual (Gatilhos) ---
    const btnVicentinho = document.getElementById('btn-vicentinho');
    const btnFecharChat = document.getElementById('fechar-chat');
    const chatInput = document.querySelector('.chat-input input');
    const btnEnviarChat = document.querySelector('.chat-input button');

    // Mapeando botões para a função toggleChat
    if (btnVicentinho) btnVicentinho.addEventListener('click', toggleChat);
    if (btnFecharChat) btnFecharChat.addEventListener('click', toggleChat);
    if (btnEnviarChat) btnEnviarChat.addEventListener('click', sendChatMessage);

    // Mapeando a tecla "Enter" no input do chat
    if (chatInput) {
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }


    // --- 3. Lógica do Carrossel Mobile (Três Pontinhos) ---
    const slider = document.getElementById('produtos-slider');
    const dotsContainer = document.getElementById('slider-dots');
    const cards = document.querySelectorAll('.card-produto');
    
    // Executa apenas em telas mobile e se os cards existirem
    if (window.innerWidth <= 768 && slider && cards.length > 0 && dotsContainer) {
        
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active'); 
            
            dot.addEventListener('click', () => {
                const cardWidth = cards[0].clientWidth;
                slider.scrollTo({
                    left: cardWidth * index,
                    behavior: 'smooth'
                });
            });
            
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        slider.addEventListener('scroll', () => {
            const scrollPosition = slider.scrollLeft;
            const cardWidth = cards[0].clientWidth;
            const activeIndex = Math.round(scrollPosition / cardWidth);

            dots.forEach(dot => dot.classList.remove('active'));
            
            if(dots[activeIndex]) {
                dots[activeIndex].classList.add('active');
            }
        });
    }
});
// ==========================================================
// --- LÓGICA DO CARRINHO (Botões +/- e Resumo Modal)     ---
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    const cardsCatalogo = document.querySelectorAll('.card-catalogo');
    const barraCarrinho = document.getElementById('barra-carrinho');
    const displayQtdItens = document.getElementById('qtd-itens');
    const displayTotalM3 = document.getElementById('total-m3');
    
    const btnRevisarPedido = document.getElementById('btn-revisar-pedido');
    const modalResumo = document.getElementById('modal-resumo');
    const btnFecharModal = document.getElementById('btn-fechar-modal');
    const listaResumo = document.getElementById('lista-resumo-pedido');
    const totalM3Modal = document.getElementById('total-m3-modal');
    const btnEnviarWhatsapp = document.getElementById('btn-enviar-whatsapp');
    const btnLimparCarrinho = document.getElementById('btn-limpar-carrinho'); // NOVO BOTÃO

    if (cardsCatalogo.length > 0 && barraCarrinho) {
        
        let pedidoAtual = []; 
        let volumeTotalGeral = 0;

        function atualizarCarrinho() {
            pedidoAtual = [];
            volumeTotalGeral = 0;
            let totalItens = 0;

            cardsCatalogo.forEach(card => {
                const input = card.querySelector('.input-m3');
                const nomeProduto = card.getAttribute('data-nome');
                const valor = parseFloat(input.value);

                if (valor > 0) {
                    totalItens++;
                    volumeTotalGeral += valor;
                    pedidoAtual.push({ nome: nomeProduto, volume: valor, cardRef: card }); // cardRef para sabermos qual card zerar depois
                }
            });

            displayQtdItens.innerText = totalItens;
            displayTotalM3.innerText = volumeTotalGeral.toFixed(1).replace('.', ',');

            if (totalItens > 0) {
                barraCarrinho.classList.add('ativa');
            } else {
                barraCarrinho.classList.remove('ativa');
                modalResumo.classList.remove('ativo'); 
            }
        }

        // Função para atualizar a lista do Modal na tela
        function renderizarListaModal() {
            listaResumo.innerHTML = ''; 
            
            pedidoAtual.forEach((item, index) => {
                const li = document.createElement('li');
                li.style.display = 'flex';
                li.style.justifyContent = 'space-between';
                li.style.alignItems = 'center';
                li.style.padding = '8px 0';
                li.style.borderBottom = '1px solid #eaeaea';

                li.innerHTML = `
                    <span style="flex-grow: 1;">${item.nome}</span> 
                    <strong style="margin-right: 15px;">${item.volume.toFixed(1).replace('.', ',')} m³</strong>
                    <button class="btn-remover-item" data-index="${index}" style="background: none; border: none; color: #dc3545; font-weight: bold; cursor: pointer; font-size: 1.1rem;" title="Remover item">×</button>
                `;
                listaResumo.appendChild(li);
            });

            totalM3Modal.innerText = volumeTotalGeral.toFixed(1).replace('.', ',');

            // Adiciona evento de clique nos "X" de cada item
            document.querySelectorAll('.btn-remover-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    const itemRemover = pedidoAtual[idx];
                    
                    // Zera o input lá no cartão original
                    const inputOriginal = itemRemover.cardRef.querySelector('.input-m3');
                    inputOriginal.value = "0.0";
                    
                    // Recalcula tudo
                    atualizarCarrinho();
                    
                    // Atualiza a tela do modal se ainda houver itens, senão fecha
                    if (pedidoAtual.length > 0) {
                        renderizarListaModal();
                    }
                });
            });
        }

        // Lógica de clicar nos botões + e - (Nos Cartões)
        cardsCatalogo.forEach(card => {
            const btnMenos = card.querySelector('.btn-menos');
            const btnMais = card.querySelector('.btn-mais');
            const input = card.querySelector('.input-m3');

            btnMais.addEventListener('click', () => {
                let valorAtual = parseFloat(input.value);
                input.value = (valorAtual + 0.5).toFixed(1);
                atualizarCarrinho();
            });

            btnMenos.addEventListener('click', () => {
                let valorAtual = parseFloat(input.value);
                if (valorAtual > 0) {
                    input.value = (valorAtual - 0.5).toFixed(1);
                    atualizarCarrinho();
                }
            });
        });

        // Abrir Modal de Resumo
        btnRevisarPedido.addEventListener('click', () => {
            renderizarListaModal();
            modalResumo.classList.add('ativo');
        });

        // Lógica do botão "Limpar Pedido"
        if (btnLimparCarrinho) {
            btnLimparCarrinho.addEventListener('click', () => {
                // Zera todos os inputs na tela principal
                cardsCatalogo.forEach(card => {
                    const input = card.querySelector('.input-m3');
                    input.value = "0.0";
                });
                // Recalcula o carrinho (que vai dar zero e fechar o modal)
                atualizarCarrinho();
            });
        }

        // Fechar Modal
        btnFecharModal.addEventListener('click', () => modalResumo.classList.remove('ativo'));
        modalResumo.addEventListener('click', (e) => {
            if (e.target === modalResumo) modalResumo.classList.remove('ativo');
        });

        // Finalizar e Mandar pro WhatsApp
        btnEnviarWhatsapp.addEventListener('click', () => {
            let pedidoTexto = "Olá! Fiz uma seleção de agregados no site e gostaria do orçamento formal:\n\n";
            
            pedidoAtual.forEach(item => {
                pedidoTexto += `✅ *${item.nome}:* ${item.volume.toFixed(1).replace('.', ',')} m³\n`;
            });

            pedidoTexto += `\n*TOTAL: ${volumeTotalGeral.toFixed(1).replace('.', ',')} m³*\n\nAguardo o retorno para alinhar logística e pagamento.`;

            const numeroVendas = "5575982129181"; // Lembre-se de colocar o número real
            const textoCodificado = encodeURIComponent(pedidoTexto);
            const linkWhatsapp = `https://wa.me/${numeroVendas}?text=${textoCodificado}`;

            window.open(linkWhatsapp, '_blank');
        });
    }
});

// ==========================================================
    // --- FECHAR CHAT AO CLICAR FORA E LIMPAR HISTÓRICO      ---
    // ==========================================================
    document.addEventListener('click', function(event) {
        const chatWindow = document.getElementById('caixa-chat');
        const btnVicentinho = document.getElementById('btn-vicentinho');
        const messagesContainer = document.getElementById('chat-messages');
        const badge = document.getElementById('badge-chat');

        // Só executa se a janela do chat estiver aberta
        if (chatWindow && chatWindow.classList.contains('ativo')) {
            
            // Verifica se o clique foi FORA da caixa de chat E FORA do botão com a foto do bot
            if (!chatWindow.contains(event.target) && !btnVicentinho.contains(event.target)) {
                
                // 1. Fecha o chat
                chatWindow.classList.remove('ativo');
                
                // 2. Limpa todas as mensagens da tela
                if (messagesContainer) {
                    messagesContainer.innerHTML = '';
                }
                
                // 3. Reseta a memória do bot (para ele mandar o "Oi" de novo quando for reaberto)
                if (typeof chatMemory !== 'undefined') {
                    chatMemory = { fluxo: null, material: null, regiao: null, esperandoCidade: false, cidadeDigitada: "" };
                }
                if (typeof chatIniciado !== 'undefined') {
                    chatIniciado = false;
                }
                
                // 4. Faz a bolinha vermelha de notificação (1) voltar a aparecer
                if (badge) {
                    badge.style.display = 'flex';
                }
            }
        }
    });

    // ==========================================================
// --- EFEITO SCROLL REVEAL (ANIMAÇÃO AO ROLAR A PÁGINA)  ---
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    
    // Pega todos os elementos que têm a classe 'reveal'
    const reveals = document.querySelectorAll('.reveal');

    // Configuração do "Observador"
    const revealOptions = {
        threshold: 0.15, // O elemento precisa estar 15% visível na tela para animar
        rootMargin: "0px 0px -50px 0px" // Dispara a animação um pouco antes de chegar na borda inferior
    };

    // Cria o observador de interseção
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            // Se o elemento entrou na tela
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Adiciona a classe que faz aparecer
                // Opcional: Se quiser que a animação aconteça só uma vez, descomente a linha abaixo:
                // observer.unobserve(entry.target); 
            } else {
                // Remove a classe se sair da tela (faz a animação repetir quando voltar)
                // Se você descomentou a linha acima, pode apagar o 'else' inteiro.
                entry.target.classList.remove('active');
            }
        });
    }, revealOptions);

    // Manda o observador vigiar cada elemento 'reveal'
    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});

// ==========================================================
// --- FUNCIONALIDADES MOBILE (MENU E CARROSSÉIS APP)     ---
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica do Menu Hambúrguer
    const btnMenu = document.getElementById('btn-menu');
    const menuNavegacao = document.getElementById('menu-navegacao');

    if (btnMenu && menuNavegacao) {
        btnMenu.addEventListener('click', () => {
            menuNavegacao.classList.toggle('ativo');
        });
    }

// 2. Motor Universal de Carrosséis para o Celular (com Auto-Scroll opcional)
    function iniciarCarrosselMobile(idContainer, idDots, autoRolar = false) {
        const container = document.getElementById(idContainer);
        const dotsContainer = document.getElementById(idDots);
        
        // Só ativa se existir na página e se a tela for de celular
        if (!container || !dotsContainer || window.innerWidth > 768) return;

        const cartoes = container.children;
        if (cartoes.length === 0) return;

        // Cria as bolinhas (dots) dinamicamente
        dotsContainer.innerHTML = '';
        Array.from(cartoes).forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot-app');
            if (i === 0) dot.classList.add('ativo');
            
            // Permite clicar na bolinha para ir pro card
            dot.addEventListener('click', () => {
                // Ao clicar no dot, interrompe o scroll automático
                if(autoRolarTimer) clearInterval(autoRolarTimer);
                
                const cardWidth = cartoes[0].clientWidth;
                // Considera o gap do flexbox (15px no seu CSS)
                const gap = 15; 
                container.scrollTo({ left: (cardWidth + gap) * i, behavior: 'smooth' });
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot-app');

        // Atualiza a bolinha ativa quando o usuário desliza o dedo (ou quando rola automático)
        container.addEventListener('scroll', () => {
            const cardWidth = cartoes[0].clientWidth;
            const gap = 15;
            let index = Math.round(container.scrollLeft / (cardWidth + gap));
            
            dots.forEach(d => d.classList.remove('ativo'));
            // Garante que o index está dentro dos limites do array de dots
            if(dots[index]) dots[index].classList.add('ativo');
        });

        let autoRolarTimer;

        // Lógica de rolagem automática (usada no "Como Comprar")
        if (autoRolar) {
             autoRolarTimer = setInterval(() => {
                const cardWidth = cartoes[0].clientWidth;
                const gap = 15;
                const currentScroll = container.scrollLeft;
                const maxScroll = container.scrollWidth - container.clientWidth;
                
                // Calcula o próximo scroll. Se estiver no final, volta pro zero.
                let nextScroll = currentScroll + cardWidth + gap;

                if (currentScroll >= maxScroll - 10) { // Tolerância de 10px pro final
                    nextScroll = 0;
                }

                container.scrollTo({ left: nextScroll, behavior: 'smooth' });
            }, 3000); // Rola a cada 3 segundos
            
            // Opcional: Pausar o auto-scroll quando o usuário interage (toca)
             container.addEventListener('touchstart', () => {
                 clearInterval(autoRolarTimer);
             });
        }
    }

// Ativando os carrosséis nas páginas
    // O último parâmetro (true/false) define se rola sozinho.
    iniciarCarrosselMobile('carrossel-passos', 'dots-passos', true); 
    iniciarCarrosselMobile('carrossel-mvv', 'dots-mvv', true);      
    iniciarCarrosselMobile('carrossel-incentivos', 'dots-incentivos', true); 
    
    // Novo carrossel adicionado para Contato e Vagas
    iniciarCarrosselMobile('carrossel-contato', 'dots-contato', true); 
});

