describe('Login fail because user doesn\'t have an account in CMS', () => {
    it('Visits the login page', () => {
        cy.visit('http://localhost:8181/login')
        cy.wait(500)
    })

    it('Inputs userId, password and click login button', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('123')
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
        cy.get('.login-btn > .el-button > span').click()
        cy.wait(500)
    })

    it('Should be told to register an account', () => {
        cy.url().should('include', '/login')
        cy.wait(500)
    })

})

describe('Login fail because userId is not authorized yet', () => {
    it('Visits the login page', () => {
        cy.visit('http://localhost:8181/login')
        cy.wait(500)
    })

    it('Inputs userId, password and click login button', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('3000193')
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
        cy.get('.login-btn > .el-button > span').click()
        cy.wait(500)
    })

    it('Should to told to wait for authorization', () => {
        cy.url().should('include', '/login')
        cy.wait(500)
    })
})

describe('Login fail because password is wrong', () => {
    it('Visits the login page', () => {
        cy.visit('http://localhost:8181/login')
        cy.wait(500)
    })

    it('Inputs userId, password and click login button', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('1000000')
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456789')
        cy.get('.login-btn > .el-button > span').click()
        cy.wait(500)
    })

    it('Should to told password is wrong', () => {
        cy.url().should('include', '/login')
        cy.wait(500)
        cy.wait(500)
    })
})

describe('Login success', () => {
    let account = {
        accountStatus: '',
        email: '',
        facultyId: '',
        lastLogin: '',
        name: '',
        password: '',
        program: '',
        type: '',
        userId: '',
        verificationCode: ''
    };
    it('Visits the login page', () => {
        cy.visit('http://localhost:8181/login')
        cy.wait(500)
    })

    it('Inputs userId, password and click login button', () => {
        // restore account's information
        cy.request({
            method: 'GET',
            url: 'http://localhost:8080/admin/account/getAccount/1000000',
            // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            // body: {emailOrUserId: '1000000', password: '123456'}
        }).then((response) => {
            account.accountStatus = response.body.accountStatus;
            account.email = response.body.email;
            account.facultyId = response.body.facultyId;
            account.lastLogin = response.body.lastLogin;
            account.name = response.body.name;
            account.password = response.body.password;
            account.program = response.body.program;
            account.type = response.body.type;
            account.userId = response.body.userId;
            account.verificationCode = response.body.verificationCode;
        })

        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('1000000')
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
        cy.get('.login-btn > .el-button > span').click()

        // reset account's information
        cy.request({
            method: 'PUT',
            url: 'http://localhost:8080/admin/account/updateAccount',
            // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: account
        }).then((response) => {
        })
        cy.wait(500)
    })

    it('Should go to admin index page', () => {
        cy.url().should('include', '/admin/index')
        cy.wait(500)
    })
})
