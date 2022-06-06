describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: "Teppo Testi",
      username: "Teppo",
      password: "salasana"
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
    //cy.get('button').contains('login')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      //cy.contains('login').click()
      cy.get('#username').type('Teppo')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
  
      cy.contains('Logged in as Teppo Testi')
    })

    it('fails with wrong credentials', () => {
      //cy.contains('login').click()
      cy.get('#username').type('VääräNimi')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
  
      cy.contains('error: wrong credentials')
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  
})