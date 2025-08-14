Feature: Gerenciamento de Reservas
  Como administrador do hotel
  Eu quero gerenciar reservas
  Para que eu possa adicionar, editar, excluir e visualizar reservas corretamente

  Background:
    Dado que estou na página de "Gerenciar Reservas"

  Scenario: Criar uma reserva válida
    Quando clico no botão "➕ Nova Reserva"
    E preencho o campo "CPF do Hóspede" com "12345678900"
    E preencho a data de entrada com "2025-08-20"
    E preencho a data de saída com "2025-08-25"
    E preencho o campo "Número do Quarto" com "101"
    E preencho o campo "Preço" com "1500"
    E preencho o campo "Pagamento" com "1500"
    E clico no botão "Salvar"
    Então devo ver a reserva com CPF "12345678900" na lista de reservas

  Scenario: Editar o check-out de uma reserva
    Dado que existe uma reserva com CPF "12345678900"
    Quando clico no botão "✏️ Editar" correspondente a essa reserva
    E altero a data de saída para "2025-08-26"
    E clico em "Salvar"
    Então a reserva com CPF "12345678900" deve ter a data de saída "26/08/2025"

  Scenario: Excluir uma reserva existente
    Dado que existe uma reserva com CPF "12345678900"
    Quando clico no botão "🗑️ Excluir" correspondente a essa reserva
    E confirmo a exclusão
    Então não devo ver a reserva com CPF "12345678900" na lista

  Scenario: Filtrar reservas usando CPF
    Dado que existem reservas com CPFs "12345678900" e "98765432100"
    Quando seleciono "CPF" no filtro
    E preencho o filtro com "98765432100"
    E clico em "🔍 Buscar CPF"
    Então devo ver apenas a reserva com CPF "98765432100" na lista

  Scenario: Filtrar reservas por datas
    Dado que existem reservas de "2025-08-20" a "2025-08-25" e de "2025-08-26" a "2025-08-30"
    Quando seleciono "Intervalo de Datas" no filtro
    E preencho "De" com "2025-08-20"
    E preencho "Até" com "2025-08-25"
    E clico em "🔍 Buscar Datas"
    Então devo ver apenas a reserva que começa em "20/08/2025"

  Scenario: Filtrar reservas por quarto
    Dado que existem reservas nos quartos "101" e "102"
    Quando seleciono "Número do Quarto" no filtro
    E preencho o filtro com "102"
    E clico em "🔍 Buscar Quarto"
    Então devo ver apenas a reserva do quarto "102"
