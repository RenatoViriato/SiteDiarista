# R&R Casa em Ordem — Limpeza Profissional · Site de Agendamento

Site completo (front-end) da **R&R Casa em Ordem — Limpeza Profissional**, com slogan
"Sua casa limpa, seu tempo livre" e fluxo de agendamento em 7 passos:
Serviço → Duração → Data → Horário → Seus dados → Resumo → Confirmação.

---

## Código-fonte completo

Requisitos: [Node.js 20+](https://nodejs.org) ou [Bun](https://bun.sh).

```bash
bun install        # ou: npm install
bun run dev        # ou: npm run dev  → abre em http://localhost:3000
```

Build de produção:

```bash
bun run build      # ou: npm run build
bun run start      # servidor standalone em localhost:3000
```

### Estrutura principal

| Caminho | O que é |
|---|---|
| `src/app/page.tsx` | Página única (SPA) com as seções e o fluxo de agendamento |
| `src/lib/agency-data.ts` | **Dados simulados**: serviços, preços, horários, disponibilidade e protocolo do agendamento. É aqui que futuramente entra a API real |
| `src/components/agency/` | Header, Hero, Serviços, Como funciona, Benefícios, Contato, Rodapé |
| `src/components/agency/booking/` | Passos do agendamento (7 etapas + tela de sucesso) |
| `public/logo-renata.png` | **Logo do site** (também usada como favicon) |
| `src/app/globals.css` | Cores do tema (paleta `brand-*`) e fontes |

### Trocar a logo / as cores

1. Substitua o arquivo `public/logo-renata.png` pela sua logo (quadrada fica melhor).
2. As cores usam a paleta `brand-50` até `brand-900` definida em `src/app/globals.css`.
   Trocando os códigos hex ali, o site inteiro muda de cor (botões, destaques, banners).
3. (Opcional, se usar o código-fonte) O script `scripts/brand_from_logo.py` recorta
   uma logo, deixa o fundo transparente e **sugere automaticamente** a paleta de cores:

```bash
python3 scripts/brand_from_logo.py caminho/da/sua-logo.png public/logo-renata.png
```

### Ligando um backend depois

O envio do formulário é simulado em `src/lib/agency-data.ts`, na função
`submitBooking()` — há um marcador `TODO(backend)` indicando o ponto exato
para trocar pela chamada real da API quando ela existir.

---

## Contatos exibidos no site

- E-mail: `contato@rrcasaemordem.com.br` (substituir pelo e-mail real)
- Agenda: segundas a sábados, 08:00–17:00 (domingos fechados)

© R&R Casa em Ordem — Limpeza Profissional. Todos os direitos reservados.
