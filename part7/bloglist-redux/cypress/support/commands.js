// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('resetDB', () => {
  cy.request('DELETE', `${Cypress.env('BACKEND')}/testing/reset`)
})

Cypress.Commands.add('addUser', () => {
  const newUser = {
    username: 'mars77',
    name: 'vlady',
    password: '12345',
  }
  const newUser2 = {
    username: 'marsimillian77',
    name: 'different vlady',
    password: '123456',
  }
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, newUser)
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, newUser2)
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, { username, password }).then(({ body }) => {
    localStorage.setItem('user', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('addBlog', ({ title, author, url }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: 'bearer ' + JSON.parse(localStorage.getItem('user')).token,
    },
  })
  cy.visit('')
})
