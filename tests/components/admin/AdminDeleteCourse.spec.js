describe('Login success', () => {
    it('Visits the login page', () => {
        cy.visit('http://localhost:8181/login')
        cy.wait(500)
    })

    it('Inputs userId, password and click login button', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('1000000')
        // cy.get('[type="number"] > .el-form-item__content > .el-form-item__error')
        // cy.wait(500)
        //
        // cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').clear().type('1000001')
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
        cy.get('.login-btn > .el-button > span').click()

        cy.wait(500)
    })

    it('Should go to admin index page', () => {
        cy.url().should('include', '/admin/index')
        cy.wait(500)
    })
})
describe('Visit user manage page', () => {

    it('Visits the account page', () => {
        cy.get('.sidebar-el-menu > :nth-child(2)').click()
    })

})

describe('Delete failed due to can not find the user', () => {
    it('user the search system', () => {
        // cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('1000000')
        // // cy.get('[type="number"] > .el-form-item__content > .el-form-item__error')
        // // cy.wait(500)
        // //
        // // cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').clear().type('1000001')
        // cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
        cy.get('.el-select > .el-input > .el-input__inner').click()
        cy.get('.el-scrollbar__view > :nth-child(1)').click()
        cy.get('.handle-input > .el-input__inner').type('Nila Devine')
        cy.wait(1000)
        cy.get('.handle-box > :nth-child(4)').click()
        cy.wait(2000)
        // cy.get('')

        cy.wait(200)
    })

})

describe('successfully find the account and delete it', () => {
    it('user the search system', () => {
        // cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('1000000')
        // // cy.get('[type="number"] > .el-form-item__content > .el-form-item__error')
        // // cy.wait(500)
        // //
        // // cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').clear().type('1000001')
        // cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
        cy.get('.el-select > .el-input > .el-input__inner').click()
        cy.get('.el-scrollbar__view > :nth-child(1)').click()
        cy.get('.handle-input > .el-input__inner').type('Eveline Bizier')
        cy.wait(1000)
        cy.get('.handle-box > :nth-child(4)').click()
        cy.wait(2000)
        // cy.get('')

        cy.wait(200)
    })

})

