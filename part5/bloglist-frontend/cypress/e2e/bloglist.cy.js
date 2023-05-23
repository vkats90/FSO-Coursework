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
      describe('and several blogs exist', () => {
        beforeEach(() => {
          cy.addBlog({ title: 'a test blog', author: 'cypress1', url: 'docs.cypress.io' })
          cy.addBlog({ title: 'test blog 2', author: 'cypress2', url: 'docs.cypress.io' })
          cy.addBlog({ title: 'another test blog', author: 'cypress3', url: 'docs.cypress.io' })
        })
        it("I can like one of them and increase it's number of likes", () => {
          cy.contains('a test blog').find('.visibleButton').click()
          cy.contains('a test blog').find('.likeButton').click()
          cy.contains('a test blog').find('.likes').should('have.text', '1 ')
          cy.contains('a test blog').find('.likeButton').click()
          cy.contains('a test blog').find('.likes').should('have.text', '2 ')
        })
        it('I can delete a blog I created', () => {
          cy.contains('a test blog').find('.visibleButton').click()
          cy.contains('a test blog').find('.deleteButton').click()
          cy.get('.blog_title').should('not.contain', 'a test blog')
        })
        it.only("a user who didn't create the blog can't see the delete button", () => {
          cy.contains('Logout').click()
          cy.login({ username: 'marsimillian77', password: '123456' })
          cy.contains('a test blog').find('.visibleButton').click()
          cy.contains('a test blog').should('not.contain', '.deleteButton')
        })
      })
    })
  })
})
