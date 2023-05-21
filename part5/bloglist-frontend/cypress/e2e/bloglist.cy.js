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
    describe('When logged in', function () {
      beforeEach(() => {
        cy.login({ username: 'mars77', password: '12345' })
      })

      it('A blog can be created', () => {
        cy.get('button').contains('Add a note').click()
        cy.contains('Title').find('input').type('A note created with cypress')
        cy.contains('Author').find('input').type('Cypress')
        cy.contains('URL').find('input').type('https://docs.cypress.io/')
        cy.get('button').contains('Submit').click()
        cy.get('.notification').should('contain', 'Added blog A note created with cypress')
        cy.get('.blog_title')
          .contains('A note created with cypress')
          .should('have.css', 'border', '1px solid rgb(0, 0, 0)')
      })
    })
  })
})
