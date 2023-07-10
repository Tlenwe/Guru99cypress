describe('Add Customer +', function () {

    it('Visual check', function () {
        cy.visit('https://demo.guru99.com/telecom/addcustomer.php').wait(10)

        cy.log('Checking fields')
        cy.get('input#fname').should('be.visible').should('be.enabled')
        cy.get('input#lname').should('be.visible').should('be.enabled')
        cy.get('input#email').should('be.visible').should('be.enabled')
        cy.get('textarea#message').should('be.visible').should('be.enabled')
        cy.get('input#telephoneno').should('be.visible').should('be.enabled')

        cy.log("Checking buttons")
        cy.get('input#done').should('be.enabled')
            .and('be.checked')
        cy.get('input#pending').should('be.enabled')
        cy.get('input[type="submit"]').should('be.visible').should('be.enabled')
        cy.get('input[type="reset"]').should('be.visible').should('be.enabled')

        cy.log('Checking labels and banners')
        cy.addCustomersLabels()
        cy.get('h1').should('be.visible').and('have.text', 'Add Customer')
    });

    it('Checking Valid Inputs', function () {
        cy.visit('https://demo.guru99.com/telecom/addcustomer.php').wait(10)
        cy.handlingv6Error()

        cy.log("Using common english name and british phone number")
        cy.get('input#done').check({ force: true })
        cy.addCustomerFillFields('Jack', 'Jackson', 'jackie@mail.com', '9550 Broadway, HARROW HA62 8ZD', '+447975777666')
        cy.addCustomersLabels()
        cy.get('input[type="submit"]').click()
        cy.addCustomersSuccessCheck()

        cy.log('Checking Pending radiobutton')
        cy.get('input#pending').check({ force: true })
        cy.addCustomerFillFields('Jack', 'Jackson', 'jackie@mail.com', '9550 Broadway, HARROW HA62 8ZD', '+447975777666')
        cy.addCustomersLabels()
        cy.get('input[type="submit"]').click()
        cy.addCustomersSuccessCheck()
    //     expect id can be found in pending list

    });

    it('Checking for using specific names', function () {
        cy.visit('https://demo.guru99.com/telecom/addcustomer.php').wait(10)
        cy.handlingv6Error()

        cy.log('Using name with dash, spaces and ')
        cy.get('input#done').check({ force: true })
        cy.addCustomerFillFields('Abd Al-Ala', "A'idah", 'abd.al.ala@mail.com', 'Hayarkon St 63432, Tel Aviv', '+97235164154')
        cy.addCustomersLabels()
        cy.get('input[type="submit"]').click()
        cy.addCustomersSuccessCheck()

        cy.log('Using name with hieroglyphs')
        cy.get('input#done').check({ force: true })
        cy.addCustomerFillFields('李', '王', 'liwang@mail.com', '604 Phahonyothin Rd, Bangkok 10220', '+6640360388')
        cy.addCustomersLabels()
        cy.get('input[type="submit"]').click()
        cy.addCustomersSuccessCheck()
    });

    it('Reset button functionality', function () {
        cy.visit('https://demo.guru99.com/telecom/addcustomer.php').wait(10)
        cy.handlingv6Error()

        let checker = false
        cy.on('window:alert', () => {checker = true})
        cy.get('input#pending').check({ force: true })
        cy.addCustomerFillFields('Jack', 'Jackson', 'jackie@mail.com', '9550 Broadway HARROW HA62 8ZD', '+447975777666')
        cy.get('input[type="reset"]').click()
        cy.get('input#done').should('be.checked')
        cy.get('input[type="submit"]').click().should(() => {expect(checker, 'Checking the required pop-up to appear.').to.be.true;})

    });

});

describe('Add Customer -', function () {

    it('Checking Invalid Inputs', function () {
        cy.visit('https://demo.guru99.com/telecom/addcustomer.php').wait(10)
        cy.handlingv6Error()
        let checker = false

        cy.get('input#done').check({ force: true })
        cy.addCustomerPopUpCheck('$#@', 'Jackson', 'jackie@mail.com', '9550 Broadway HARROW HA62 8ZD', '+447975777666', checker)
        checker = false
        cy.get('input#done').check({ force: true })
        cy.addCustomerPopUpCheck('Jack', '$#@', 'jackie@mail.com', '9550 Broadway HARROW HA62 8ZD', '+447975777666', checker)
        checker = false
        cy.get('input#done').check({ force: true })
        cy.addCustomerPopUpCheck('Jack', 'Jackson', 'jackie@mail.com', '$#@', '+447975777666', checker)
        checker = false
        cy.get('input#done').check({ force: true })
        cy.addCustomerPopUpCheck('Jack', 'Jackson', 'jackie@mail.com', '9550 Broadway HARROW HA62 8ZD', '$#@', checker)
    });

    it('Email field validation check', function () {
        cy.visit('https://demo.guru99.com/telecom/addcustomer.php').wait(10)
        cy.handlingv6Error()

        cy.get('input#done').check({ force: true })
        cy.addCustomerFillFields('Jack', 'Jackson', 'validmail@mail.com', '9550 Broadway HARROW HA62 8ZD', '+447975777666')
        cy.get('label#message9').should('not.be.visible')

        cy.addCustomerFillFields('Jack', 'Jackson', 'mailwithoutat', '9550 Broadway HARROW HA62 8ZD', '+447975777666')
        cy.get('label#message9').should('be.visible').and('have.text', 'Email-ID is not valid')

        cy.addCustomerFillFields('Jack', 'Jackson', 'mailonlywith@', '9550 Broadway HARROW HA62 8ZD', '+447975777666')
        cy.get('label#message9').should('be.visible').and('have.text', 'Email-ID is not valid')

        cy.addCustomerFillFields('Jack', 'Jackson', 'mailwith@anddot.', '9550 Broadway HARROW HA62 8ZD', '+447975777666')
        cy.get('label#message9').should('be.visible').and('have.text', 'Email-ID is not valid')
    });

    it('Checking field validation', function () {
        cy.visit('https://demo.guru99.com/telecom/addcustomer.php').wait(10)
        cy.handlingv6Error()
        let checker = false

        cy.get('input#done').check({ force: true })
        cy.addCustomerPopUpCheck('$#@', '$#@', '$##@mail.com', '$#@', '$#@', checker)
        cy.get('label#message').should('be.visible').and('have.text', 'Special characters are not allowed')
        cy.get('label#message50').should('be.visible').and('have.text', 'Special characters are not allowed')
        cy.get('label#message9').should('be.visible').and('have.text', 'Special characters are not allowed')
        cy.get('label#message3').should('be.visible').and('have.text', 'Special characters are not allowed')
        cy.get('label#message7').should('be.visible').and('have.text', 'Special characters are not allowed')

        checker = false
        cy.get('input#done').check({ force: true })
        cy.addCustomerPopUpCheck('123', '123', '123@mail.com', '123', '123', checker)
        cy.get('label#message').should('be.visible').and('have.text', 'Numbers are not allowed')
        cy.get('label#message50').should('be.visible').and('have.text', 'Numbers are not allowed')
        cy.get('label#message9').should('not.be.visible')
        cy.get('label#message3').should('not.be.visible')
        cy.get('label#message7').should('not.be.visible')

        cy.get('input#done').check({ force: true })
        cy.get('input#fname').type(' ').clear()
        cy.get('input#lname').type(' ').clear()
        cy.get('input#email').type(' ').clear()
        cy.get('textarea#message').type(' ').clear()
        cy.get('input#telephoneno').type(' ').clear()
        cy.wait(10)
        cy.get('input[type="submit"]').click()
        cy.get('label#message').should('be.visible').and('have.text', 'Customer name must not be blank')
        cy.get('label#message50').should('be.visible').and('have.text', 'Customer name must not be blank')
        cy.get('label#message9').should('be.visible').and('have.text', 'Email-ID must not be blank')
        cy.get('label#message3').should('be.visible').and('have.text', 'Address Field must not be blank')
        cy.get('label#message7').should('be.visible').and('have.text', 'Mobile no must not be blank')
    });

});