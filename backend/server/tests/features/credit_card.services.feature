Feature: Gerenciamento de cartões de crédito - Serviço

  Scenario: Listar cartões de crédito cadastrados
    Given existem 3 cartões de crédito cadastrados no sistema
    When eu executo a função para listar todos os cartões
    Then devo receber uma lista contendo 3 cartões
    And os cartões devem conter os dados corretos

  Scenario: Buscar cartão pelo nome
    Given existe um cartão com nome "cartão nubank" no sistema
    When eu executo a função para buscar o cartão pelo nome "cartão nubank"
    Then devo receber os dados do cartão correspondente
