describe('Create clazz success', () => {
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

    it('input the valid course number ', function () {
        cy.get('[type="number"] > .el-form-item__content > .el-input > .el-input__inner').clear().type("101")
    });

    it('input the valid course name', function () {
        cy.get(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner').clear().type("Historyxxx1")
    });

    it('choose the course credit ', function () {
        cy.get('.el-form-item__content > .el-select > .el-input > .el-input__inner').click()
        cy.wait(300)
        cy.get('.el-scrollbar__view > :nth-child(7)').click()

    });

    // it('input the course description ', function () {
    //     cy.get('.el-textarea__inner').type("this is a test course")
    // });

    it('click the submit button ', function () {
        cy.get('.el-button-group > .el-button--primary > span').click()
        cy.wait(300)
        cy.get('.el-message-box__btns > .el-button--primary').click()
        cy.wait(500)
    });

    it('go to the course info page', function () {
        cy.get('.el-pager > :nth-child(8)').click()
        cy.wait(800)
        cy.get(':nth-child(9) > .el-table_5_column_26 > .cell > :nth-child(1)').click()
        cy.wait(800)
    });

    it('press add class', function () {
        cy.get('.el-col-24 > .el-card > .el-card__header > .clearfix > .el-button > span').click()
        cy.wait(800)
    });

    it('input the class info page', function () {
        cy.get('[style="width: 45%; float: left;"] > :nth-child(1) > .el-form-item__content > .el-select > .el-input > .el-input__inner').click().type('{downarrow}{enter}')
        cy.wait(500)
        cy.get('[style="width: 45%; float: left;"] > :nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type("1")
        cy.wait(500)
        cy.get('[style="width: 45%; float: left;"] > :nth-child(3) > .el-form-item__content > .el-input > .el-input__inner').clear().type("10")
        cy.wait(400)
        cy.get('[style="width: 45%; float: left;"] > :nth-child(4) > .el-form-item__content > .el-input > .el-input__inner').type("120")
        cy.wait(400)

        cy.get(':nth-child(5) > .el-form-item__content > .el-date-editor > .el-input__inner').click()
        cy.wait(400)
        cy.get(':nth-child(5) > :nth-child(5) > div').click()
        cy.get('.el-picker-panel__footer > .el-button--default').click()
        cy.wait(400)

        cy.get(':nth-child(6) > .el-form-item__content > .el-date-editor > .el-input__inner').click()
        cy.wait(400)
        cy.get('[style="position: fixed; top: 336px; left: 807px; z-index: 2016;"] > .el-picker-panel__body-wrapper > .el-picker-panel__body > .el-picker-panel__content > .el-date-table > tbody > :nth-child(6) > :nth-child(4) > div').click()

        // cy.get('[style="position: fixed; top: 351px; left: 807px; z-index: 2016;"] > .el-picker-panel__body-wrapper > .el-picker-panel__body > .el-date-picker__time-header > :nth-child(1) > .el-input > .el-input__inner').type("2020-12-31")
        // cy.get('[style="position: fixed; top: 351px; left: 807px; z-index: 2016;"] > .el-picker-panel__body-wrapper > .el-picker-panel__body > .el-date-picker__time-header > :nth-child(2) > .el-input > .el-input__inner').type("10:00{enter}")
        cy.wait(400)
        cy.get('[style="position: fixed; top: 336px; left: 807px; z-index: 2016;"] > .el-picker-panel__footer > .el-button--default > span').click()

        //cy.get('[style="position: fixed; top: 387px; left: 807px; z-index: 2018;"] > .el-picker-panel__footer > .el-button--default > span').click()
        cy.wait(400)


        cy.get(':nth-child(7) > .el-form-item__content > .el-date-editor > .el-input__inner').click()
        cy.wait(400)
        cy.get('[style="position: fixed; top: 387px; left: 807px; z-index: 2018;"] > .el-picker-panel__body-wrapper > .el-picker-panel__body > .el-picker-panel__content > .el-date-table > tbody > :nth-child(7) > :nth-child(6) > div').click()
        //cy.get('[style="position: fixed; top: 402px; left: 807px; z-index: 2018;"] > .el-picker-panel__body-wrapper > .el-picker-panel__body > .el-picker-panel__content > .el-date-table > tbody > :nth-child(7) > :nth-child(6) > div').click()
        cy.wait(400)
        cy.get('[style="position: fixed; top: 387px; left: 807px; z-index: 2018;"] > .el-picker-panel__footer > .el-button--default > span').click()
        //cy.get('[style="position: fixed; top: 402px; left: 807px; z-index: 2018;"] > .el-picker-panel__footer > .el-button--default > span').click()

    });

    it('add schedules to class', function () {
        //cy.get('.el-card__body > :nth-child(1) > .el-form-item__content > .el-select > .el-input > .el-input__inner').click()
        cy.get('.el-card__body > :nth-child(1) > .el-form-item__content > .el-select > .el-input > .el-input__inner').click().type('{downarrow}{enter}')
        cy.wait(400)
        //cy.get('[style="min-width: 72.875px; position: fixed; top: 577px; left: 838px; transform-origin: center top; z-index: 2021;"] > .el-scrollbar > .el-select-dropdown__wrap > .el-scrollbar__view > .hover').click()
        //cy.get('[style="min-width: 72.875px; transform-origin: center top; z-index: 2024; position: fixed; top: 577px; left: 838px;"] > .el-scrollbar > .el-select-dropdown__wrap > .el-scrollbar__view > .hover').click()
        //cy.get('[style="min-width: 78.6406px; position: fixed; top: 592px; left: 838px; transform-origin: center top; z-index: 2021;"] > .el-scrollbar > .el-select-dropdown__wrap > .el-scrollbar__view > :nth-child(1)').click()
        cy.wait(400)

        cy.get(':nth-child(2) > .el-form-item__content > .el-date-editor > .el-input__inner').click()
        cy.wait(400)
        cy.get('.el-picker-panel__content > .el-scrollbar__view > :nth-child(3)').click()
        cy.wait(400)

        cy.get(':nth-child(3) > .el-form-item__content > .el-date-editor > .el-input__inner').click()
        cy.wait(400)
        cy.get('[style="width: 72.875px; position: fixed; top: 679px; left: 838px; z-index: 2025;"] > .el-scrollbar > .el-picker-panel__content > .el-scrollbar__view > :nth-child(5)').click()
        //cy.get('[style="width: 78.6406px; position: fixed; top: 442px; left: 838px; z-index: 2025;"] > .el-scrollbar > .el-picker-panel__content > .el-scrollbar__view > :nth-child(6)').click()
        cy.wait(400)

        cy.get(':nth-child(4) > .el-form-item__content > .el-select > .el-input > .el-input__inner').click()
        cy.wait(400)
        cy.get('[style="min-width: 72.875px; position: fixed; top: 496px; left: 838px; transform-origin: center bottom; z-index: 2028;"] > .el-scrollbar > .el-select-dropdown__wrap > .el-scrollbar__view > :nth-child(5)').click()
        //cy.get('[style="min-width: 78.6406px; position: fixed; top: 511px; left: 838px; transform-origin: center bottom; z-index: 2028;"] > .el-scrollbar > .el-select-dropdown__wrap > .el-scrollbar__view > :nth-child(5)').click()
        cy.wait(800)

        cy.get(':nth-child(5) > .el-form-item__content > .el-select > .el-input > .el-input__inner').click().type('{downarrow}{enter}')
        cy.wait(400)
        //cy.get('[style="min-width: 72.875px; position: fixed; top: 496px; left: 838px; transform-origin: center bottom; z-index: 2028;"] > .el-scrollbar > .el-select-dropdown__wrap > .el-scrollbar__view > :nth-child(6)').click()
        //cy.get('[style="min-width: 78.6406px; position: fixed; top: 470px; left: 838px; transform-origin: center bottom; z-index: 2032;"] > .el-scrollbar > .el-select-dropdown__wrap > .el-scrollbar__view > :nth-child(6)').click()
        cy.wait(400)

        cy.get('[style="height: 100%;"] > :nth-child(1) > .clearfix > .el-button-group > .el-button--primary').click()
        cy.wait(400)
        cy.get('.el-message-box__btns > .el-button--primary').click()

    });

    it('check the class info', function () {
        cy.get('.el-table__row > .el-table_11_column_45').click()
        cy.wait(800)
    });

    it('delete the new added test course', function () {
        cy.get(':nth-child(3) > .el-tooltip').click()
        cy.wait(800)
        cy.get('.el-pager > :nth-child(8)').click()
        cy.wait(800)
        cy.get(':nth-child(9) > .el-table_13_column_63 > .cell > .red').click()
        cy.wait(800)
        cy.get('.el-message-box__btns > .el-button--primary').click()
    });
})
