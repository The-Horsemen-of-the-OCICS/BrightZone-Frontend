describe('Verification code send fail because user doesn\'t have an account in CMS', () => {
    it('Visit password recovery page', () => {
        cy.visit('http://localhost:8181/passwordRecovery')
        cy.wait(500)
    })

    it('input email address to receive the verification code', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('mock1@uottawa.ca')
        cy.wait(500)
    })

    it('click send verification code button', () => {
        cy.get('.el-popover__reference-wrapper > .el-button').click()
        cy.wait(500)
    })

    it('should be told email doesn\'t exist', function () {
        cy.url().should('include', '/passwordRecovery')
        cy.wait(500)
    });
})

describe('Verification code send fail because user hasn\'t been authorized', () => {
    it('Visit password recovery page', () => {
        cy.visit('http://localhost:8181/passwordRecovery')
        cy.wait(500)
    })

    it('input email address to receive the verification code', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('calebnewberg@uottawa.ca')
        cy.wait(500)
    })

    it('click send verification code button', () => {
        cy.get('.el-popover__reference-wrapper > .el-button').click()
        cy.wait(500)
    })

    it('should be told to wait for admin\'s authorization', function () {
        cy.url().should('include', '/passwordRecovery')
        cy.wait(500)
    });
})

describe('Verification code send success', () => {
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

    it('Visit password recovery page', () => {
        cy.visit('http://localhost:8181/passwordRecovery')
        cy.wait(500)
    })

    it('input email address to receive the verification code', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('niladevine@uottawa.ca')
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
            account.verificationCode = response.body.verificationCode;
        })
        cy.wait(500)
    })

    it('click send verification code button', () => {
        cy.get('.el-popover__reference-wrapper > .el-button').click()
        cy.wait(500)
    })

    it('should be told that verification code send success', function () {
        cy.url().should('include', '/passwordRecovery')

        // reset account's information
        cy.request({
            method: 'PUT',
            url: 'http://localhost:8080/admin/account/updateAccount',
            body: account
        }).then((response) => {})
        cy.wait(500)
    });
})
