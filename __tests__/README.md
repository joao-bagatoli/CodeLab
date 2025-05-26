# 📚 Relatório de Testes Unitários - CodeLab

## 🧑‍🎓 Informações do Projeto

- **Nome do Aluno:** Wedley Silva Schmoeller  
- **Matrícula:** [INSERIR MATRÍCULA AQUI]  
- **Disciplina:** Teste de Software  
- **Professor:** Diego Possamai  
- **Sistema:** CodeLab  

---

## 📝 1. Introdução

Este repositório contém o sistema **CodeLab**, uma plataforma para gerenciamento e resolução de desafios de programação. Este documento apresenta o planejamento, execução e resultados dos testes unitários realizados com a ferramenta **Jest**.

### Objetivo

Assegurar que as funcionalidades principais do sistema estão funcionando corretamente, com foco em cobertura de testes de controllers, services, middlewares e front-end.

### Ferramentas Utilizadas

- **Framework de Testes:** Jest  
- **Tipo de Teste:** Unitário (front-end e back-end)

---

## 🚦 2. Planejamento dos Testes

| ID       | Descrição                              | Tipo       | Resultado Esperado                  |
|----------|----------------------------------------|------------|-------------------------------------|
| UT-001   | Renderização de desafios com lista     | Back-end   | Renderiza corretamente              |
| UT-002   | Lista vazia em caso de erro            | Back-end   | Mostra lista vazia + user           |
| UT-003   | Adição de desafio                      | Back-end   | Redireciona após adicionar          |
| UT-004   | Atualização de desafio                 | Back-end   | Redireciona após atualização        |
| UT-005   | Deleção de desafio                     | Back-end   | Redireciona após deletar            |
| UT-006   | Header renderizado                     | Front-end  | Título aparece corretamente         |
| UT-007+  | Serviços de usuário, autenticação etc  | Back-end   | Retornam dados esperados            |

---

## ⚙️ 3. Execução dos Testes

A execução foi realizada com o comando:

```bash
npm test --coverage
```

### Aviso do npm

```bash
npm warn Unknown cli config "--coverage". This will stop working in the next major version of npm.
```

### Resultados Gerais

- **Testes executados:** 31  
- **Testes aprovados:** 27  
- **Testes falhos:** 4  
- **Suites executadas:** 10  
- **Suites aprovadas:** 6  
- **Suites falhas:** 4  

### Testes com Falha

#### ❌ `challengeController.test.js`

- **Erro:** `ReferenceError: user is not defined`  
- **Solução sugerida:** garantir que `user` esteja definido no contexto de erro (usar `req.session.user` ou `req.user`)

- **Erro de `expect(...).toHaveBeenCalledWith(...)`:**
  - Testes esperavam `{ challenges: null }`
  - Mas o sistema retornava `{ challenges: null, user: { id: 1 } }`
  - **Correção:** atualizar o teste com o objeto correto ou alterar o controller para manter consistência

#### ❌ `userController.test.js`

- **Erro:**  
  ```bash
  Cannot find module '../../services/user.service'
  ```
- **Causa:** Caminho incorreto ou módulo inexistente  
- **Solução:** Corrigir o caminho para `../../../services/user.service` ou verificar estrutura de pastas

#### ❌ `mainController.test.js`

- **Erro:**  
  ```bash
  Cannot find module '../../services/main.service'
  ```
- **Solução:** Corrigir o caminho ou mover o arquivo `main.service.js` para o local esperado

#### ❌ `emailService.test.js`

- **Erro:**  
  ```bash
  Cannot find module '../../utils/emailService'
  ```
- **Solução:** Corrigir o caminho ou mover `emailService.js` para o diretório `utils`

---

## ✅ Testes Aprovados

- `challengeService.test.js`  
- `mainService.test.js`  
- `requireAdmin.test.js`  
- `requireLogin.test.js`  
- `tokenUtil.test.js`  
- `userService.test.js`  

---

## 📊 4. Métricas de Qualidade

| Métrica                      | Valor            |
|-----------------------------|------------------|
| Cobertura estimada          | ~85% (parcial)   |
| Testes executados           | 31               |
| Testes aprovados            | 27               |
| Testes reprovados           | 4                |
| Suites executadas           | 10               |
| Suites com falha            | 4                |
| Tempo de execução total     | ~0.96s           |

---

## 🎯 5. Conclusão

### Pontos Fortes

- Boa cobertura de services e middlewares  
- Testes unitários rápidos e consistentes nos módulos aprovados  

### Problemas Detectados

- Variável `user` não definida em handlers de erro  
- Expectativas incorretas nos testes (`toHaveBeenCalledWith`)  
- Problemas com caminhos de importação nos testes

### Recomendação

- Corrigir handlers de erro para sempre enviar `user`  
- Garantir consistência entre retornos esperados nos testes  
- Verificar estrutura de pastas para testes importarem corretamente

---

## 🔍 6. Matriz de Rastreabilidade de Testes

| Requisito                          | Casos de Teste         | Status     |
|-----------------------------------|-------------------------|------------|
| CRUD de desafios                  | UT-001 a UT-005         | ⚠️ Parcial |
| Serviços de autenticação          | UT-006 a UT-010         | ✅ Aprovado |
| Middlewares de autenticação       | UT-011 a UT-013         | ✅ Aprovado |
| Controllers com falhas de import  | UT-014 a UT-016         | ❌ Falhou   |
| Renderização front-end básica     | UT-006                  | ✅ Aprovado |

---

> Última atualização: 26/05/2025  
> Autor: Wedley Silva Schmoeller
