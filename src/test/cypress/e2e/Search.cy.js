describe('End-to-End Search Test', () => {
    it('can search for a specific item', () => {
      // Visit the website
      cy.visit('http://localhost:3000');
  
      // Find the search input field and type a search query
      cy.get('input[name="search"]').type('Cypress End-to-End Testing');
  
      // Find the search button and click it
      cy.get('button[type="submit"]').click();
  
      // Assert that the search results are displayed
      cy.get('.search-results').should('be.visible');
  
      // Assert that the search results contain the expected text
      cy.contains('Cypress End-to-End Testing').should('be.visible');
    });
  });

  