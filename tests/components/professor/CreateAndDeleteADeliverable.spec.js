describe('Create and submit a deliverable successfully', () => {
  it('Visits the login page and login as professor',() => {
    cy.visit('http://localhost:8181/login')

    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('floydheasley@uottawa.ca')
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
    cy.get('.login-btn > .el-button').click()

    cy.url().should('include', '/professor/index')
    cy.wait(500)

  })

  it('Visits the edit deliverable page',() => {
    cy.visit('http://localhost:8181/professor/editDeliverable')
    cy.wait(500)

    cy.get('[style="display: flex;"] > .el-select > .el-input > .el-input__inner').click().type('{downarrow}{enter}')
    cy.wait(500)

  })

  it('Creates a new deliverable', ()=> {
    cy.get(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner').type('Test Deliverable')

    cy.get(':nth-child(1) > .el-form-item > .el-form-item__content > .el-date-editor > .el-input__inner').click()

    cy.get(':nth-child(7) > :nth-child(7) > div').click()

    cy.get(':nth-child(3) > .el-form-item > .el-form-item__content > .el-date-editor > .el-input__inner').click()

    cy.get('.confirm').click()

    cy.get(':nth-child(5) > .el-form-item__content > .el-input > .el-input__inner').type('0.15')

    cy.get('.el-button--primary').click()

    cy.get('.el-message-box__btns > .el-button--primary').click()

    cy.wait(500)

  })

  it('Visits the view deliverables page', () => {
    cy.visit('http://localhost:8181/professor/viewDeliverables')
    cy.wait(500)

    cy.get('.el-select > .el-input > .el-input__inner').click().type('{downarrow}{enter}')
    cy.wait(500)

    cy.get('.el-table_1_column_1 > .cell > .caret-wrapper > .descending').click()

    cy.get('.el-table__body > tbody > :nth-child(1) > .el-table_1_column_2').contains('.cell', 'Test Deliverable').should('exist')

    cy.get('.el-table__body > tbody > :nth-child(1) > .el-table_1_column_5' ).contains('.cell', '0.15').should('exist')

  })

  it('Deletes the newly created deliverable', () => {
    cy.get(':nth-child(1) > .el-table_1_column_6 > .cell > .el-button--danger').click()

    cy.get('.el-button--primary').click()
  })

})
