  Feature: Gerenciamento de cartões de crédito

  Scenario: Listagem bem-sucedida de cartões
    Given existem 3 cartões de crédito cadastrados no sistema
    When faço uma requisição GET para "/credit_cards"
    Then a resposta deve ter status "200" 
    And o corpo da resposta deve ser uma lista com 3 cartões

  Scenario: Busca bem-sucedida por nome do cartão
    Given existe um cartão com nome "cartão nubank" no sistema
    When faço uma requisição GET para "/credit_cards/cartão nubank"
    Then a resposta deve ter status "200"
    And o corpo da resposta deve conter os dados do cartão
