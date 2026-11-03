# ARCA Sorocaba — site

Site institucional e de doação da **ARCA Sorocaba** (Associação Beneficente Amigos da Arca de Sorocaba, ABAAS).
Site estático (HTML, CSS e JavaScript puros), publicado pelo GitHub Pages no domínio do arquivo `CNAME`.

O conteúdo segue a documentação do ClickUp: tarefa **[ARCA] SITE ARCA + LINK DA BIO - DOCUMENTAÇÃO**.
O link da bio (Instagram) é publicado em `bio/`; o repositório `arca-sorocaba-link-bio` guarda a cópia de trabalho e a prévia.

## Estrutura

```
.
├── index.html          Home: doação, quem somos, como ajudar, voluntariado, transparência, contato
├── guardiao.html       Guardião Mensal (página de doação recorrente)
├── blog.html           Jornal da ARCA (lista de posts, vindos do Supabase)
├── post.html           Um post do Jornal (post.html?id=...)
├── admin.html          Painel interno para publicar no Jornal (protegido por senha)
├── CNAME               Domínio do site
└── assets/
    ├── css/site.css    Estilos compartilhados (home e Guardião; o blog tem estilos próprios inline)
    ├── css/header.css  Animação da barra superior (some ao descer, volta ao subir)
    ├── js/site.js      Menu, doação, PIX, formulários, contagem dos números, fotos
    ├── js/header.js    Esconde/mostra a barra superior ao rolar a página
    ├── img/            Logo (barquinha), favicon e foto do topo
    └── fotos/          Fotos da home (veja abaixo)
```

## Fotos

As fotos ficam em `assets/fotos/`, em WebP e em dois tamanhos (o sufixo é a largura em pixels). Para trocar uma, gere o novo arquivo com o mesmo nome. Cada imagem está em uma tag `<img>` no HTML, com o texto alternativo descrevendo a cena.

## Rolagem suave

Fica em `assets/js/smooth.js`, sem biblioteca: bibliotecas de rolagem como o Lenis travam a barra lateral. Funciona na roda do mouse e solta o controle ao pegar a barra, clicar ou usar o teclado. No celular a rolagem do próprio aparelho continua valendo, e quem pede menos movimento no sistema fica sem o efeito.

Tom das imagens: convivência, alegria e autonomia, nunca coitadismo ou pena.

## Regras de conteúdo (do ClickUp)

- Palavra-chave da causa: **autonomia**. Nunca usar "idoso" ou "envelhecimento".
- **Nunca inventar** característica de acolhido, história ou número financeiro. Onde faltar dado, deixar espaço marcado.
- Público: pessoas **adultas** com deficiência intelectual. A ARCA **não recebe verba pública**.
- Identidade: azul da ARCA (`--blue` em `assets/css/site.css`) e logo da barquinha.

## Dados fixos

| Item | Valor |
|------|-------|
| CNPJ / chave PIX | 19.831.448/0001-85 |
| WhatsApp | (15) 99712-4769 (`https://wa.me/5515997124769`) |
| Endereço | Av. Santos Dumont, 100, Jardim Ana Maria, Sorocaba/SP, CEP 18065-290 |
| Instagram | @arca_sorocaba |
| Bazar | terça a sexta, 14h às 17h |
| Custo mensal da casa | cerca de R$ 30 mil |

A chave PIX aparece em `index.html`, `guardiao.html` e em `assets/js/site.js` (constante `PIX_KEY`).
O número do WhatsApp aparece nos links `wa.me` e em `assets/js/site.js` (constante `WA_NUMBER`).

## Pendências de conteúdo

Os blocos que dependem de conteúdo da ARCA ficam **escondidos** (comentados no HTML) para não aparecer
anotação interna no site. Procure por `PENDENTE` no código para reativar cada um quando o conteúdo chegar.

- Vídeos dos acolhidos e 2 avaliações reais do Google (nome de quem escreveu): `guardiao.html`.
- História da ARCA (Silvia) e apresentação da equipe: `index.html`.
- Documentos da Transparência (estatuto, comprovante de CNPJ, balanço): `index.html`. Salvar os PDFs em `assets/docs/`.
- Fotos da home sem arquivo aparecem com o logo em marca d'água (sem texto), até a foto ser salva em `assets/fotos/`.
- Valores de doação de R$ 60, 100 e 200: só o de R$ 30 tem significado definido ("um dia de oficina").
- Doação com cartão recorrente: depende de contratar um gateway de pagamento. Enquanto isso, PIX + WhatsApp.
- Pixel / rastreamento (Douglas): procurar o comentário `RASTREAMENTO` no `<head>` de cada página.
- Facebook: falta o endereço do perfil.

## Como testar no computador

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Jornal da ARCA (blog)

Os posts vêm de uma tabela `blog_posts` no Supabase e a inscrição de e-mails vai para `newsletter_subscribers`.
Para publicar, use `admin.html`. Um post por mês, no formato de retrospecto (eventos, oficinas, datas
comemorativas, agradecimentos e a chamada "Seja um Guardião").

## Compartilhamento (prévia no WhatsApp e redes)

Cada página tem tags Open Graph no `<head>`. A imagem da prévia é `assets/img/og-image.jpg` (1200x630),
um corte horizontal de `hero.jpg`. Ao trocar a foto do topo, gere um novo corte com o mesmo nome.
