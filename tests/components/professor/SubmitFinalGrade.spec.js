describe('Submit final grade for a student successfully', () => {
  it('Visits the login page',() => {
    cy.visit('http://localhost:8181/login')

    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('floydheasley@uottawa.ca')
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
    cy.get('.login-btn > .el-button').click()

    cy.url().should('include', '/professor/index')
  })

  it('Visits the view students page',() => {
    cy.visit('http://localhost:8181/professor/viewStudents')

  })

  it('Select the first student and submit his/her final grade',() => {
    cy.get('.el-select > .el-input > .el-input__inner').click().type('{downarrow}{enter}')
    cy.get('tbody > :nth-child(1) > .el-table_1_column_1 > .cell > .el-checkbox > .el-checkbox__input > .el-checkbox__inner').click()
    cy.get('[style="margin-top: 20px; display: flex; justify-items: flex-end;"] > .el-button').click()
    cy.get('.el-button--primary').click()
    cy.wait(500)
  })

})

describe('Submit final grades for all students successfully', () => {
  it('Visits the login page',() => {
    cy.visit('http://localhost:8181/login')

    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('floydheasley@uottawa.ca')
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
    cy.get('.login-btn > .el-button').click()

    cy.url().should('include', '/professor/index')
  })

  it('Visits the view students page',() => {
    cy.visit('http://localhost:8181/professor/viewStudents')

  })

  it('Select all students and submit final grades',() => {
    cy.get('.el-select > .el-input > .el-input__inner').click().type('{downarrow}{enter}')
    cy.get('.has-gutter > tr > .el-table_1_column_1 > .cell > .el-checkbox > .el-checkbox__input > .el-checkbox__inner').click()
    cy.get('[style="margin-top: 20px; display: flex; justify-items: flex-end;"] > .el-button').click()
    cy.get('.el-button--primary').click()
    cy.wait(500)
  })

})
