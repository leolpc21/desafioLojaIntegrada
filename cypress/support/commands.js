/// <reference types="cypress" />
import genericsUtils from "../support/utils";

Cypress.Commands.add('addProdutoCarrinho', function (produto) {
  cy.get(`.listagem-item:contains("${produto}")`)
    .click()
  cy.get('.principal .comprar')
    .click()
})

Cypress.Commands.add("esperar", function (wait, status) {
  cy.wait(`@${wait}`, { timeout: 10000 })
    .its("response.statusCode")
    .should("eq", status);
});

Cypress.Commands.add("validarValorCupom", function (text) {
  cy.get('.cupom-valor')
    .find('strong')
    .invoke('text')
    .should('equal', text)
})

Cypress.Commands.add('calcularFrete', function (cep) {
  cy.intercept('GET', 'https://qastoredesafio.lojaintegrada.com.br/carrinho/valor/**').as('calcularFrete')
  cy.get('#calcularFrete')
    .type(cep)
  cy.get('#btn-frete')
    .click()
    .wait('@calcularFrete')
  cy.get('input[type="radio"][data-code="SEDEX"]')
    .click()
    .wait('@calcularFrete')
})

Cypress.Commands.add('aplicarCupom', function (cupom) {
  cy.intercept('GET', 'https://qastoredesafio.lojaintegrada.com.br/carrinho/valor/**').as('usarCupom')
  cy.get('#usarCupom')
    .type(cupom)
  cy.get('#btn-cupom')
    .should('be.visible')
    .click()
    .wait('@usarCupom')
    .then(function (response) {
      Cypress.env('tipoDesconto', response.response.body.tipo_desconto)
      Cypress.env('valorItens', response.response.body.valor_items)
      Cypress.env('valorFrete', response.response.body.valor_frete)

      if (Cypress.env('tipoDesconto') != "") {
        cy.get('.cupom-valor')
          .find('strong')
          .invoke('text')
          .then((text) => {
            Cypress.env('cupomValor1', text)

            var valor = genericsUtils.functionNumero(text)
            Cypress.env('cupomValor2', valor)
          })
      }
      Cypress.env('valorFreteMoeda', genericsUtils.functionMoeda(Cypress.env('valorFrete')))
    })
})

Cypress.on('uncaught:exception', (err) => {
  console.log('Cypress detected uncaught exception: ', err)
  return false
})