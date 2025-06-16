describe("Acessar desafios", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    // Faz login
    cy.get('input[name="email"]').type("max@email.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/challenges");
  });
  it("deve exibir os desafios do usuário", () => {
    cy.get("#challenges", { timeout: 10000 }).should("exist");
    cy.get("#challenges").children().should("have.length.greaterThan", 0);
  });

  it("deve permitir que o usuário visualize detalhes de um desafio", () => {
    cy.get("#challenges").children().first().as("firstChallenge");
    cy.get("@firstChallenge").click();
    cy.url().should("include", "/challenges/");
    cy.get("#challenge-details").should("exist");
  });
});

describe("Filtrar desafios por dificuldade", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    cy.get('input[name="email"]').type("max@email.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/challenges");
    cy.get("#challenges", { timeout: 10000 }).should("exist");
    cy.get("#challenges").children().should("have.length.greaterThan", 0);
  });

  const dificuldades = ["all", "easy", "medium", "hard"];

  dificuldades.forEach((nivel) => {
    it(`deve exibir desafios com dificuldade: ${nivel}`, () => {
      cy.get(`[data-filter="${nivel}"]`).click();
      cy.wait(1000); 

      if (nivel === "all") {
        cy.get("#challenges").children().should("have.length.greaterThan", 0);
      } else {
        cy.get("#challenges")
          .children()
          .each(($card) => {
            cy.wrap($card)
              .find('[data-difficulty]')
              .invoke('attr', 'data-difficulty')
              .should('eq', nivel);
          });
        }
      });
    });
  });
