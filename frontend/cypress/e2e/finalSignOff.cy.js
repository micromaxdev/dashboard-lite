describe('empty spec', () => {

  it('Login QM', () => {

    //visit login page
    cy.visit('http://localhost:3000/')

    //enter email address 
    cy.get('.loginemail')
      .type('kris.godina@outlook.com')

    //enter password
    cy.get('.loginpassword')
      .type('test')

    //sign in
    cy.get('.loginButton').click()

    // Should direct to dashboard
    cy.url().should('include', 'http://localhost:3000/dashboard')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('finalSignOff', function() {
    /* ==== Generated with Cypress Studio ==== */
  
    cy.get('.BaseBadge-root > .MuiSvgIcon-root').click();
    cy.get(':nth-child(11) > .MuiBox-root > .MuiPaper-root > a > center > .MuiTypography-h6').click();
    cy.get('#filter-demo').click();
    cy.get('#filter-demo-option-0').click();
    cy.get(':nth-child(2) > .MuiButton-root').click();
    /* ==== End Cypress Studio ==== */
  });
})