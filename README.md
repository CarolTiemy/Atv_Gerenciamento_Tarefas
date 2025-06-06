# 📋 Gerenciamento de Tarefas com LocalStorage, SessionStorage e MongoDB

Este projeto é uma aplicação web que permite o gerenciamento de tarefas com persistência de dados tanto no navegador quanto em um banco de dados. A proposta é integrar diferentes formas de armazenamento — `LocalStorage`, `SessionStorage` e `MongoDB` — em uma única solução funcional e intuitiva.

## 🧠 Como funciona

A aplicação permite que usuários adicionem, visualizem, filtrem, concluam e excluam tarefas de maneira simples. Aqui está como cada parte funciona:

- 🔐 **LocalStorage** é usado para armazenar as tarefas diretamente no navegador, garantindo que os dados permaneçam salvos mesmo após recarregar a página ou fechar o navegador.
  
- 🕒 **SessionStorage** mantém o estado do filtro de tarefas ("Todas", "Pendentes" ou "Concluídas") durante a sessão do usuário, oferecendo uma experiência contínua enquanto o navegador estiver aberto.
  
- 🌐 **MongoDB** é utilizado como banco de dados principal, permitindo que as tarefas também sejam salvas no servidor, possibilitando o acesso e sincronização entre diferentes dispositivos.

## ⚙️ Funcionalidades principais

- **Adicionar tarefas** com título e descrição.
- **Listar tarefas** já registradas, carregando do LocalStorage ou, se necessário, do MongoDB.
- **Marcar tarefas como concluídas**, com sincronização local e no banco de dados.
- **Filtrar tarefas** com base no status (todas, pendentes ou concluídas), mantendo o filtro durante a sessão.
- **Excluir tarefas** individualmente, removendo do LocalStorage e do MongoDB.
- **Sincronização automática** com o banco de dados a cada alteração, garantindo consistência entre cliente e servidor.

## 🧰 Tecnologias utilizadas

- Frontend: HTML, CSS e JavaScript puro
- Backend: Node.js com Express
- Banco de Dados: MongoDB, utilizando Mongoose para modelagem
- Armazenamento local: LocalStorage e SessionStorage

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido com fins educativos para demonstrar na prática como diferentes formas de armazenamento (cliente e servidor) podem ser combinadas em uma aplicação real. Ele exemplifica conceitos fundamentais de persistência de dados, estado da aplicação e integração com banco de dados.

---

Desenvolvido por [Carolina e Lara] ✨
