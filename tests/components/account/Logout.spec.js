describe('User Logout success', () => {
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

    it('Visits the login page',() => {
        cy.visit('http://localhost:8181/login')
    })

    it('Inputs userId, password and click login button' , () => {
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
    })

    it('Should go to admin index page', () => {
        cy.url().should('include', '/admin/index')
    })

    it('Click drop down menu besides user avatar', function () {
        cy.get('.el-icon-caret-bottom').click()
        cy.wait(2000)
    });

    it('Click logout button', function () {
        cy.get('.el-dropdown-menu__item--divided').click()
    });

    it('should back to login page', function () {
        cy.url().should('include', '/login')
    });
})
