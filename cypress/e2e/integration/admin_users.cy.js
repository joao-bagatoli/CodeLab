describe('Admin - Gerenciamento de Usuários', () => {

  const BASE_URL = 'http://localhost:3000';

  beforeEach(() => {
    cy.fixture('admin').as('adminData');
  });

  it('Deve listar todos os usuários', function () {
    cy.request({
      method: 'GET',
      url: `${BASE_URL}/admin/users`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Status esperado: 200 - Recebido: ' + response.status);
    });
  });

  it('Deve adicionar um novo usuário', function () {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/admin/users`,
      body: {
        name: `NovoUsuário_${Date.now()}`,
        email: `novo${Date.now()}@mail.com`,
        isAdmin: 'on'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Status esperado: 200 - Recebido: ' + response.status);
    });
  });

  it('Deve atualizar permissões de um usuário', function () {
    // Pré-condição: cria um usuário para atualizar depois
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/admin/users`,
      body: {
        name: `UsuarioUpdate_${Date.now()}`,
        email: `update${Date.now()}@mail.com`,
        isAdmin: 'off'
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(200);
      // Supondo que seu serviço retorna a lista pra obter ID
      cy.request(`${BASE_URL}/admin/users`).then((getRes) => {
        const users = Cypress.$(getRes.body).toArray();
        const userId = users[users.length - 1].user_id || 1; // ajuste conforme retorno
        cy.request({
          method: 'POST',
          url: `${BASE_URL}/admin/users/${userId}`,
          body: { isAdmin: 'on' },
          failOnStatusCode: false
        }).then((updateRes) => {
          expect(updateRes.status).to.eq(200);
          cy.log('Status esperado: 200 - Recebido: ' + updateRes.status);
        });
      });
    });
  });

  it('Deve deletar um usuário', function () {
    // Pré-condição: cria um usuário para deletar depois
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/admin/users`,
      body: {
        name: `UsuarioDelete_${Date.now()}`,
        email: `delete${Date.now()}@mail.com`,
        isAdmin: 'off'
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(200);
      // Pega o ID para deletar
      cy.request(`${BASE_URL}/admin/users`).then((getRes) => {
        const users = Cypress.$(getRes.body).toArray();
        const userId = users[users.length - 1].user_id || 1; // ajuste conforme retorno
        cy.request({
          method: 'POST',
          url: `${BASE_URL}/admin/users/${userId}/delete`,
          failOnStatusCode: false
        }).then((deleteRes) => {
          expect(deleteRes.status).to.eq(200);
          cy.log('Status esperado: 200 - Recebido: ' + deleteRes.status);
        });
      });
    });
  });

});
