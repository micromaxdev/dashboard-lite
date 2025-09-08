describe('Raise Car', () => {

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

    it('Logout', () => {
        cy.get('.navBarListItem').eq(5).click()
    })

})


describe('Assign Owner', () => {

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
        // cy.get('#initial_car_id').click()
        // .type('1000')
        // cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div > button').click();
        cy.get('#num0').click();
        cy.get('#filter-demo').click()
        cy.get('#filter-demo-option-0').click({ force: true })
        cy.get('#assign').click();
    })

    it('Logout', () => {
        cy.get('.navBarListItem').eq(5).click()
    })

})

describe('Review and Classify', () => {

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
        cy.get('.reviewAndClassify').click();
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
})

describe('Root Cause Analysis', () => {

    it('Invite Participants', () => {

        cy.wait(9000)
        cy.get('.BaseBadge-root > .MuiSvgIcon-root').click();
        cy.get('.rootCauseAnalysis').click();
        cy.get('#inviteParticipants').click();
        cy.get('#filter-demo').click();
        cy.get('#filter-demo-option-0').click();
        cy.get('#demo-multiple-chip').click();
        cy.get('#menu- > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiMenu-paper.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiPopover-paper.css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper > ul > li:nth-child(1)').click();
        cy.get('#menu- > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiMenu-paper.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiPopover-paper.css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper > ul > li:nth-child(2)').click();
        cy.get('#menu- > div.MuiBackdrop-root.MuiBackdrop-invisible.css-g3hgs1-MuiBackdrop-root-MuiModal-backdrop').click({force: true});
        
        cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.css-1n52r5g-MuiGrid-root > div > div:nth-child(3) > div > div.MuiFormControl-root.css-1284o4y-MuiFormControl-root').click();
        cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.css-1n52r5g-MuiGrid-root > div > div:nth-child(3) > div > div.MuiFormControl-root.css-1284o4y-MuiFormControl-root').click();
        
        
        cy.get("#date").click()
            .type('13/12/2022')
        
        cy.get('#meetingTime').click()
        .type('9:00am')
        cy.get('#meetingVenue').click()
        .type('Conference Room')
        cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.css-1n52r5g-MuiGrid-root > div > div:nth-child(3) > div > form > div:nth-child(6) > button').click();
      })
  
    /* ==== Test Created with Cypress Studio ==== */
    it('determineRCA', function() {
  
      cy.wait(9000) 
      cy.get('.BaseBadge-root > .MuiSvgIcon-root > path').click();
      cy.get('.rootCauseAnalysis').click();
      cy.get('#determineRCA').click();
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


  describe('Corrective Action Resolution', () => {

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
    it('caResolution', function() {
      /* ==== Generated with Cypress Studio ==== */

      cy.get('.BaseBadge-root > .MuiSvgIcon-root > path').click();
      cy.get('.correctiveAction').click();
      cy.get('.MuiBox-root-68 > .MuiButton-root').click();
      cy.get('#filter-demo').click();
      cy.get('#filter-demo-option-0').click();
      cy.get('#outlined-multiline-static').click()
      .type('CAR Resolution test...');
      cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.css-1n52r5g-MuiGrid-root > div > div:nth-child(3) > div > div > div > div > center > form > div:nth-child(3) > button').click();
      /* ==== End Cypress Studio ==== */
    });

    it('Logout', () => {
        cy.get('.navBarListItem').eq(5).click()
    })

  })

  describe('CA Sign Off', () => {
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
    it('caSignOff', function() {
      /* ==== Generated with Cypress Studio ==== */
      
      cy.get('.BaseBadge-root > .MuiSvgIcon-root').click();
      cy.get('.caSignOff').click();
      cy.get('#filter-demo').click();
      cy.get('#filter-demo-option-0').click();
      cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.css-1n52r5g-MuiGrid-root > div > div:nth-child(3) > div > div > div > div > div.MuiBox-root.MuiBox-root-70 > div:nth-child(1) > div > div').click();
      cy.get('#dropdown0').click();
      cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.css-1n52r5g-MuiGrid-root > div > div:nth-child(3) > div > div > div > div > div.MuiBox-root.MuiBox-root-70 > div:nth-child(3) > button').click();
      /* ==== End Cypress Studio ==== */
    });

    it('Logout', () => {
        cy.get('.navBarListItem').eq(5).click()
    })

  })

  describe('Corrective Action Verification', () => {

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
      cy.get('.caVerification').click();
      cy.get('#filter-demo').click();
      cy.get('#filter-demo-option-0').click();
      cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.css-1n52r5g-MuiGrid-root > div > div:nth-child(3) > div > div:nth-child(2) > div > div > div > div.MuiFormControl-root.css-1mr5jpn-MuiFormControl-root > div > div').click();
      cy.get('#dropdown0').click();
      cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.css-1n52r5g-MuiGrid-root > div > div:nth-child(3) > div > div:nth-child(2) > div > div > div > div.MuiFormControl-root.css-hgcl9j-MuiFormControl-root > button').click();
      /* ==== End Cypress Studio ==== */
    });

    it('Logout', () => {
        cy.get('.navBarListItem').eq(5).click()
    })

  })

  describe('Finalize CAR', () => {

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
    it('finalizeWithNoAmend', function() {
      /* ==== Generated with Cypress Studio ==== */
  
      cy.get('.BaseBadge-badge').click();
      cy.get('.finalize').click();
      cy.get('#filter-demo').click();
      cy.get('#filter-demo-option-0').click();
      cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.css-1n52r5g-MuiGrid-root > div > div:nth-child(3) > div > div > div > div > div > div.MuiFormControl-root.css-1mr5jpn-MuiFormControl-root > div > div').click();
      cy.get('#dropdown1').click();
      cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.css-1n52r5g-MuiGrid-root > div > div:nth-child(3) > div > div > div > div > div > div.MuiFormControl-root.css-hgcl9j-MuiFormControl-root > button').click();
      /* ==== End Cypress Studio ==== */
    });
  })

  describe('Final Sign Off', () => {
  
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
      cy.get('.finalSignOff').click();
      cy.get('#filter-demo').click();
      cy.get('#filter-demo-option-0').click();
      cy.get(':nth-child(2) > .MuiButton-root').click();
      /* ==== End Cypress Studio ==== */
    });
  })