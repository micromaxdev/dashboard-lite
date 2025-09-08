describe('empty spec', () => {
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

  /* ==== Test Created with Cypress Studio ==== */
  it('determineRCA', function() {

    cy.get('.BaseBadge-root > .MuiSvgIcon-root > path').click();
    cy.get(':nth-child(3) > .MuiBox-root > .MuiPaper-root > a > center > .MuiTypography-h6').click();
    cy.get('.MuiBox-root-70 > .MuiButton-root').click();
    cy.get('#filter-demo').click();
    cy.get('#filter-demo-option-0').click();
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > #outlined-multiline-static').click()
    .type('testing what');
    cy.get(':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > #outlined-multiline-static').click()
    .type('testing where');
    cy.get(':nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > #outlined-multiline-static').click()
    .type('testing when');
    cy.get(':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > #outlined-multiline-static').click()
    .type('testing who');
    cy.get(':nth-child(5) > .MuiFormControl-root > .MuiOutlinedInput-root > #outlined-multiline-static').click()
    .type('testing why');
    cy.get(':nth-child(6) > .MuiFormControl-root > .MuiOutlinedInput-root > #outlined-multiline-static').click()
    .type('testing how');
    cy.get(':nth-child(7) > .MuiFormControl-root > .MuiOutlinedInput-root > #outlined-multiline-static').click()
    .type('testing probable cause');
    cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.css-1n52r5g-MuiGrid-root > div > div:nth-child(3) > div > div > div > div > center:nth-child(2) > form > div:nth-child(3) > button').click();
    /* ==== End Cypress Studio ==== */
  });
})