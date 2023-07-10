describe.skip('Payment Gateway +', () => {

    it('Shop\'s Page visual check', () => {
        cy.visit('https://demo.guru99.com/payment-gateway/purchasetoy.php').wait(10)

        cy.get('h2').should('be.visible').and('have.text', 'Mother Elephant With Babies Soft Toy')
        cy.get('h3').should('be.visible').and('contain.text', '20')

        cy.get('select[name="quantity"]').should('be.visible').and('be.enabled')
        cy.get('option').should('have.length', 9)
        cy.get('input[type="submit"]').should('be.visible').should('be.enabled')
    });

    it('Payment Gateway visual check', () => {
        cy.visit('https://demo.guru99.com/payment-gateway/purchasetoy.php').wait(10)
        cy.get('input[type="submit"]').click()

        cy.get('input#card_nmuber').should('be.visible').should('be.enabled')
        cy.get('input#cvv_code').should('be.visible').should('be.enabled')
            .and('have.attr', 'maxlength', 4)
        cy.get('input[type="submit"]').should('be.visible').should('be.enabled')

        cy.get('select#month').should('be.visible').and('be.enabled')
        cy.get('select#month').find('option').should('have.length', 13)
        cy.get('select#year').should('be.visible').and('be.enabled')
        cy.get('select#year').find('option').should('have.length', 11)
        cy.get('select#year').find('option').eq(1).should('have.attr', 'value', '2023')

        cy.get('label#message1').should('not.be.visible')
        cy.get('label#message2').should('not.be.visible')
    });

    it('Checking valid inputs', function () {
        cy.visit('https://demo.guru99.com/payment-gateway/purchasetoy.php').wait(10)
        cy.get('input[type="submit"]').click()

        cy.paymentFillFields('4415187272926060', '06', '2027', '198')
        cy.get('input[type="submit"]').click()

        cy.get('h2').should('have.text', 'Payment successfull!')
    });

    it('Checking valid inputs with American Express card', function () {
        cy.visit('https://demo.guru99.com/payment-gateway/purchasetoy.php').wait(10)
        cy.get('input[type="submit"]').click()

        cy.paymentFillFields('370277566563017', '02', '2026', '8938')
        cy.get('input[type="submit"]').click()

        cy.get('h2').should('have.text', 'Payment successfull!')
    });

    it('Checking quantity price calculation correctly', function () {
        cy.visit('https://demo.guru99.com/payment-gateway/purchasetoy.php').wait(10)
        let i = 1
        while (i<10) {
            cy.get('select[name="quantity"]').select(`${i}`)
            cy.get('input[type="submit"]').click()

            cy.get('input[name="prices"]').should('have.attr', 'value', `${i*20}`)
            cy.go('back')
            i++
        }
    });

});

describe('Payment Gateway -', function () {

    it('Checking symbol and characters input', function () {
        cy.visit('https://demo.guru99.com/payment-gateway/purchasetoy.php').wait(10)
        cy.get('input[type="submit"]').click()
        cy.on('window:alert',(txt)=>{
            expect(txt).to.contains('Please enter valid data');
        })

        cy.paymentFillFields('$#@', '06', '2027', '$#@')
        cy.get('label#message1').should('be.visible').should('have.text', 'Special characters are not allowed')
        cy.get('label#message2').should('be.visible').should('have.text', 'Special characters are not allowed')
        cy.get('input[type="submit"]').click()

        cy.paymentFillFields('asd', '06', '2027', 'asd')
        cy.get('label#message1').should('be.visible').should('have.text', 'Characters are not allowed')
        cy.get('label#message2').should('be.visible').should('have.text', 'Characters are not allowed')
        cy.get('input[type="submit"]').click()

    });

    it('Checking expired card and incorrect card number/cvv', function () {
        cy.visit('https://demo.guru99.com/payment-gateway/purchasetoy.php').wait(10)
        cy.get('input[type="submit"]').click()
        cy.on('window:alert',(txt)=>{
            expect(txt).to.contains('Please enter valid data');
        })

        cy.paymentFillFields('44151872729260', '06', '2027', '123')
        cy.get('input[type="submit"]').click()

        cy.paymentFillFields('4415187272926060', '06', '2027', '12')
        cy.get('input[type="submit"]').click()

        cy.paymentFillFields('4415187272926060', '06', '2023', '198')
        cy.get('label#message3').should('be.visible').should('have.text', 'The selected expiration date has already expired')
        cy.get('input[type="submit"]').click()
    });

    it('Checking empty inputs', function () {
        cy.visit('https://demo.guru99.com/payment-gateway/purchasetoy.php').wait(10)
        cy.get('input[type="submit"]').click()
        cy.on('window:alert',(txt)=>{
            expect(txt).to.contains('Please enter valid data');
        })

        cy.get('input#card_nmuber').type('1').clear()
        cy.get('input#cvv_code').type('1').clear()
        cy.get('label#message1').should('be.visible').should('have.text', 'Field must not be blank')
        cy.get('label#message2').should('be.visible').should('have.text', 'Field must not be blank')
        cy.get('input[type="submit"]').click()
        cy.url().should('eq', 'https://demo.guru99.com/payment-gateway/process_purchasetoy.php')
    });

});