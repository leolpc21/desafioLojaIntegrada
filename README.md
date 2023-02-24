# Desafio Loja Integrada

## Plano de teste

### 2.	Resumo
Há um grande número de usuários aplicando cupons de descontos em datas comerciais, como a Black Friday.
Acredita-se que quando o usuário acessar seu carrinho, terá um campo para inserir um cupom e um botão para aplicar o seu desconto.
Deseja-se verificar se ao clicar no botão "Usar cupom", o cupom será aplicado e será descontado o seu devido valor.

### 3. Pessoas envolvidas
Leonardo Costa

### 4. Funcionalidade a ser testado
A nova feature CUPOM da funcionalidade carrinho.

Será testado:
- Se ao clicar no botão "Usar cupom", os devidos cupons válidos serão aplicados.
- Se ao clicar no botão "Usar cupom", os devidos cupons inválidos será mostrado mensagem de invalidade.
- Ao aplicar os cupons válidos, será mostrado informações sobre o seu desconto.
- Ao aplicar os cupons válidos, será realizado o seu devido desconto.

Não será testado:
- Produto sendo adicionado no carrinho.

### 5. Critérios de aceite

Ao aplicar cupons válidos:
- O cupom será aplicado e será mostrado o que será descontado.
- Cupom "FRETEGRATIS"
  - O valor do frete será zerado
  - Forma de envio terá a frase "Frete Grátis"
  - No campo do cupom terá a frase "Frete Grátis"
  - O valor Total será a soma do valor Subtotal + o valor do frete zerado.
- Cupom "10OFF"
  - O valor descontado será de 10%
  - O valor do frete não será incluso no desconto
  - No campo do cupom terá a porcentagem de desconto e a frase "(frete não incluso)"
  - O valor total será o valor do subtotal - 10% + frete
- Cupom "30REAIS"
  - O valor descontado será fixo de 30 reais
  - O valor do frete não será incluso no desconto
  - No campo do cupom terá o valor de desconto e a frase "(frete não incluso)"
  - O valor total será o valor do subtotal - 30 + frete
- Cupom "AJJFLWBHH"
  - O valor descontado será de 5%
  - O valor do frete será incluso no desconto
  - No campo do cupom terá a porcentagem de desconto
  - O valor total será o valor do subtotal + valor do frete - 5%

Ao aplicar cupons inválidos:
- O cupom não será aplicado e será apresentado em uma tarja vermelha um alerta de invalidade.
- Cupom "CUPOMVENCIDO"
  - Será apresentado a mensagem "O cupom não é válido."
- Cupom "CUPOMINVENTADO"
  - Será apresentado a mensagem "Cupom não encontrado."


## Report de inconsistência

Titulo: Cupom não encontrado

Descrição: Ao aplicar o cupom "20LIMITADO" está apresentando a mensagem de que o cupom não existe.

Para reproduzir a inconsistência seguir os passos:
1. Na tela do carrinho com um produto adicionado
2. Incluir o cupom "20LIMITADO" no campo "Cupom de desconto"
3. Clicar no botão "Usar cupom"
4. Será apresentado a mensagem "Cupom não encontrado." em uma tarja vermelha.

<div align="center">
<img src="https://user-images.githubusercontent.com/43275999/221322041-ef0ff32b-27d1-41a1-87a1-cbffb86af21e.jpeg" width="750px" />
</div>