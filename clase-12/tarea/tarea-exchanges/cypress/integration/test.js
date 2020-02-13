/// <reference types="Cypress" />

const URL = '192.168.1.37:8080'

context('Exchanges', () => {
  before(() => {
    cy.visit(URL)
  })

  it('Verificando que todas las bases esten cargadas', () => {
    cy.get('#listado-bases').find('option').should('have.length', 34) // Corregir ese 34
  })

  describe('Probando un cambio', () => {
    it('Ingresando datos', () => {
      cy.get('#listado-bases').select('USD')

      cy.get('#fecha').type('2019-11-05')
    })

    it('Buscando y comprobando datos', () => {
      cy.get('#convertir').click().should('to.exist', cy.get('#devolucion-monedas'))
    })
  })
})
