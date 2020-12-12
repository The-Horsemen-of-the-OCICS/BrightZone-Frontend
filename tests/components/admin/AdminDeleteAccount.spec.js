describe('Delete student account', () => {
    it('Visits the login page', () => {
        cy.visit('http://localhost:8181/login')
        cy.wait(500)
    })

    it('Inputs userId, password and click login button', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('1000000')
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
        cy.get('.login-btn > .el-button > span').click()
        cy.wait(500)
    })

    it('Should go to admin index page', () => {
        cy.url().should('include', '/admin/index')
        cy.wait(500)
    })

    it('click account button on the left sidebar', () => {
        cy.get('.sidebar-el-menu > :nth-child(2) > .el-tooltip').click()
        // add a new student
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/account/register',
            form: true,
            body: {'emailOrUserId': '3000490'},
        }).then((response) => {})
        cy.wait(500)
    })

    it('select user role "Student" and input username "Velia Justis" and click search button', () => {
        cy.get('.el-select__caret').click()
        cy.get('.el-scrollbar__view > :nth-child(3)').click()
        cy.get('.handle-input > .el-input__inner').type('Velia Justis')
        cy.get('.handle-box > :nth-child(4)').click()
        cy.wait(500)
    })

    it('click delete button and confirm deletion', () => {
        cy.get('.red').click()
        cy.get('.el-message-box__btns > .el-button--primary').click()
        cy.wait(500)
    })

    it('should be told that delete success', () => {})
})

describe('Delete Professor account', () => {
    it('Visits the login page', () => {
        cy.visit('http://localhost:8181/login')
        cy.wait(500)
    })

    it('Inputs userId, password and click login button', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('1000000')
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
        cy.get('.login-btn > .el-button > span').click()
        cy.wait(500)
    })

    it('Should go to admin index page', () => {
        cy.url().should('include', '/admin/index')
        cy.wait(500)
    })

    it('click account button on the left sidebar', () => {
        cy.get('.sidebar-el-menu > :nth-child(2) > .el-tooltip').click()
        // add a new professor
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/account/register',
            form: true,
            body: {'emailOrUserId': '2000089'},
        }).then((response) => {})
        cy.wait(500)
    })

    it('select user role "Student" and input username "George Forbis" and click search button', () => {
        cy.get('.el-select__caret').click()
        cy.get('.el-scrollbar__view > :nth-child(2)').click()
        cy.get('.handle-input > .el-input__inner').type('George Forbis')
        cy.get('.handle-box > :nth-child(4)').click()
    })

    it('click delete button and confirm deletion', () => {
        cy.get('.red').click()
        cy.get('.el-message-box__btns > .el-button--primary').click()
    })

    it('should be told that delete success', () => {})
})



