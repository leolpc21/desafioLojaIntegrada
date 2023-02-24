
class GenericsUtils {
  functionMoeda(valor) {
    var valorMoeda = valor.toLocaleString('pt-br', { minimumFractionDigits: 2 })
    return valorMoeda
  }

  functionNumero(str) {
    var numero = str.replace(/[^0-9,]*/g, '').replace(',', '.')
    return numero
  }

  functionValorTotal(tipoDesconto, valorItem, valorCupom, valorFrete, incluiFrete = false) {

    function round(num) {
      if (((num + "").split(".")[1]).length == 3 || ((num + "").split(".")[1]).substr(2, 1) == 5) {
        const og = Math.pow(10, 2)
        return Math.trunc(num * og) / og;
      } else {
        return ((Math.round(num * 100) / 100).toFixed(2)).replace('.', ',')
      }
    }

    switch (tipoDesconto) {
      case 'frete_gratis':
        var valorTotal = valorItem + valorFrete
        return valorTotal

      case 'porcentagem':
        if (incluiFrete == true) {
          var valorTotal = (valorItem + valorFrete) - ((valorItem + valorFrete) * (valorCupom / 100))
          return round(valorTotal)

        }
        else {
          var valorTotal = (valorItem - (valorItem * (valorCupom / 100))) + valorFrete
          return round(valorTotal)
        }

      case 'fixo':
        var valorTotal = (valorItem - valorCupom) + valorFrete
        return valorTotal

      default:
        break;
    }
  }
}

export default new GenericsUtils();