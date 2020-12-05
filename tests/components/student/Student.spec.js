describe('RegisterCourse', () => {
  before('Visits the login page',() => {
    cy.visit('http://localhost:8181/login')

    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('everettelevier@uottawa.ca')
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
    cy.get('.login-btn > .el-button').click()

    cy.url().should('include', '/student/index')
  })

  it('Register Courses',() => {
    cy.visit('http://localhost:8181/student/viewOpenedCourse')
    cy.get(':nth-child(1) > .el-table_1_column_5 > .cell > .el-button > span').click()
    cy.get('.el-button--primary > span').click()

  })


  it('Drop Courses',() => {
    cy.visit('http://localhost:8181/student/viewRegisteredCourse')
    cy.get(':nth-child(1) > .el-table_1_column_5 > .cell > .el-button > span').click()
    cy.get('.el-button--primary > span').click()
  })

  it('Submit Deliverable',() => {
    cy.visit('http://localhost:8181/studentCourse/ViewCourseDeliverable/1001')
    
  })

})
