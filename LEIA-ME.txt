# R&R Casa em Ordem — Limpeza profissional · Site de Agendamento

Site completo (front-end) da **R&R Casa em Ordem**, com o slogan
"Sua casa limpa, seu tempo livre" e fluxo de agendamento em etapas:
Serviço → Duração → Data → Horário → Seus dados → Resumo → Confirmação.

Identidade visual tirada da própria logo: **azul-marinho `#0e1b4c`** como cor
institucional e **dourado `#c48318`** (brilho `#eccb6c`) como destaque.
Tipografia: **Playfair Display** nos títulos e **Inter** no corpo/interface.

O site é **100% estático** (Next.js com `output: "export"`): não precisa de
servidor nem de banco de dados para funcionar. O envio do formulário é
simulado no front-end e pode ser trocado por uma API real depois.

---

## Rodando o projeto (código-fonte)

Requisito: [Node.js 20+](https://nodejs.org).

```bash
npm install        # instala as dependências
npm run dev        # abre em http://localhost:3000
```

Build de produção — gera a pasta `out/`:

```bash
npm run build
npm run start      # pré-visualiza o build em http://localhost:3000
```

Comandos auxiliares:

```bash
npm run typecheck  # checagem de tipos (tsc --noEmit)
npm run lint       # ESLint
npm run sync:root  # copia out/ para a raiz do projeto (publicação pela raiz)
```

---

## Como publicar

### Vercel (link no ar)

Site publicado em produção: **https://rr-casa-em-ordem.vercel.app**
(painel: `vercel.com/viriatus-lima/rr-casa-em-ordem`)

Para publicar uma versão nova:

```bash
npm run build && npm run deploy
```

O `deploy` copia o conteúdo de `out/` para `.tools/deploy/rr-casa-em-ordem` e
envia para a Vercel em produção. O CLI fica isolado em `.tools/vercel-cli` e a
credencial em `.tools/vercel-home` (os dois no `.gitignore`, não vão para o
site nem para o repositório).

Em outro computador, ou se a credencial expirar:

```bash
npm run deploy:setup   # instala o CLI em .tools/
npm run deploy:login   # abre o navegador para autorizar a conta
```

### Outras hospedagens

A pasta `out/` também pode ser publicada em qualquer host estático: Netlify
(app.netlify.com/drop), Cloudflare Pages ou GitHub Pages.

#### GitHub Pages (opcional)

O GitHub Pages publica o site em `usuario.github.io/SiteDiarista/`, então esse
build precisa do prefixo `/SiteDiarista` nos assets:

```bash
npm run build:github
```

> ⚠️ **Atenção:** esse prefixo **quebra a Vercel** (e qualquer host que sirva o
> site na raiz), porque o HTML passa a procurar `/SiteDiarista/_next/...` e
> recebe 404 — o site fica sem CSS e sem JavaScript. Por isso o prefixo só é
> aplicado pelo `npm run build:github`. Nunca deixe `basePath`/`assetPrefix`
> fixos no `next.config.ts`.

> ℹ️ A raiz do projeto também guarda uma **cópia** do site pronto (`index.html`,
> `404.html`, `_next/`, `_not-found/`, `index.txt`, `__next.*.txt`), para quem
> publica a pasta do projeto direto na hospedagem. O `npm run build` **não**
> atualiza essa cópia — depois de cada build rode:
>
> ```bash
> npm run build && npm run sync:root
> ```
>
> Sem isso, o site publicado a partir da raiz do projeto fica desatualizado.

Para testar o build localmente, `npm run start` já sobe a pasta `out/`.

---

### Estrutura principal

| Caminho | O que é |
|---|---|
| `src/app/page.tsx` | Página única (SPA) com as seções e o fluxo de agendamento |
| `src/app/layout.tsx` | Metadados/SEO, fontes e carregamento do CSS do tema |
| `src/app/not-found.tsx` | Página 404 em português (exportada como `404.html`) |
| `src/lib/agency-data.ts` | **Dados simulados**: serviços, preços, horários, disponibilidade e protocolo do agendamento. É aqui que futuramente entra a API real |
| `src/components/agency/` | Header, Brand (logo), Hero, Serviços, Como funciona, Benefícios, Contato, Rodapé |
| `src/components/agency/booking/` | Passos do agendamento (6 etapas + tela de sucesso) |
| `public/icon-512.png` | **Logo redonda** do cabeçalho/rodapé e favicon (cantos transparentes) |
| `public/logo-rr.png` | Mesma logo em fundo branco, para uso externo ao site |
| `src/app/globals.css` | Paleta da marca (`brand-*` azul, `gold-*` dourado), fontes e utilitários |

### Trocar a logo / as cores

1. A logo é usada em um único componente: `src/components/agency/Brand.tsx`
   (cabeçalho e rodapé). Ele lê `public/icon-512.png` — a versão redonda, com
   cantos transparentes, que funciona tanto sobre o branco do cabeçalho quanto
   sobre o azul do rodapé.
2. `public/logo-rr.png` é a mesma arte em fundo branco, para uso fora do site
   (redes sociais, propostas, impressos).
3. Para regerar os dois arquivos a partir da logo original
   (`.design/logo-original.png`), rode `node .design/prepare-logo.mjs`: o script
   limpa o fundo, recorta as sobras e gera as versões do site.
4. As cores ficam em `src/app/globals.css`. A escala `brand-50`…`brand-900` é o
   azul-marinho (botões, textos, fundos) e `gold-50`…`gold-900` é o dourado
   (selos, destaques, brilhos). Trocando os hex ali, o site inteiro acompanha.
5. As fontes ficam em `src/app/layout.tsx` (Playfair Display nos títulos e Inter
   no corpo). Elas precisam ser declaradas na tag `<html>`, e não no `<body>`:
   é no `<html>` que o tema do Tailwind aplica `--default-font-family`, e uma
   `var()` sem valor definido invalida a declaração `font-family` inteira.

### Agendamento pelo WhatsApp

Ao confirmar o agendamento, o site monta uma mensagem com **todos os dados**
(protocolo, serviço, duração, data, horário, valor estimado, nome, telefone,
endereço e observações) e abre o WhatsApp da agência já preenchido — o cliente
só toca em enviar. Como o site é estático, esse é o "envio" real da solicitação.

Para trocar o número que recebe os agendamentos, edite
`src/lib/agency-data.ts`:

```ts
export const WHATSAPP_NUMBER = "5521981961695"; // 55 + DDD + número (wa.me)
export const WHATSAPP_DISPLAY = "(21) 98196-1695"; // como aparece na tela
```

O mesmo número alimenta o cartão de contato, o rodapé, a página 404 e o botão
da tela final — não há número escrito à mão nos componentes.

O texto da mensagem fica em `buildWhatsAppMessage()` (mesmo arquivo), com
asteriscos para negrito, que é a formatação do WhatsApp.

### Ligando um backend depois

O `submitBooking()` em `src/lib/agency-data.ts` continua sendo o ponto de
integração (`TODO(backend)`) para gravar a solicitação em um banco/API — ele é
chamado em paralelo ao WhatsApp e hoje apenas simula a resposta.

Como o site é exportado como estático, um backend que precise rodar junto
exige remover `output: "export"` do `next.config.ts` (ou hospedar a API em
outro endereço e chamá-la por `fetch`).

---

## Observações sobre arquivos herdados do gerador

- `.zscripts/` e `scripts/package_site.sh` vieram do ambiente onde o site foi
  gerado e usam caminhos Linux fixos (`/home/z/my-project`). Não funcionam
  aqui — use os scripts do `package.json`.
- `prisma/`, `db/custom.db` e `src/lib/db.ts` são sobras de um modelo genérico
  (models `User`/`Post`), não são usados pelo site. Servem apenas de ponto de
  partida caso o backend com banco de dados seja implementado.

---

## Contatos exibidos no site

- WhatsApp (recebe os agendamentos): `(21) 98196-1695`
- E-mail: `contato@renatasantos.com.br` *(ainda é o e-mail do projeto antigo — trocar)*
- Atendimento: segunda a sábado, das 8h às 18h
- Horários de agendamento oferecidos: 08:00 às 17:00 (domingos fechados)
- Área de atendimento: Rio de Janeiro e região metropolitana

© R&R Casa em Ordem — Todos os direitos reservados.
