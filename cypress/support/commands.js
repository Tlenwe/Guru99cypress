// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('tariffPlanPopUpCheck', (rental, lMinutes, intMinutes, smsPack, minCharge, intMinCharge, smsCharge,checker) => {
    cy.on('window:alert',()=>{
        checker = true
    })
    cy.get('input#rental1').type(rental)
    cy.get('input#local_minutes').type(lMinutes)
    cy.get('input#inter_minutes').type(intMinutes)
    cy.get('input#sms_pack').type(smsPack)
    cy.get('input#minutes_charges').type(minCharge)
    cy.get('input#inter_charges').type(intMinCharge)
    cy.get('input#sms_charges').type(smsCharge)
    cy.wait(10)
    cy.get('input[type="submit"]').click().should(() => {expect(checker, 'Checking the required pop-up to appear.').to.be.true;})
    cy.get('input[type="reset"]').click()

})

Cypress.Commands.add('tariffPlanFillFields', (rental, lMinutes, intMinutes, smsPack, minCharge, intMinCharge, smsCharge) => {
    cy.get('input#rental1').type(rental)
    cy.get('input#local_minutes').type(lMinutes)
    cy.get('input#inter_minutes').type(intMinutes)
    cy.get('input#sms_pack').type(smsPack)
    cy.get('input#minutes_charges').type(minCharge)
    cy.get('input#inter_charges').type(intMinCharge)
    cy.get('input#sms_charges').type(smsCharge)
    cy.wait(10)
})

Cypress.Commands.add('addCustomerFillFields', (fname, lname,mail,address,phone) => {
    cy.get('input#fname').clear().type(fname)
    cy.get('input#lname').clear().type(lname)
    cy.get('input#email').clear().type(mail)
    cy.get('textarea#message').clear().type(address)
    cy.get('input#telephoneno').clear().type(phone)
    cy.wait(10)
})

Cypress.Commands.add('addCustomerPopUpCheck', (fname, lname,mail,address,phone, checker) => {
    cy.on('window:alert',()=>{
        checker = true
    })
    cy.get('input#fname').clear().type(fname)
    cy.get('input#lname').clear().type(lname)
    cy.get('input#email').clear().type(mail)
    cy.get('textarea#message').clear().type(address)
    cy.get('input#telephoneno').clear().type(phone)
    cy.wait(10)
    cy.get('input[type="submit"]').click().should(() => {expect(checker, 'Checking the required pop-up to appear.').to.be.true;})
})

Cypress.Commands.add('addCustomersSuccessCheck',() => {
    cy.get('h1').invoke('text').should((text) => {
        expect(text).to.contain("Access Details");
    });
    cy.get('h3').invoke('text').should((text) => {
        expect(text.trim().length).to.equal(6);
    });
    cy.go('back')
})

Cypress.Commands.add('handlingv6Error', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('v6 is not defined')) {
            return false
        }
    })
})

Cypress.Commands.add('addCustomersLabels', () => {
    cy.get('label#message').should('not.be.visible')
    cy.get('label#message50').should('not.be.visible')
    cy.get('label#message9').should('not.be.visible')
    cy.get('label#message3').should('not.be.visible')
    cy.get('label#message7').should('not.be.visible')
})

Cypress.Commands.add('paymentFillFields', (cardNum, month, year,cvv) => {
    cy.get('input#card_nmuber').clear().type(cardNum)
    cy.get('select#month').select(month)
    cy.get('select#year').select(year)
    cy.get('input#cvv_code').clear().type(cvv)
})

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })