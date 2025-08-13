Feature: Gerenciamento de Promoções

  Scenario: Adicionar promoção com sucesso
    Given não existe uma promoção com nome "Black Friday"
    When faço uma requisição POST para "/promotions" com os seguintes dados:
      """
      Nome: "Black Friday"
      Data de início: "2023-11-20"
      Data de fim: "2023-11-27"
      Desconto: 30
      """
    Then a resposta deve ter status "201"
    And o corpo da resposta deve conter os dados da promoção criada

  Scenario: Tentar adicionar promoção com nome duplicado
    Given existe uma promoção com nome "Black Friday"
    When faço uma requisição POST para "/promotions" com os seguintes dados:
      """
      Nome: "Black Friday"
      Data de início: "2023-12-01"
      Data de fim: "2023-12-10"
      Desconto: 20
      """
    Then a resposta deve ter status "400"
    And o corpo da resposta deve conter a mensagem de erro "Nome da promoção já existe"