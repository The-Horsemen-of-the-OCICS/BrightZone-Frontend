describe('Register fail because user is not a member in this university', () => {
    it('Visits the register account page', () => {
        cy.visit('http://localhost:8181/register')
        cy.wait(500)
    })

    it('Inputs userId, and click register button', () => {
        cy.get('.el-input__inner').type('123')
        cy.get('.register-btn > .el-button').click()
        cy.wait(500)
    })

    it('should be told not allowed to register an account in CMS', function () {
        cy.url().should('include', '/register')
        cy.wait(500)
    });
})

describe('Register fail because user has not been authorized by admin', () => {
    it('Visits the register account page', () => {
        cy.visit('http://localhost:8181/register')
        cy.wait(500)
    })

    it('Inputs userId, and click register button', () => {
        cy.get('.el-input__inner').type('3000190')
        cy.get('.register-btn > .el-button').click()
        cy.wait(500)
    })

    it('should be to wait for admin\'s authorization', function () {
        cy.url().should('include', '/register')
        cy.wait(500)
    });
})

describe('Register fail because user has already been authorized', () => {
    it('Visits the register account page', () => {
        cy.visit('http://localhost:8181/register')
        cy.wait(500)
    })

    it('Inputs userId, and click register button', () => {
        cy.get('.el-input__inner').type('1000000')
        cy.get('.register-btn > .el-button').click()
        cy.wait(500)
    })

    it('should be told that you\'ve already had an account', function () {
        cy.url().should('include', '/register')
        cy.wait(500)
    });
})

describe('Register success', () => {
    it('Visits the register account page', () => {
        cy.visit('http://localhost:8181/register')
        cy.wait(500)
    })

    it('Inputs userId, and click register button', () => {
        cy.get('.el-input__inner').type('3000490')
        cy.get('.register-btn > .el-button').click()
        cy.wait(500)
    })

    it('should be told that register success', () => {
        // delete newly add account
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:8080/admin/account//deleteAccount/3000490',
        }).then((response) => {})
        cy.wait(500)
    });

    it('click yes to go to login page', () => {
        cy.get('.el-message-box__btns > .el-button--primary > span').click()
        cy.wait(500)
        cy.url().should('include', '/login')
        cy.wait(500)
    })
})
