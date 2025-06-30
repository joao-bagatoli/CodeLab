describe('Avatar', () => {
  it('deve exibir as iniciais do usuário no avatar', () => {
    cy.visit('http://localhost:3000');
    

    cy.get('input[name="email"]').type('wedley@email.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click();

    cy.get('#avatar').should('have.text', 'WE');
    cy.get('#avatar').should('have.class', 'bg-slate-700');
  });
});