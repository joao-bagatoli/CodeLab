describe('Admin - Gerenciamento de Categorias', () => {

  const BASE_URL = 'http://localhost:3000';

  beforeEach(() => {
    cy.fixture('category').as('categoryData');
  });

  it('Deve listar todas as categorias', () => {
    cy.request({
      method: 'GET',
      url: `${BASE_URL}/admin/categories`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Status esperado: 200 - Recebido: ' + response.status);
    });
  });

  it('Deve adicionar uma nova categoria', function () {
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/admin/categories`,
      body: {
        name: `Categoria_${Date.now()}`,
        description: 'Descrição de teste'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Status esperado: 200 - Recebido: ' + response.status);
    });
  });

  it('Deve atualizar uma categoria', function () {
    // Pré-condição: cria uma categoria
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/admin/categories`,
      body: {
        name: `CategoriaUpdate_${Date.now()}`,
        description: 'Descrição original'
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(200);

      // Supondo que GET retorna JSON com id
      cy.request(`${BASE_URL}/admin/categories`).then((getRes) => {
        // Se a resposta for render HTML, precisará adaptar ou usar `cy.visit`
        // Aqui assumindo resposta JSON
        const categories = getRes.body;
        const lastCategory = categories[categories.length - 1];
        const categoryId = lastCategory.id || lastCategory.category_id || 1;

        cy.request({
          method: 'POST',
          url: `${BASE_URL}/admin/categories/${categoryId}`,
          body: {
            name: `CategoriaAtualizada_${Date.now()}`,
            description: 'Nova descrição'
          },
          failOnStatusCode: false
        }).then((updateRes) => {
          expect(updateRes.status).to.eq(200);
          cy.log('Status esperado: 200 - Recebido: ' + updateRes.status);
        });
      });
    });
  });

  it('Deve deletar uma categoria', function () {
    // Pré-condição: cria uma categoria
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/admin/categories`,
      body: {
        name: `CategoriaDelete_${Date.now()}`,
        description: 'Descrição para deletar'
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(200);

      // Pega ID para deletar
      cy.request(`${BASE_URL}/admin/categories`).then((getRes) => {
        const categories = getRes.body;
        const lastCategory = categories[categories.length - 1];
        const categoryId = lastCategory.id || lastCategory.category_id || 1;

        cy.request({
          method: 'POST',
          url: `${BASE_URL}/admin/categories/${categoryId}/delete`,
          failOnStatusCode: false
        }).then((deleteRes) => {
          expect(deleteRes.status).to.eq(200);
          cy.log('Status esperado: 200 - Recebido: ' + deleteRes.status);
        });
      });
    });
  });

});
