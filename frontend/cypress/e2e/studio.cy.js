// Code from Real World App (RWA)
describe('Cypress Studio Demo', () => {

  it('create new transaction', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');


    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#email').clear('k');
    cy.get('#email').type('krisg5ax8@hotmail.com');
    cy.get('#password').clear('t');
    cy.get('#password').type('test');
    cy.get('.MuiButton-label').click();

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.BaseBadge-root > .MuiSvgIcon-root > path').click();
    cy.get(':nth-child(3) > .MuiBox-root > .MuiPaper-root > a > center > .MuiTypography-h6').click();
    cy.get('.MuiBox-root-70 > .MuiButton-root').click();
    cy.get('[data-testid="ArrowDropDownIcon"] > path').click();
    cy.get('#filter-demo-option-0').click();
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > #outlined-multiline-static')
    .type('Car crash')
    cy.get(':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > #outlined-multiline-static')
    .type('Church street')
    cy.get(':nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root > #outlined-multiline-static')
    .type('9:05am 3rd September')
    cy.get(':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root > #outlined-multiline-static')
    .type('Car crash 2 people involved')
    cy.get(':nth-child(5) > .MuiFormControl-root > .MuiOutlinedInput-root > #outlined-multiline-static')
    .type('Sensor malfunction')
    cy.get(':nth-child(6) > .MuiFormControl-root > .MuiOutlinedInput-root')
    .type('Unknown')
    cy.get(':nth-child(7) > .MuiFormControl-root > .MuiOutlinedInput-root > #outlined-multiline-static')
    .type('Possibly from overheating')
    cy.get('.MuiButton-root').click();
    /* ==== End Cypress Studio ==== */
  })
})