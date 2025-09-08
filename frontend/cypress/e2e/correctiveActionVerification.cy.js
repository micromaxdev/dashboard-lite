describe('empty spec', () => {

  it('Login employee', () => {

    //visit login page
    cy.visit('http://localhost:3000/')

    //enter email address 
    cy.get('.loginemail')
      .type('krisgodina@outlook.com')

    //enter password
    cy.get('.loginpassword')
      .type('test')

    //sign in
    cy.get('.loginButton').click()

    // Should direct to dashboard
    cy.url().should('include', 'http://localhost:3000/dashboard')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('caVerification', function() {
    /* ==== Generated with Cypress Studio ==== */

    cy.get('.BaseBadge-badge').click();
    cy.get(':nth-child(6) > .MuiBox-root > .MuiPaper-root').click();
    cy.get('#filter-demo').click();
    cy.get('#filter-demo-option-0').click();
    cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.css-1n52r5g-MuiGrid-root > div > div:nth-child(3) > div > div:nth-child(2) > div > div > div > div.MuiFormControl-root.css-1mr5jpn-MuiFormControl-root > div > div').click();
    cy.get('#dropdown0').click();
    cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.css-1n52r5g-MuiGrid-root > div > div:nth-child(3) > div > div:nth-child(2) > div > div > div > div.MuiFormControl-root.css-hgcl9j-MuiFormControl-root > button').click();
    /* ==== End Cypress Studio ==== */
  });
})