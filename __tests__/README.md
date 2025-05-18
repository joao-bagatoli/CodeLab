# 🧪 Relatório de Testes Unitários

## 🧑‍🎓 Informações do Aluno

* **Nome do Aluno:** Wedley Silva Schmoeller
* **Matrícula:** 
* **Disciplina:** Teste de Software
* **Professor:** Diego Possamai
* **Nome do Sistema:** Codelab

## 📝 1. Introdução

**Objetivo do Documento:** Este documento detalha os testes unitários executados para validar as funcionalidades do sistema desenvolvido. A realização e a documentação abrangem os testes de front-end e back-end utilizando a ferramenta Jest.

**🛠️ Ferramentas Utilizadas:**

* **Front-end:** Jest (para execução dos testes unitários)
* **Back-end:** Jest (para execução dos testes unitários)

**⚙️ Breve Descrição do Sistema:** Descrição...

## 🚦 2. Execução dos Testes Unitários

A seguir, apresento os testes realizados no back-end e no front-end, juntamente com seus respectivos resultados e evidências.

### ⚙️ Testes de Back-End

| ID do Teste | Descrição                                                     | Tipo      | Ferramenta | Resultado Esperado                         | Resultado Obtido                               | Evidências |
| :---------- | :------------------------------------------------------------ | :-------- | :--------- | :----------------------------------------- | :----------------------------------------------- | :--------- |
| UT-001      | Renderizar a página de desafios com lista de desafios        | Back-end  | Jest       | Renderiza a lista de desafios              | ✅ Aprovado                                     |            |
| UT-002      | Renderizar a página de desafios com lista vazia em caso de erro ao buscar desafios | Back-end  | Jest       | Lista vazia com erro ao buscar desafios     | ❌ Falhou (Erro de variável não definida)        |            |
| UT-003      | Adicionar desafio e redirecionar para página de desafios     | Back-end  | Jest       | Desafio adicionado                           | ✅ Aprovado                                     |            |
| UT-004      | Atualizar desafio e redirecionar para página de desafios     | Back-end  | Jest       | Desafio atualizado                         | ✅ Aprovado                                     |            |
| UT-005      | Deletar desafio e redirecionar para página de desafios       | Back-end  | Jest       | Desafio deletado                           | ✅ Aprovado                                     |            |

### ✨ Testes de Front-End

| ID do Teste | Descrição                                 | Tipo       | Ferramenta | Resultado Esperado             | Resultado Obtido          | Evidências |
| :---------- | :---------------------------------------- | :--------- | :--------- | :----------------------------- | :------------------------ | :--------- |
| UT-006      | Componente de Header renderizado corretamente | Front-end  | Jest       | Título renderizado corretamente | ✅ Aprovado               |            |

## ⚠️ 3. Erros Encontrados

* **Erro:** `ReferenceError: user is not defined`
    * **Descrição:** Este erro ocorreu devido à ausência da definição da variável `user` nas funções de renderização de página, especificamente nos cenários de falha nas operações de buscar, adicionar, atualizar e deletar desafios.
    * **Local do Erro:** Nas funções `getChallenges`, `addChallenge`, `updateChallenge` e `deleteChallenge` dentro do controller de desafios.
    * **Solução:** Foi implementada uma correção nas funções para assegurar que o objeto `user` seja sempre passado para a renderização, mesmo em situações de erro.

* **Correção no Código:**

    ```javascript
    return res.render('admin/challenges', { user: req.session.user, challenges: null });
    ```

    Essa modificação garante que a variável `user` esteja sempre disponível no contexto da renderização, evitando o erro `user is not defined`.

## ✅ 4. Revisão dos Casos de Teste Planejados (da N1)

A tabela a seguir detalha os ajustes realizados nos casos de teste planejados inicialmente:

| ID do Teste | Descrição                                     | Status     | Observações                                                        |
| :---------- | :-------------------------------------------- | :--------- | :----------------------------------------------------------------- |
| UT-001      | Teste de renderização de lista de desafios   | Mantido    | Sem alterações.                                                    |
| UT-002      | Teste de renderização de lista vazia em caso de erro | Modificado | Foi necessário corrigir a falha de variável não definida.         |
| UT-003      | Teste de adição de desafio                   | Mantido    | Sem alterações.                                                    |
| UT-004      | Teste de atualização de desafio              | Mantido    | Sem alterações.                                                    |
| UT-005      | Teste de remoção de desafio                  | Mantido    | Sem alterações.                                                    |

## 📊 5. Métricas de Qualidade

* **Cobertura de Testes Unitários:** 85%
* **Total de Testes Executados:** 6 (5 back-end, 1 front-end)
* **Testes Aprovados:** 5
* **Testes Reprovados:** 1 (Erro ao renderizar lista vazia com falha na busca de desafios)
* **Média de Tempo de Execução:** 0.78s
* **Ferramentas Utilizadas:** Jest

## 🎯 6. Conclusão

**Módulos Bem Testados:**

* **Sistema de Desafios:** A maioria dos testes relacionados ao gerenciamento de desafios foi bem-sucedida. A exceção foi o cenário de erro ao renderizar a página de desafios quando a busca falha, que foi identificado e corrigido.

**Módulos que Precisam de Mais Atenção:**

* **Gestão de Desafios:** O principal ponto de atenção identificado foi a necessidade de garantir que o objeto `user` seja consistentemente passado para as renderizações de página, especialmente em situações de erro na manipulação de dados.

**Principais Desafios e Aprendizados:**

* O principal desafio encontrado foi a compreensão da estrutura de mocks do Jest e a simulação eficaz de serviços externos. Além disso, foi crucial ajustar a estratégia de tratamento de erros nas funções do controller para assegurar um comportamento robusto da aplicação em diferentes cenários.