it('Login qm', () => {

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

it('Assign CAR', () => {
    cy.get('.notificationsIcon').click()
    cy.get('.assignCar').click()
    cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-1.MuiGrid-spacing-md-3.css-1ibwkvh-MuiGrid-root > div > div > div.MuiCardActions-root.MuiCardActions-spacing.css-1t6e9jv-MuiCardActions-root > div > button').click()
    cy.get('body > div.MuiModal-root.MuiDialog-root.css-zw3mfo-MuiModal-root-MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper.css-hz1bth-MuiDialog-container > div > div.MuiDialogContent-root.css-ypiqx9-MuiDialogContent-root > div > div > div > div > button > svg').click({ force: true })
    cy.get('#filter-demo-option-0').click({ force: true })
    cy.get('body > div.MuiModal-root.MuiDialog-root.css-zw3mfo-MuiModal-root-MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper.css-hz1bth-MuiDialog-container > div > div.MuiDialogActions-root.MuiDialogActions-spacing.css-hlj6pa-MuiDialogActions-root > form > div:nth-child(3) > button').click({ force: true })
})