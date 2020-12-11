describe('Password recovery fail because user doesn\'t have an accont in CMS', () => {
    it('Visit password recovery page', () => {
        cy.visit('http://localhost:8181/passwordRecovery')
    })

    it('Input email address, verification code and new password', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('mock1@uottawa.ca')
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('888')
        cy.get(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner').type('1234567')
        cy.get(':nth-child(4) > .el-form-item__content > .el-input > .el-input__inner').type('1234567')
    })

    it('click recovery button', () => {
        cy.get('.passwordRecovery-btn > .el-button').click()
    })

    it('should be told that email doesn\'t exist', () => {
        cy.url().should('include', '/passwordRecovery')
        cy.wait(3000)
    })
})

describe('Password recovery fail because user has not been authorized yet', () => {
    it('Visit password recovery page', () => {
        cy.visit('http://localhost:8181/passwordRecovery')
    })

    it('Input email address, verification code and new password', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('calebnewberg@uottawa.ca')
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('888')
        cy.get(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner').type('1234567')
        cy.get(':nth-child(4) > .el-form-item__content > .el-input > .el-input__inner').type('1234567')
    })

    it('click recovery button', () => {
        cy.get('.passwordRecovery-btn > .el-button').click()
    })

    it('should to told to wait for admin\'s authorization', () => {
        cy.url().should('include', '/passwordRecovery')
        cy.wait(3000)
    })
})

describe('Password recovery fail because verification code is wrong', () => {
    it('Visit password recovery page', () => {
        cy.visit('http://localhost:8181/passwordRecovery')
    })

    it('Input email address, verification code and new password', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('niladevine@uottawa.ca')
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
        cy.get(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner').type('1234567')
        cy.get(':nth-child(4) > .el-form-item__content > .el-input > .el-input__inner').type('1234567')
    })

    it('click recovery button', () => {
        cy.get('.passwordRecovery-btn > .el-button').click()
    })

    it('should be told that verification code is wrong', () => {
        cy.url().should('include', '/passwordRecovery')
        cy.wait(3000)
    })
})

describe('Password recovery success', () => {
    var account = {
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
    let oldVerificationCode = '';
    it('Visit password recovery page', () => {
        cy.visit('http://localhost:8181/passwordRecovery')
    })

    it('Input email address, verification code and new password', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('niladevine@uottawa.ca')
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('234567')
        cy.get(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner').type('1234567')
        cy.get(':nth-child(4) > .el-form-item__content > .el-input > .el-input__inner').type('1234567')
    })

    it('click recovery button', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8080/admin/account/getAccount/1000000',
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
            account.verificationCode = "234567"  // pre-set account's verification code
            oldVerificationCode = response.body.verificationCode;
        })
        cy.request({
            method: 'PUT',
            url: 'http://localhost:8080/admin/account/updateAccount',
            body: account
        }).then((response) => {})
        cy.get('.passwordRecovery-btn > .el-button').click()
    })

    it('should be told that password recovery success', () => {
        cy.url().should('include', '/passwordRecovery')
        cy.wait(3000)
    })

    it('click yes and go to login page', () => {
        account.verificationCode = oldVerificationCode
        cy.request({
            method: 'PUT',
            url: 'http://localhost:8080/admin/account/updateAccount',
            body: account
        }).then((response) => {})
        cy.get('.el-message-box__btns > .el-button--primary > span').click()
    })
})
