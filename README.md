# ARCA Sorocaba — site

Site institucional e de doação da **ARCA Sorocaba** (Associação Beneficente Amigos da Arca de Sorocaba, ABAAS).
Site estático (HTML, CSS e JavaScript puros), publicado pelo GitHub Pages no domínio do arquivo `CNAME`.

O conteúdo segue a documentação do ClickUp: tarefa **[ARCA] SITE ARCA + LINK DA BIO - DOCUMENTAÇÃO**.
O link da bio (Instagram) fica em outro repositório: `arca-sorocaba-link-bio`.

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

## Como colocar as fotos da home

Salve o arquivo em `assets/fotos/` com o nome abaixo (`.jpg`, `.webp` ou `.png`). Ela aparece sozinha no espaço, sem mexer no código.

| Arquivo              | Onde aparece                                   |
|----------------------|------------------------------------------------|
| `quem-somos.jpg`     | Seção "Quem somos"                             |
| `acolhidos.jpg`      | Seção "Quem a ARCA acolhe" (oficinas e convivência) |
| `videos.jpg`         | Capa da seção de vídeos (formato horizontal 16:9) |
| `guardiao.jpg`       | Chamada do Guardião Mensal                     |
| `transparencia.jpg`  | Seção "Transparência"                          |

Dica: fotos verticais (4:5) ou quadradas funcionam melhor; use até ~300 KB por foto.
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
| WhatsApp | (15) 99114-2594 (`https://wa.me/5515991142594`) |
| Endereço | Av. Santos Dumont, 100, Jardim Ana Maria, Sorocaba/SP, CEP 18065-290 |
| Instagram | @arca_sorocaba |
| Bazar | terça a sexta, 14h às 17h |
| Custo mensal da casa | cerca de R$ 30 mil |

A chave PIX aparece em `index.html`, `guardiao.html` e em `assets/js/site.js` (constante `PIX_KEY`).
O número do WhatsApp aparece nos links `wa.me` e em `assets/js/site.js` (constante `WA_NUMBER`).

## Pendências de conteúdo

- Vídeos dos acolhidos e 2 avaliações reais do Google (nome de quem escreveu): espaços marcados "a inserir".
- História da ARCA (Silvia) e apresentação da equipe: avisos "Em breve".
- Documentos da Transparência (estatuto, comprovante de CNPJ, balanço): "A publicar".
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
