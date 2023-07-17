describe('Add Tariff Plan +', () => {

  it('Visual check', () => {
    cy.visit('https://demo.guru99.com/telecom/addtariffplans.php').wait(10)

    cy.log('Checking text fields')
    cy.get('input#rental1')
        .should('be.visible').and('have.attr', 'maxlength', '5')
        .should('have.attr', 'placeholder', 'Monthly Rental')
    cy.get('input#local_minutes')
        .should('be.visible').and('have.attr', 'maxlength', '5')
        .should('have.attr', 'placeholder', 'Free Local Minutes')
    cy.get('input#inter_minutes')
        .should('be.visible').and('have.attr', 'maxlength', '5')
        .should('have.attr', 'placeholder', 'Free International Minutes')
    cy.get('input#sms_pack')
        .should('be.visible').and('have.attr', 'maxlength', '5')
        .should('have.attr', 'placeholder', 'Free SMS Pack')
    cy.get('input#minutes_charges')
        .should('be.visible').and('have.attr', 'maxlength', '3')
        .should('have.attr', 'placeholder', 'Local Per Minutes Charges')
    cy.get('input#inter_charges')
        .should('be.visible').and('have.attr', 'maxlength', '3')
        .should('have.attr', 'placeholder', 'International Per Minutes Charges')
    cy.get('input#sms_charges')
        .should('be.visible').and('have.attr', 'maxlength', '3')
        .should('have.attr', 'placeholder', 'SMS Per Charges')

    cy.log('Checking buttons')
    cy.get('input[type="submit"]')
        .should('be.visible').and('be.enabled')
        .and('have.attr', 'value', 'Submit')
    cy.get('input[type="reset"]')
        .should('be.visible').and('be.enabled')
        .and('have.attr', 'value', 'Reset')

    cy.log("Checking labels and banners")
    cy.get('label#message2')
        .should('not.be.visible')
    cy.get('label#message3')
        .should('not.be.visible')
    cy.get('label#message4')
        .should('not.be.visible')
    cy.get('label#message5')
        .should('not.be.visible')
    cy.get('label#message6')
        .should('not.be.visible')
    cy.get('label#message7')
        .should('not.be.visible')
    cy.get('label#message8')
        .should('not.be.visible')

    cy.get('h1')
        .should('be.visible').and('have.text', 'Add Tariff Plans')
  });

  it('Checking valid inputs', function () {
      cy.visit('https://demo.guru99.com/telecom/addtariffplans.php').wait(10)

      cy.log("Checking Valid Inputs")
      cy.tariffPlanFillFields(1, 1, 1, 1, 1, 1, 1)
      cy.get('input[type="submit"]').click()
      cy.get('h2')
          .should('have.text', 'Congratulation you add Tariff Plan')
      cy.go('back')
      cy.get('input[type="reset"]').click()
  });

  it('Reset button functionality', function () {
      cy.visit('https://demo.guru99.com/telecom/addtariffplans.php').wait(10)

      cy.log('Reset Button functionality')
      let checker = false
      cy.on('window:alert', () => {checker = true})
      cy.tariffPlanFillFields(1, 1, 1, 1, 1, 1, 1)
      cy.get('input[type="reset"]').click()
      cy.get('input[type="submit"]').click()
          .should(() => {
              expect(checker, 'Checking the required pop-up to appear.').to.be.true
          })
  });

});

describe('Add Tariff Plan -', function () {

    it('Checking invalid inputs', function () {
        cy.visit('https://demo.guru99.com/telecom/addtariffplans.php').wait(10)

        cy.tariffPlanFillFields('a', 'a', 'a', 'a', 'a', 'a', 'a')
        cy.get('label#message2')
            .should('be.visible').and('have.text', 'Characters are not allowed')
        cy.get('label#message3')
            .should('be.visible').and('have.text', 'Characters are not allowed')
        cy.get('label#message4')
            .should('be.visible').and('have.text', 'Characters are not allowed')
        cy.get('label#message5')
            .should('be.visible').and('have.text', 'Characters are not allowed')
        cy.get('label#message6')
            .should('be.visible').and('have.text', 'Characters are not allowed')
        cy.get('label#message7')
            .should('be.visible').and('have.text', 'Characters are not allowed')
        cy.get('label#message8')
            .should('be.visible').and('have.text', 'Characters are not allowed')
        cy.get('input[type="reset"]').click()

        let symbol = "$"
        cy.tariffPlanFillFields(symbol, symbol, symbol, symbol, symbol, symbol, symbol)
        cy.get('label#message2')
            .should('be.visible').and('have.text', 'Special characters are not allowed')
        cy.get('label#message3')
            .should('be.visible').and('have.text', 'Special characters are not allowed')
        cy.get('label#message4')
            .should('be.visible').and('have.text', 'Special characters are not allowed')
        cy.get('label#message5')
            .should('be.visible').and('have.text', 'Special characters are not allowed')
        cy.get('label#message6')
            .should('be.visible').and('have.text', 'Special characters are not allowed')
        cy.get('label#message7')
            .should('be.visible').and('have.text', 'Special characters are not allowed')
        cy.get('label#message8')
            .should('be.visible').and('have.text', 'Special characters are not allowed')
        cy.get('input[type="reset"]').click()

        let checker = false
        cy.on('window:alert',(txt)=>{
            expect(txt).to.contains('please fill all fields Correct Value');
        })
        cy.tariffPlanPopUpCheck("aaa", 1, 1, 1, 1, 1, 1, checker)
        checker = false
        cy.tariffPlanPopUpCheck(1, "aaa", 1, 1, 1, 1, 1, checker)
        checker = false
        cy.tariffPlanpopupCheck(1, 1, "aaa", 1, 1, 1, 1, checker)
        checker = false
        cy.tariffPlanPopUpCheck(1, 1, 1, "aaa", 1, 1, 1, checker)
        checker = false
        cy.tariffPlanPopUpCheck(1, 1, 1, 1, "aaa", 1, 1, checker)
        checker = false
        cy.tariffPlanPopUpCheck(1, 1, 1, 1, 1, "aaa", 1, checker)
        checker = false
        cy.tariffPlanPopUpCheck(1, 1, 1, 1, 1, 1, "aaa", checker)
    });

});