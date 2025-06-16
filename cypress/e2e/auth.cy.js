describe("Tela de login", () => {
  it("exibe erro com credenciais inválidas", () => {
    cy.visit("http://localhost:3000");

    cy.get('input[name="email"]').type("max@email.com");
    cy.get('input[name="password"]').type("321");
    cy.get('button[type="submit"]').click();

    cy.contains("Credenciais inválidas");
  });
  it("redireciona para /challenges com credenciais válidas", () => {
    cy.visit("http://localhost:3000");

    cy.get('input[name="email"]').type("max@email.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:3000/challenges");
  });
  it("redireciona para /admin/dashboard com credenciais de administrador", () => {
    cy.visit("http://localhost:3000");

    cy.get('input[name="email"]').type("wedley@email.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/admin/dashboard");
  });
});

describe("Tela de cadastro", () => {
  it("exibe erro ao tentar cadastrar com email já existente", () => {
    cy.visit("http://localhost:3000/sign-up");

    cy.get('input[name="name"]').type("Max");
    cy.get('input[name="email"]').type("max@email.com");
    cy.get('input[name="password"]').type("123");
    cy.get('input[name="confirmPassword"]').type("123");
    cy.get('button[type="submit"]').click();
    cy.contains("Email já cadastrado");
  });
  it("senhas não coincidem", () => {
    cy.visit("http://localhost:3000/sign-up");

    cy.get('input[name="name"]').type("Usuário Teste");
    cy.get('input[name="email"]').type("novo@email.com");
    cy.get('input[name="password"]').type("123");
    cy.get('input[name="confirmPassword"]').type("321");
    cy.get('button[type="submit"]').click();
    cy.contains("As senhas não coincidem");
  });

  it("cadastra usuário com sucesso", () => {
    cy.visit("http://localhost:3000/sign-up");

    cy.get('input[name="name"]').type("Novo Usuário");
    cy.get('input[name="email"]').type("novo@email.com");
    cy.get('input[name="password"]').type("123");
    cy.get('input[name="confirmPassword"]').type("123");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});

describe("Logout", () => {
  it("deve redirecionar para a página de login após logout", () => {
    cy.visit("http://localhost:3000");
    cy.get('input[name="email"]').type("max@email.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();

    cy.get("#avatar-button").click();

    cy.get("#logout-button").click();

    cy.url().should("eq", "http://localhost:3000/");
  });
});
