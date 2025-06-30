describe('Fluxos de Autenticação', () => {

  const BASE_URL = 'http://localhost:3000';

  beforeEach(() => {
    cy.fixture('user').as('userData');
  });

  it('Login com credenciais válidas redireciona corretamente', function () {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/login`,
      body: {
        email: this.userData.valid.email,
        password: this.userData.valid.password
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Status esperado: 200 - Recebido: ' + response.status);
    });
  });

  it('Login com credenciais inválidas mostra erro', function () {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/login`,
      body: {
        email: 'fake@email.com',
        password: 'senhaerrada'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Status esperado: 200 - Recebido: ' + response.status);
      cy.visit(BASE_URL);
      cy.get('body').should('contain', 'Credenciais inválidas');
    });
  });

  it('Cadastro de novo usuário', function () {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/signUp`,
      body: {
        name: 'Novo Usuário',
        email: `test${Date.now()}@mail.com`,
        password: '123456',
        confirmPassword: '123456'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Status esperado: 200 - Recebido: ' + response.status);
    });
  });

  it('Recuperar senha com email existente', function () {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/forgot-password`,
      body: {
        email: this.userData.valid.email
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Status esperado: 200 - Recebido: ' + response.status);
    });
  });

  it('Resetar senha com token inválido', function () {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/reset-password?token=tokeninvalido`,
      body: {
        newPassword: 'novasenha',
        confirmNewPassword: 'novasenha'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Status esperado: 200 - Recebido: ' + response.status);
    });
  });

});
