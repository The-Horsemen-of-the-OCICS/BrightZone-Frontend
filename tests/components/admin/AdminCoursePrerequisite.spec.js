describe('Create course success', () => {
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

    it('click course button on the left sidebar', () => {
        cy.get(':nth-child(3) > .el-tooltip').click()
    })

    it('should go to course list page', () => {
        cy.url().should('include', '/admin/courses')
    })

    it('click add course button', () => {
        cy.get('.is-round').click()
    })

    it('input the course subject ', function () {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type("OPTOM")
    });

    it('input the repeat course number ', function () {
        cy.get('[type="number"] > .el-form-item__content > .el-input > .el-input__inner').type("103")
        cy.get('.el-form-item__error')
        cy.wait(600)
    });

    it('input the valid course number ', function () {
        cy.get('[type="number"] > .el-form-item__content > .el-input > .el-input__inner').clear().type("101")
    });

    it('input the repeat course name', function () {
        cy.get(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner').type("History and Orientation")
        cy.get('.el-form-item__error')
        cy.wait(600)
    });

    it('input the valid course name', function () {
        cy.get(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner').clear().type("History and Orientation1")
    });

    it('choose the course credit ', function () {
        cy.get('.el-form-item__content > .el-select > .el-input > .el-input__inner').click()
        cy.wait(300)
        cy.get('.el-scrollbar__view > :nth-child(7)').click()

    });

    it('input the course description ', function () {
        cy.get('.el-textarea__inner').type("this is a test course")
    });

    it('click the submit button ', function () {
        cy.get('.el-button-group > .el-button--primary > span').click()
        cy.wait(300)
        cy.get('.el-message-box__btns > .el-button--primary').click()
        cy.wait(500)
    });

})

describe('add prerequisite course success', () => {
    it('check the course with the table', function () {
        cy.get('.el-pager > :nth-child(8)').click()
        cy.wait(800)
        cy.get(':nth-child(9) > .el-table_5_column_26 > .cell > :nth-child(1)').click()
        cy.wait(1200)
    });

    it('add prerequisite course', function () {
        cy.get(':nth-child(3) > .el-card > .el-card__header > .clearfix > .el-button > span').click()
        cy.wait(300)
        cy.get(':nth-child(2) > .el-form-item__content > .el-select > .el-input > .el-input__inner').click()
        cy.wait(400)
        cy.get('.el-scrollbar__view > :nth-child(3)').click()
        cy.wait(800)
        cy.get(':nth-child(3) > .el-form-item__content > .el-select > .el-input > .el-input__inner').click()
        cy.wait(800)
        cy.get('[style="min-width: 151.172px; position: fixed; top: 216px; left: 1104px; transform-origin: center top; z-index: 2015;"] > .el-scrollbar > .el-select-dropdown__wrap > .el-scrollbar__view > :nth-child(2)').click()
        cy.wait(600)
        cy.get('.demo-drawer__content > .el-card > .el-card__header > .clearfix > .el-button-group > .el-button--primary').click()
        cy.wait(400)

        cy.get('.el-message-box__btns > .el-button--primary').click()
        cy.wait(800)
    });
})

describe('delete the prerequisite course',()=>{
    it('press delete button', function () {
        cy.get('.cell > .el-button').click()
        cy.wait(600)
        cy.get('.el-message-box__btns > .el-button--primary > span').click()
        cy.wait(600)
    });
})
describe('delete the course', () => {
    it('delete the new added test course', function () {
        cy.get(':nth-child(3) > .el-tooltip').click()
        cy.wait(800)
        cy.get('.el-pager > :nth-child(8)').click()
        cy.wait(800)
        cy.get(':nth-child(9) > .el-table_15_column_70 > .cell > .red > span').click()
        //cy.get(':nth-child(9) > .el-table_13_column_63 > .cell > .red').click()
        cy.wait(800)
        cy.get('.el-message-box__btns > .el-button--primary').click()
    });
})
