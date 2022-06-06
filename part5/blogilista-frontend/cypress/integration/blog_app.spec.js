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
    cy.get('#login-button').contains('login')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('Teppo')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
  
      cy.contains('Logged in as Teppo Testi')
    })

    it('fails with wrong credentials', () => {
      cy.get('#username').type('VääräNimi')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('error: wrong credentials')
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3000/api/login', {
        username: 'Teppo', password: 'salasana'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', () => {
      cy.get('button').contains('Create blog').click()

      cy.get('#title-input').type('Kuinka lisätä blogi cypressistä')
      cy.get('#author-input').type('Mluukai')
      cy.get('#url-input').type('https://fullstackopen.com/osa5/end_to_end_testaus')
      cy.get('#submit-button').click()

      // Luotu blogi näkyy blogilistalla
      cy.get('#bloglist').contains('Kuinka lisätä blogi cypressistä by Mluukai')
      cy.get('#notification')
        .contains('Blog: "Kuinka lisätä blogi cypressistä" added to the bloglist')
        .should('have.css', 'color', 'rgb(16, 105, 16)')
      
    })
    describe('When a blog is in bloglist', () => {
      beforeEach(() => {
        // BLOG
        cy.get('button').contains('Create blog').click()

        cy.get('#title-input').type('Blogitesti')
        cy.get('#author-input').type('Mluukai')
        cy.get('#url-input').type('https://fullstackopen.com')
        cy.get('#submit-button').click()
      })

      it('blog can be liked', () => {
        cy.get('#view-button').click()
        cy.contains('Likes: 0')
        cy.get('#like-button').click().click()
        cy.contains('Likes: 2')
      })

      it('blog owner can delete blog', () => {
        cy.get('#bloglist').contains('Blogitesti by Mluukai')
        cy.get('#view-button').click()
        cy.get('#delete-button').click()
        cy.get('#bloglist').contains('Blogitesti by Mluukai').should('not.exist')
      })

      it('blogs are in ascending order by likes', () => {

        const titles = ['Eka', 'Toka']
        for(const title of titles){
          cy.get('button').contains('Create blog').click()
          cy.get('#title-input').type(title)
          cy.get('#author-input').type('Mluukai')
          cy.get('#url-input').type('https://fullstackopen.com')
          cy.get('#submit-button').click()
        }
        
        cy.get('.blog').eq(0).should('contain', 'Blogitesti')
        cy.get('.blog').eq(1).should('contain', 'Eka')
        cy.wait(100)
        cy.get('.blog').eq(2).should('contain', 'Toka')

        cy.get('.blog').eq(1).contains('view').click()
        cy.get('.blog').eq(1).contains('like').click()
        cy.wait(100)

        cy.get('.blog').eq(0).should('contain', 'Eka')
        cy.get('.blog').eq(1).should('contain', 'Blogitesti')
        cy.get('.blog').eq(2).should('contain', 'Toka')

        cy.get('.blog').eq(2).contains('view').click()
        cy.get('.blog').eq(2).contains('like').click().click()
        cy.wait(100)

        cy.get('.blog').eq(0).should('contain', 'Toka')
        cy.get('.blog').eq(1).should('contain', 'Eka')
        cy.get('.blog').eq(2).should('contain', 'Blogitesti')

      })

    })
  })

  
})