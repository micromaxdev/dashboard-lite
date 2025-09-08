describe('My First Test', () => {

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


  it('Raise a car', () => {

    // click on raise a car
    cy.get('.navBarListItem').eq(1).click()

    //enter primary classification
    cy.get('.primaryClassification').click()

    //select option
    cy.contains("Hazard").click()

    //next and ensure back button is working
    cy.get('.carContinueButton').should('have.length', 1).click()
    cy.wait(200)
    cy.contains('Back').should('have.length', 1).click()
    cy.get('.carContinueButton').should('have.length', 1).click()


    //enter secondary classification
    cy.get('.secondaryClassification').should('have.length', 1).click()
    cy.contains("Incident").click()
    cy.contains("Non-conformance/Breach").click()
    cy.get('.carContinueButton').should('have.length', 1).click({ force: true })

    cy.wait(400)
    cy.get('.carReasonsCheckbox').eq(1).click({ force: true })
    cy.get('.carReasonsCheckbox').eq(2).click({ force: true })
    cy.get('.carReasonsCheckbox').eq(3).click({ force: true })
    cy.get('.carReasonsCheckbox').eq(4).click({ force: true })

    //continue
    cy.get('.carContinueButton').should('have.length', 1).click({ force: true })
    //back
    cy.contains('Back').should('have.length', 1).click({ force: true })
    //continue again
    cy.get('.carContinueButton').should('have.length', 1).click({ force: true })

    //select contact type
    cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-12.MuiGrid-grid-md-6 > div > div > div > div > div:nth-child(7) > div > div > div > div > div:nth-child(1) > div.MuiFormControl-root.css-1h8wlim-MuiFormControl-root > div').click()

    //select employee
    cy.contains("Employee").click()

    //name
    cy.get('.srcContactContactName')
      .type('Mary Jane')

    //company name
    cy.get('.srcContactCompanyName')
      .type('Company XYZ')

    //Location
    cy.get('.srcContactLocation')
      .type('North Wollongong')

    //Phone
    cy.get('.srcContactPhone')
      .type('4245444')

    //Mobile
    cy.get('.srcContactMobile')
      .type('0402546845')

    //Email
    cy.get('.srcContactEmail')
      .type('mjane@gmail.com')

    //Reference Type
    cy.get('.srcContactReferenceType')
      .type('RMA')

    //Reference Number
    cy.get('.srcContactReferenceNumber')
      .type('A123')

    //continue-->back-->continue again
    cy.get('.carContinueButton').should('have.length', 1).click({ force: true })
    cy.contains('Back').should('have.length', 1).click({ force: true })
    cy.get('.carContinueButton').should('have.length', 1).click({ force: true })

    //Title
    cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-12.MuiGrid-grid-md-6 > div > div > div > div > div:nth-child(9) > div > div > div > div > div:nth-child(1) > div > div > div')
      .type('Sensor Inaccurate')

    //continue-->back-->continue again
    cy.get('.carContinueButton').should('have.length', 1).click({ force: true })
    cy.contains('Back').should('have.length', 1).click({ force: true })
    cy.get('.carContinueButton').should('have.length', 1).click({ force: true })

    //Description
    cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-12.MuiGrid-grid-md-6 > div > div > div > div > div:nth-child(11) > div > div > div > div > div:nth-child(1) > div > div > div')
      .type('Sensor did not work properly and caused a car crash')

    //continue-->back-->continue again
    cy.get('.carContinueButton').should('have.length', 1).click({ force: true })
    cy.contains('Back').should('have.length', 1).click({ force: true })
    cy.get('.carContinueButton').should('have.length', 1).click({ force: true })

    //Remedy/response taken
    cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-12.MuiGrid-grid-md-6 > div > div > div > div > div:nth-child(13) > div > div > div > div > div:nth-child(1) > div > div > div')
      .type('Sensor removed and manual traffic control in progress')

    //continue-->back-->continue again
    cy.get('.carContinueButton').should('have.length', 1).click({ force: true })
    cy.contains('Back').should('have.length', 1).click({ force: true })
    cy.get('.carContinueButton').should('have.length', 1).click({ force: true })

    //Suggested immediate action
    cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-12.MuiGrid-grid-md-6 > div > div > div > div > div:nth-child(15) > div > div > div > div > div:nth-child(1) > div > div > div')
      .type('Identify the issue causing timing fault')

    //continue-->back-->continue again
    cy.get('.carContinueButton').should('have.length', 1).click({ force: true })

  })

  it('Cancel CAR', () => {
    cy.get('.notificationsIcon').click()
    cy.get('.pendingAssignment').click()
    cy.get('.cancelRequest').eq(0).click()
  })

  it('Logout', () => {

    // click on logout
    cy.get('.navBarListItem').eq(5).click()
  })

})