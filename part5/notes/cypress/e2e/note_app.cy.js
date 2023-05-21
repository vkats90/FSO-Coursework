describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Vlad Kats',
      username: 'mars77',
      password: '12345',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })
  it('login fails with wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('mars77')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Vlad Kats logged in')
    cy.contains('Matti Luukkainen logged in').should('not.exist')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })
  it('login form can be opened', function () {
    cy.contains('log in').click()
    cy.get('#username').type('mars77')
    cy.get('#password').type('12345')
    cy.get('#login-button').click()

    cy.contains('Vlad Kats logged in')
  })
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mars77', password: '12345' })
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        it('one of those can be made important', function () {
          cy.contains('second note').parent().find('button').as('theButton')
          cy.get('@theButton').click()
          cy.get('@theButton').should('contain', 'make not important')
        })
      })
    })
  })
})
