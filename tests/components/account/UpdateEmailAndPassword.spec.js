describe('Update email fail because new email has already been occupied by other users in CMS', () => {
    it('Visits the login page', () => {
        cy.visit('http://localhost:8181/login')
        cy.wait(500)
    })

    it('Inputs userId, password and click login button', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('1000002')
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
        cy.get('.login-btn > .el-button > span').click()
        cy.wait(500)
    })

    it('Should login success and go to admin index page', () => {
        cy.url().should('include', '/admin/index')
        cy.wait(500)
    })

    it('click the profile button on the sidebar', () => {
        cy.get('.el-icon-lx-profile').click()
        cy.wait(500)
    })

    it('inputs new email address on the right', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').clear().type('evelinebizier@uottawa.ca')
        cy.wait(500)
    })

    it('click update button', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input-group__append > .el-button').click()
        cy.wait(500)
    })

    it('should be told that email has already been told by other users', () => {
        cy.url().should('include', '/admin/profile')
        cy.wait(500)
    })
})

describe('Update email success', () => {
    it('Visits the login page', () => {
        cy.visit('http://localhost:8181/login')
        cy.wait(500)
    })

    it('Inputs userId, password and click login button', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('1000002')
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
        cy.get('.login-btn > .el-button > span').click()
        cy.wait(500)
    })

    it('Should login success and go to admin index page', () => {
        cy.url().should('include', '/admin/index')
        cy.wait(500)
    })

    it('click the profile button on the sidebar', () => {
        cy.get('.el-icon-lx-profile').click()
        cy.wait(500)
    })

    it('inputs new email address on the right', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').clear().type('florapurdum2@uottawa.ca')
        cy.wait(500)
    })

    it('click update button', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input-group__append > .el-button').click()
        cy.wait(500)
    })

    it('should be told that email update success', () => {
        cy.url().should('include', '/admin/profile')
        // reset account's email
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/account/updateEmail',
            form: true,
            body: {'email': 'florapurdum@uottawa.ca'}
        }).then((response) => {})
        cy.wait(500)
    })
})

describe('Update password success', () => {
    it('Visits the login page', () => {
        cy.visit('http://localhost:8181/login')
    })

    it('Inputs userId, password and click login button', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('1000002')
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
        cy.get('.login-btn > .el-button > span').click()
    })

    it('Should login success and go to admin index page', () => {
        cy.url().should('include', '/admin/index')
        cy.wait(500)
    })

    it('click the profile button on the sidebar', () => {
        cy.get('.el-icon-lx-profile').click()
    })

    it('inputs new password on the right', () => {
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').clear().type('1234567')
    })

    it('click update button', () => {
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input-group__append > .el-button').click()
    })

    it('should be told that password update success', () => {
        cy.url().should('include', '/admin/profile')
        cy.wait(500)
        // reset account's password
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/account/updatePassword',
            form: true,
            body: {'password': '123456'}
        }).then((response) => {})
    })
})

