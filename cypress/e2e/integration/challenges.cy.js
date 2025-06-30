describe('Desafios - Fluxo Admin e Usuário', () => {

  const BASE_URL = 'http://localhost:3000';

  beforeEach(() => {
    cy.fixture('challenge').as('challengeData');
  });

  it('Deve listar todos os desafios (Admin)', () => {
    cy.request({
      method: 'GET',
      url: `${BASE_URL}/admin/challenges`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`Status esperado: 200 - Recebido: ${response.status}`);
    });
  });

  it('Deve listar todos os desafios (Usuário)', () => {
    cy.request({
      method: 'GET',
      url: `${BASE_URL}/challenges`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`Status esperado: 200 - Recebido: ${response.status}`);
    });
  });

  it('Deve adicionar um novo desafio', function () {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/admin/challenges`,
      body: {
        title: `Desafio_${Date.now()}`,
        description: 'Descrição do desafio',
        difficulty: 'easy',
        category: 1
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`Status esperado: 200 - Recebido: ${response.status}`);
    });
  });

  it('Deve atualizar um desafio', function () {
    // Cria um desafio para atualizar
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/admin/challenges`,
      body: {
        title: `DesafioUpdate_${Date.now()}`,
        description: 'Descrição original',
        difficulty: 'medium',
        category: 1
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(200);

      // Supondo que GET retorna JSON com ID ou use o ID retornado do POST
      cy.request(`${BASE_URL}/admin/challenges`).then((getRes) => {
        const challenges = getRes.body; // Se render HTML, precisa adaptar
        const last = challenges[challenges.length - 1];
        const id = last.id || last.challenge_id || 1;

        cy.request({
          method: 'POST',
          url: `${BASE_URL}/admin/challenges/${id}`,
          body: {
            title: `DesafioAtualizado_${Date.now()}`,
            description: 'Nova descrição',
            difficulty: 'hard',
            category: 1
          },
          failOnStatusCode: false
        }).then((updateRes) => {
          expect(updateRes.status).to.eq(200);
          cy.log(`Status esperado: 200 - Recebido: ${updateRes.status}`);
        });
      });
    });
  });

  it('Deve deletar um desafio', function () {
    // Cria um desafio para deletar
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/admin/challenges`,
      body: {
        title: `DesafioDelete_${Date.now()}`,
        description: 'Descrição delete',
        difficulty: 'easy',
        category: 1
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(200);

      cy.request(`${BASE_URL}/admin/challenges`).then((getRes) => {
        const challenges = getRes.body;
        const last = challenges[challenges.length - 1];
        const id = last.id || last.challenge_id || 1;

        cy.request({
          method: 'POST',
          url: `${BASE_URL}/admin/challenges/${id}/delete`,
          failOnStatusCode: false
        }).then((deleteRes) => {
          expect(deleteRes.status).to.eq(200);
          cy.log(`Status esperado: 200 - Recebido: ${deleteRes.status}`);
        });
      });
    });
  });

  it('Deve carregar detalhes de um desafio', function () {
    // Precisa de um desafio existente
    cy.request(`${BASE_URL}/admin/challenges`).then((getRes) => {
      const challenges = getRes.body;
      const last = challenges[challenges.length - 1];
      const id = last.id || last.challenge_id || 1;

      cy.request({
        method: 'GET',
        url: `${BASE_URL}/challenges/${id}`,
        failOnStatusCode: false
      }).then((detailRes) => {
        expect(detailRes.status).to.eq(200);
        cy.log(`Status esperado: 200 - Recebido: ${detailRes.status}`);
      });
    });
  });

  it('Deve enviar código para validação', function () {
    // Supondo que exista ao menos um desafio
    cy.request(`${BASE_URL}/admin/challenges`).then((getRes) => {
      const challenges = getRes.body;
      const last = challenges[challenges.length - 1];
      const id = last.id || last.challenge_id || 1;

      cy.request({
        method: 'POST',
        url: `${BASE_URL}/challenges/${id}/submit`,
        body: {
          language: 'javascript',
          code: 'function teste() { return true; }'
        },
        failOnStatusCode: false
      }).then((submitRes) => {
        expect(submitRes.status).to.eq(200);
        cy.log(`Status esperado: 200 - Recebido: ${submitRes.status}`);
      });
    });
  });

});
