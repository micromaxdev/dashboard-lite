it('Login owner', () => {

    //visit login page
    cy.visit('http://localhost:3000/')

    //enter email address 
    cy.get('.loginemail')
      .type('krisg5ax8@hotmail.com')

    //enter password
    cy.get('.loginpassword')
      .type('test')

    //sign in
    cy.get('.loginButton').click()

    // Should direct to dashboard
    cy.url().should('include', 'http://localhost:3000/dashboard')
  })

  it('Review and classify', () => {
    cy.get('.BaseBadge-root > .MuiSvgIcon-root').click();
    cy.get(':nth-child(2) > .MuiBox-root > .MuiPaper-root > a > center > .MuiTypography-h6').click();
    cy.get('#filter-demo').click();
    cy.get('#filter-demo-option-0').click();
    cy.get('body').click();
    cy.get('#rACConsequence').click();
    cy.get('#dropdown0').click();
    cy.get('#rACImpact').click();
    cy.get('#dropdown0').click();
    cy.get('#rACUrgency').click();
    cy.get('#dropdown0').click();
    cy.get('#rACActionLeadTime').click();
    cy.get('#dropdown0').click();

    cy.get('.MuiButton-root').click();
  })