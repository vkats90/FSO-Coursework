describe('Bloglist app', () => {
  beforeEach(() => {
    cy.resetDB() //custom command in support/commands.js
    cy.addUser() //custom command in support/commands.js
    cy.visit('')
  })
  it('login form is shown', () => {
    cy.contains('Login')
    cy.get('input:first').parent().contains('username')
    cy.get('button').should('contain', 'Login')
  })
  describe('Login', () => {
    it('fails with wrong credentials', () => {
      cy.contains('username').find('input').type('mars77')
      cy.contains('password').find('input').type('wrong')
      cy.get('button').contains('Login').click()
      cy.contains('Username or Password are incorrect').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      )
    })
    it('succeeds with correct credentials', () => {
      cy.contains('username').find('input').type('mars77')
      cy.contains('password').find('input').type('12345')
      cy.get('button').contains('Login').click()
      cy.contains('mars77 logged in')
      cy.get('button').should('contain', 'Logout').and('contain', 'Add a note')
    })
  })
})
