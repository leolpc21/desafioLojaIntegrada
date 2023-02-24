/// <reference types="cypress" />
import genericsUtils from "../support/utils";

describe('Validar cupons', () => {

  var produtos = {
    produto1: '[CATEGORIA] Produto com categoria - 2 Nível',
    produto2: '[CATEGORIA] Produto com categoria - 3 Nível'
  }

  var cupons = {
    freteGratis: 'FRETEGRATIS',
    off10: '10OFF',
    reais30: '30REAIS',
    limitado20: '20LIMITADO',
    porcento5: 'AJJFLWBHH',
    cupomVencido: 'CUPOMVENCIDO',
    cupomInventado: 'CUPOMINVENTADO',
    cupomNaoExiste: 'CUPOMNAOEXISTE'
  }

  beforeEach(function () {
    cy.visit('/')
    cy.addProdutoCarrinho(produtos.produto1)
    cy.calcularFrete('32183190')
  })

  context('Validar aplicação de cupons', () => {
    const cuponsValidos = [
      { cupom: cupons.freteGratis, nome: 'Frete grátis' },
      { cupom: cupons.off10, nome: '10 Off' },
      { cupom: cupons.reais30, nome: '30 Reais' },
      { cupom: cupons.porcento5, nome: '5%' }
    ]

    const cuponsInvalidos = [
      { cupom: cupons.limitado20, nome: 'Limitado 20', mensagem: 'Cupom não encontrado.' },
      { cupom: cupons.cupomVencido, nome: 'Vencido', mensagem: 'O cupom não é válido.' },
      { cupom: cupons.cupomInventado, nome: 'Inventado', mensagem: 'Cupom não encontrado.' },
      { cupom: cupons.cupomNaoExiste, nome: 'Não existe', mensagem: 'Cupom não encontrado.' }
    ]

    cuponsValidos.forEach(function (cupom) {
      it('Validar cupom ' + cupom.nome, () => {
        cy.aplicarCupom(cupom.cupom)
        cy.get('.cupom-codigo').contains(cupom.cupom)
      });
    })

    cuponsInvalidos.forEach(function (cupom) {
      it('Validar cupom ' + cupom.nome, () => {
        cy.aplicarCupom(cupom.cupom)
        cy.get('.alert-geral').contains(cupom.mensagem)
      });
    })
  })

  context('Validar cupom Frete grátis', () => {

    beforeEach(function () {
      cy.aplicarCupom(cupons.freteGratis)
    })

    it('Validar desconto cupom ', () => {
      cy.get('.formas-envio').contains('Frete Grátis')
      cy.get('.cupom-valor').contains('Frete Grátis')
      cy.get('label:contains("Frete Grátis")')
        .find('.valor')
        .contains(Cypress.env('valorFreteMoeda'))
      var valorTotal = genericsUtils.functionValorTotal(Cypress.env('tipoDesconto'), Cypress.env('valorItens'), 0, Cypress.env('valorFrete'))
      cy.get('[data-subtotal-valor]').contains(genericsUtils.functionMoeda(valorTotal))
      cy.get('[data-total-valor]').contains(genericsUtils.functionMoeda(valorTotal))
    });
  })

  context('Validar cupom 10OFF', () => {

    beforeEach(function () {
      cy.aplicarCupom(cupons.off10)
    })

    it('Validar desconto cupom', () => {
      cy.validarValorCupom(Cypress.env('cupomValor1'))
      var valorTotal = genericsUtils.functionValorTotal(Cypress.env('tipoDesconto'), Cypress.env('valorItens'), Cypress.env('cupomValor2'), Cypress.env('valorFrete'))
      cy.get('[data-total-valor]').contains(genericsUtils.functionMoeda(valorTotal))
    });
  })

  context('Validar cupom 30REAIS', () => {

    beforeEach(function () {
      cy.aplicarCupom(cupons.reais30)
    })

    it('Validar desconto cupom', () => {
      cy.validarValorCupom(Cypress.env('cupomValor1'))
      var valorTotal = genericsUtils.functionValorTotal(Cypress.env('tipoDesconto'), Cypress.env('valorItens'), Cypress.env('cupomValor2'), Cypress.env('valorFrete'))
      cy.get('[data-total-valor]').contains(genericsUtils.functionMoeda(valorTotal))
    });
  })

  context('Validar cupom AJJFLWBHH', () => {

    beforeEach(function () {
      cy.aplicarCupom(cupons.porcento5)
    })

    it('Validar desconto cupom', () => {
      cy.validarValorCupom(Cypress.env('cupomValor1'))
      var valorTotal = genericsUtils.functionValorTotal(Cypress.env('tipoDesconto'), Cypress.env('valorItens'), Cypress.env('cupomValor2'), Cypress.env('valorFrete'), true)
      cy.get('[data-total-valor]').contains(genericsUtils.functionMoeda(valorTotal))
    });
  })
})