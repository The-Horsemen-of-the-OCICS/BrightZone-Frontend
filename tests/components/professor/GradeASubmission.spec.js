/// <reference types="cypress" />
import EditDeliverable from '@/components/EditDeliverable.vue'

describe('Grade a submission successfully', () => {
  it('Visits the login page and login as professor',() => {
    cy.visit('http://localhost:8181/login')

    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('floydheasley@uottawa.ca')
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
    cy.get('.login-btn > .el-button').click()

    cy.url().should('include', '/professor/index')
    cy.wait(500)

  })

  it('Visits the evaluate submission page',() => {
    cy.visit('http://localhost:8181/professor/evaluateSubmission')
    cy.wait(500)

  })

  it('Selects a submission', ()=> {
    cy.get(':nth-child(1) > .el-input > .el-input__inner').click().type('{downarrow}{enter}')
    cy.wait(500)

    cy.get('[style="margin-bottom: 10px; display: flex; justify-items: flex-end;"] > :nth-child(2) > .el-input > .el-input__inner').click().type('{downarrow}{enter}')
    cy.wait(500)

    cy.get(':nth-child(3) > .el-input > .el-input__inner').click().type('{downarrow}{enter}')
    cy.wait(500)


  })

  it('Modifies the grade to a valid value and submit', () => {
    cy.get('.is-required > .el-form-item__content > .el-input > .el-input__inner').clear().type('.88')
    cy.get('.el-button--primary').click()
    cy.get('.el-message-box__btns > .el-button--primary').click()
    cy.wait(500)
  })

  it('Visits the view submissions page', () => {
    cy.visit('http://localhost:8181/professor/viewSubmissions')
    cy.wait(500)

    cy.get('[style="margin-bottom: 10px; display: flex; justify-items: flex-end;"] > :nth-child(1) > .el-input > .el-input__inner').click().type('{downarrow}{enter}')
    cy.wait(500)

    cy.get(':nth-child(2) > .el-input > .el-input__inner').click().type('{downarrow}{enter}')
    cy.wait(500)

  })

  it('Observes that the grade is changed', () => {
    cy.get('.el-table__row > .el-table_1_column_7').contains('.cell', '0.88').should('exist')
  })
})

describe('Invalid grade', () => {
  it('Visits the login page', () => {
    cy.visit('http://localhost:8181/login')

    cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('floydheasley@uottawa.ca')
    cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('123456')
    cy.get('.login-btn > .el-button').click()

    cy.url().should('include', '/professor/index')
    cy.wait(500)

  })

  it('Visits the evaluate submission page', () => {
    cy.visit('http://localhost:8181/professor/evaluateSubmission')
    cy.wait(500)

  })

  it('Selects a submission', () => {
    cy.get(':nth-child(1) > .el-input > .el-input__inner').click().type('{downarrow}{enter}')
    cy.get('[style="margin-bottom: 10px; display: flex; justify-items: flex-end;"] > :nth-child(2) > .el-input > .el-input__inner').click().type('{downarrow}{enter}')
    cy.get(':nth-child(3) > .el-input > .el-input__inner').click().type('{downarrow}{enter}')

  })

  it('Modifies the grade to an invalid value', () => {
    cy.get('.is-required > .el-form-item__content > .el-input > .el-input__inner').clear().type('-6786.048751')
  })

  it('Shows error messages', () => {
    cy.get('.el-form-item__error').should('exist').should('be.visible')
  })
})