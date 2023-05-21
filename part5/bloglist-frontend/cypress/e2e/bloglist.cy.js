describe('Bloglist app', () => {
  beforeEach(() => {
    cy.resetDB()
    cy.visit('')
  })
  it('login form is shown', () => {
    cy.contains('Login')
    cy.get('input:first').parent().contains('username')
    cy.get('button').should('contain', 'Login')
  })
})
