Feature: Gerenciamento de Promoções

  Scenario: Adicionar promoção com sucesso
    Given não existe uma promoção com nome "Black Friday"
    When adiciono uma promoção com os seguintes dados:
      """
      Nome: "Black Friday"
      Data de início: "2023-11-20"
      Data de fim: "2023-11-27"
      Desconto: 30
      """
    Then os dados da promoção criada são retornados

  Scenario: Tentar adicionar promoção com nome duplicado
    Given existe uma promoção com nome "Black Friday"
    When adiciono uma promoção com os seguintes dados:
      """
      Nome: "Black Friday"
      Data de início: "2023-12-01"
      Data de fim: "2023-12-10"
      Desconto: 20
      """
    Then recebo como resposta "Nome da promoção já existe"
