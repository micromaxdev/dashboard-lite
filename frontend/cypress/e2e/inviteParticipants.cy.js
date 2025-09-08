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

  it('Invite Participants', () => {
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

    cy.get('body > div.MuiModal-root.MuiDialog-root.css-3dah0e-MuiModal-root-MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper.css-hz1bth-MuiDialog-container > div > div.MuiDialogContent-root.css-9yjdhh-MuiDialogContent-root > div > div.css-epd502 > div > div:nth-child(2) > div.PrivatePickersSlideTransition-root.css-1h8fkga > div > div:nth-child(3) > div:nth-child(6) > button').click();
    cy.get('body > div.MuiModal-root.MuiDialog-root.css-3dah0e-MuiModal-root-MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper.css-hz1bth-MuiDialog-container > div > div.MuiDialogActions-root.MuiDialogActions-spacing.css-hlj6pa-MuiDialogActions-root > button:nth-child(2)').click();
    
    cy.get('#meetingTime').click()
    .type('9:00am')
    cy.get('#meetingVenue').click()
    .type('Conference Room')
    cy.get('#root > main > div > div.MuiGrid-root.MuiGrid-container > main > div.makeStyles-mainSpacing-38 > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.css-1n52r5g-MuiGrid-root > div > div:nth-child(3) > div > form > div:nth-child(6) > button').click();
  })