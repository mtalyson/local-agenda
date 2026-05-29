# AgendaLocal

AgendaLocal é uma plataforma simples e moderna que permite a profissionais autônomos criarem uma página profissional e disponibilizarem agendamento online automático para seus clientes.

## 🚀 Funcionalidades

- **Página Profissional:** Crie seu perfil online com link personalizável e compartilhe com seus clientes.
- **Agendamento Inteligente:** Os clientes escolhem os serviços, datas e horários de forma autônoma e rápida.
- **Painel em Tempo Real:** Visualize seus agendamentos do dia em um dashboard simples e eficiente.
- **Confirmação Instantânea:** Confirme os agendamentos com um clique.

## 🛠️ Tecnologias Utilizadas

- **[Next.js 15+](https://nextjs.org/)** (React 19) com App Router e Server Actions.
- **[Tailwind CSS v4](https://tailwindcss.com/)** para estilização eficiente.
- **[Shadcn UI](https://ui.shadcn.com/)** + Base UI para componentes acessíveis e elegantes.
- **[Drizzle ORM](https://orm.drizzle.team/)** com Postgres para o banco de dados.
- **[Zod](https://zod.dev/)** para validação robusta ponta a ponta.

## 📦 Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/local-agenda.git
   cd local-agenda
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente baseando-se no arquivo `.env.example` (crie um `.env`).
   ```env
   DATABASE_URL="postgres://usuario:senha@localhost:5432/agendalocal"
   ```

4. Execute as migrations do banco de dados (se aplicável):
   ```bash
   npx drizzle-kit push
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

6. Acesse no navegador:
   Abra [http://localhost:3000](http://localhost:3000) e pronto!

## 📝 Licença

Este projeto está sob a licença MIT.
