// https://docs.cypress.io/api/introduction/api.html

function checkTabContent (label) {
  cy.get('.nav-item').contains('Employee')
  cy.get('.nav-item').contains('Employer')
  cy.get('form').contains(label)
  cy.get('input').should('have.attr', 'placeholder', 'e.g: 60000')
  cy.get('[data-cy=submit]').contains('Submit')
}

function checkErrorMessage () {
  cy.get('.invalid-feedback').should('be.visible').contains('Please type a valid number for your wage (between 1 and 500 000)')
}

function switchTab (tabName) {
  cy.get('.nav-item').contains(tabName).click()
}

function typeAndCheck (selector, value, expectedValue) {
  expectedValue = expectedValue === undefined ? value : expectedValue
  return cy.get(selector).type(value).should('have.value', expectedValue)
}

function submit () {
  cy.get('[data-cy=submit]').click()
}

function closeModal () {
  cy.get('[data-cy="modal:close"]').click()
}

describe('Basic test', () => {
  it('Checks elements are present', () => {
    cy.visit('/')
    cy.contains('h1', 'Salary match')
    cy.get('.modal').should('be.hidden')

    checkTabContent('Your expected wage')
  })

  it('Interacts with Tabs', () => {
    switchTab('Employer')
    checkTabContent('Maximum wage')
    switchTab('Employee')
    checkTabContent('Your expected wage')
  })

  it('Types invalid string values', () => {
    typeAndCheck('input', 'A string is not valid', '')
      .type('A string is not valid').should('have.value', '')
      .type(' ').should('have.value', '')
      .type('\\ \'$@`').should('have.value', '')
  })

  it('Types below min and above max values', () => {
    // cy.clear() cannot be used since it will perform a 'Ctrl+a' and we forbid all keys but 'backspace' and 'number'
    const eraseChar = new Array(6).fill('{backspace}').join('')
    typeAndCheck('input', '0')
      .type('{backspace}').should('have.value', '')
      .type(999999).should('have.value', '999999')
    submit()
    checkErrorMessage()

    typeAndCheck('input', eraseChar, '')
      .type(0).should('have.value', '0')
    checkErrorMessage()
    typeAndCheck('input', eraseChar, '')
  })

  it('Types valid values & display modal', () => {
    const minWage = parseInt((Math.random() * 499999) + 1).toString()
    const maxWage = parseInt((Math.random() * 499999) + 1).toString()

    typeAndCheck('input', minWage)
    submit()

    switchTab('Employer')
    cy.get('input').should('have.value', '')

    switchTab('Employee')
    cy.get('input').should('have.value', minWage)

    switchTab('Employer')
    typeAndCheck('input', maxWage)
    submit()

    cy.get('.modal-body').should('be.visible').then(($modal) => {
      const text = $modal.text()
      if (+minWage <= +maxWage) {
        expect(text).to.eq(`Success ! Candidate wishes ${minWage}€ and company offers ${maxWage}€`)
      } else {
        expect(text).to.eq(`Failure ! Candidate wishes ${minWage}€ and company offers ${maxWage}€`)
      }
      closeModal()
      cy.get('.modal').should('be.hidden')
      cy.get('input').should('have.value', '')

      switchTab('Employee')
      cy.get('input').should('have.value', '')
    })
  })
})
