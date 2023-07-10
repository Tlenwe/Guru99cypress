describe('Login Page +', function () {

    it('Visual check', function () {
        cy.visit('https://demo.guru99.com/Agile_Project/Agi_V1/').wait(10)

        cy.get('input[name="uid"]').should('be.visible').and('be.enabled')
        cy.get('input[name="password"]').should('be.visible').and('be.enabled')
            .and('have.attr', 'type', 'password')

        cy.get('input[type="submit"]').should('be.visible').should('be.enabled')
        cy.get('input[type="reset"]').should('be.visible').should('be.enabled')

        cy.get('label#message23').should('not.be.visible')
        cy.get('label#message18').should('not.be.visible')
        cy.get('h2').should('be.visible').and('have.text', 'Guru99 Bank')
    });

    it('Checking Valid Inputs', function () {
        cy.visit('https://demo.guru99.com/Agile_Project/Agi_V1/').wait(10)

        cy.get('input[name="uid"]').type('1303')
        cy.get('input[name="password"]').type('Guru99')
        cy.get('input[type="submit"]').click()

        cy.url().should('eq','https://demo.guru99.com/Agile_Project/Agi_V1/customer/Customerhomepage.php')
        cy.get('.heading3').should('be.visible').and('have.text', "Welcome To Customer's Page of Guru99 Bank")
    });

    it('Reset button functionality', function () {
        cy.visit('https://demo.guru99.com/Agile_Project/Agi_V1/').wait(10)

        cy.get('input[name="uid"]').type('1303')
        cy.get('input[name="password"]').type('Guru99')
        cy.get('input[type="reset"]').click()
        cy.get('input[type="submit"]').click()

        cy.url().should('eq', 'https://demo.guru99.com/Agile_Project/Agi_V1/index.php')
    });

});

describe('Login Page -', function () {

    it('Checking Incorrect Password', function () {
        cy.visit('https://demo.guru99.com/Agile_Project/Agi_V1/').wait(10)

        cy.get('input[name="uid"]').type('1303')
        cy.get('input[name="password"]').type('Guru98')

        cy.get('input[type="submit"]').click()
        cy.url().should('eq', 'https://demo.guru99.com/Agile_Project/Agi_V1/index.php')

    });

    it('Checking empty fields', function () {
        cy.visit('https://demo.guru99.com/Agile_Project/Agi_V1/').wait(10)

        cy.get('input[name="uid"]').type('1303').clear()
        cy.get('input[name="password"]').type('Guru99').clear()

        cy.get('label#message23').should('be.visible').and('have.text', 'User-ID must not be blank')
        cy.get('label#message18').should('be.visible').and('have.text', 'Password must not be blank')

        cy.get('input[type="submit"]').click()
        cy.url().should('eq', 'https://demo.guru99.com/Agile_Project/Agi_V1/index.php')
    });

    it('Only password field filled', function () {
        cy.visit('https://demo.guru99.com/Agile_Project/Agi_V1/').wait(10)

        cy.get('input[name="password"]').type('Guru99')

        cy.get('input[type="submit"]').click()
        cy.url().should('eq', 'https://demo.guru99.com/Agile_Project/Agi_V1/index.php')
        cy.get('label#message23').should('be.visible').and('have.text', 'User-ID must not be blank')
    });

});