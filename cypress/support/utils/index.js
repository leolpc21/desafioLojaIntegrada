
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

    function round(num, places) {
      if (!("" + num).includes("e")) {
        return +(Math.round(num + "e+" + places) + "e-" + places);
      } else {
        let arr = ("" + num).split("e");
        let sig = ""
        if (+arr[1] + places > 0) {
          sig = "+";
        }

        return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
      }
    }

    switch (tipoDesconto) {
      case 'frete_gratis':
        var valorTotal = valorItem + valorFrete
        return round(valorTotal, 2)

      case 'porcentagem':
        if (incluiFrete == true) {
          var valorTotal = (valorItem + valorFrete) - ((valorItem + valorFrete) * (valorCupom / 100))
          return round(valorTotal, 2)
        }
        else {
          var valorTotal = valorItem - (valorItem * (valorCupom / 100)) + valorFrete
          return round(valorTotal, 2)
        }

      case 'fixo':
        var valorTotal = (valorItem - valorCupom) + valorFrete
        return round(valorTotal, 2)

      default:
        break;
    }
  }
}

export default new GenericsUtils();