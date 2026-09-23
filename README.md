# TopBritas — site institucional

Site estático, leve e responsivo da TopBritas. Não exige PHP, banco de dados, Node.js ou instalação de dependências.

## Páginas ativas

- `index.html`: página inicial, operação, diferenciais e localização;
- `catalogo.html`: catálogo com 11 agregados, seleção de volume e pedido pelo WhatsApp;
- `empresa.html`: empresa, missão, visão, valores e iniciativas sociais.

O item **Fale conosco** direciona para o canal oficial em `https://britaki.com.br/fale-conosco`. A regra em `.htaccess` também redireciona acessos à antiga URL local, evitando página inexistente.

## Visualizar

Dê dois cliques em `ABRIR_SITE.bat` ou abra `index.html` no navegador.

## Publicar

Envie o conteúdo desta pasta para o diretório público do domínio, preservando:

- `.htaccess`, para redirecionamento, segurança, compressão e cache;
- `robots.txt` e `sitemap.xml`, para rastreamento pelos buscadores;
- a pasta `assets/`, com estilos, scripts, fontes e imagens.

Depois da publicação, envie `https://www.topbritas.com.br/sitemap.xml` no Google Search Console e solicite a indexação das três páginas canônicas.

## Estrutura principal

```text
web2/
├── index.html
├── catalogo.html
├── empresa.html
├── assets/
│   ├── brand/
│   ├── fonts/
│   ├── images/
│   ├── css/site.css
│   └── js/site.js
├── robots.txt
├── sitemap.xml
└── .htaccess
```

A experiência usa HTML, CSS e JavaScript puro, imagens otimizadas, carregamento adiado de mídia e dados estruturados Schema.org.
