describe('Create request message success', () => {
    it('Visit login page', () => {
        cy.visit('http://localhost:8181/login')
        cy.wait(500)
    })

    it('input userId and password and click login button', () => {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').clear().type('3000000')
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').clear().type('123456')
        cy.get('.login-btn > .el-button').click()
        cy.wait(500)
    })

    it('should go to student index page', () => {
        cy.url().should('include', '/student/index')
        cy.wait(500)
    })

    it('click request button on the sidebar', () => {
        cy.get('.sidebar-el-menu > :nth-child(4)').click()
        cy.wait(500)
    })

    it('should go to create request message page', () => {
        cy.url().should('include', '/student/createRequest')
        cy.wait(500)
    })

    it('select request type enroll', () => {
        cy.get('.el-select__caret').click()
        cy.get('.el-scrollbar__view > :nth-child(1)').click()
        cy.wait(500)
    })

    it('input request message and click submit button', () => {
        cy.get('.el-textarea__inner').clear().type('Hello, my name is Jillian Villagomez, please help me enroll COMP5104 in this term.')
        cy.get('.el-button').click()
        cy.wait(500)
    })

    it('should be told that request message has been sent to admin', () => {
        cy.url().should('include', '/student/createRequest')
        // delete newly added request message
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:8080/admin/request/deleteRequestByUserId',
            form: true,
            body: {'userId': '3000000'},
        }).then((response) => {})
        cy.wait(500)
    })

})
