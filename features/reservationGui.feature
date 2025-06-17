Feature: Realizar, deletar e editar Reservas de Usuários no sistema
    As a usuário comum no sistema de hotelária
    I want to utilizar a interface para Realizar, deletar e editar Reservas
    So that eu possa gerenciar as minhas Reservas dentro do sistema

# Arrumar com base na procura por data de check in e chack out
Scenario: Realizar Reserva com sucesso pela interface
    Given Estou na página de nome "Reservar Quarto"
    And Tenho "cartao 1" adicionado nos meus métodos de pagamento
    And Existe quarto de número "232" que não foi reservado
    When Seleciono o quarto "232"
    And Preencho o campo check in com "10/10/2025"
    And Preencho o campo check out com "14/10/2025"
    And Seleciono o método de pagamento "cartao 1"
    And Seleciono a opção "Realizar Reserva"
    Then Sou redirecionado para a página "Minhas Reservas"
    And Vejo a mensagem "Reserva realizada"
    And Vejo a reserva do quarto "232" na minha lista de reservas

Scenario: Editar Reserva com Sucesso pela interface
    Given Estou na página "Minhas Reservas"
    And Tenho a reserva do quarto "234" 
    And A data do check out é "14/10/2025"
    When Seleciono a opção "Editar" na reserva do quarto "234"
    And Altero a data do Check out para "15/10/2025"
    And Seleciono a opção "Confirmar"
    Then Continuo na página "Minhas Reservas"
    And Vejo a mensagem "Reserva Editada"
    And A data de check out agora é "15/10/2025"

Scenario: Excluir Reserva com Sucesso pela interface
    Given Estou na página "Minhas Reservas"
    And Tenho a reserva do quarto "540"
    When Seleciono a opção "Excluir" na reserva do quarto "540"
    Then Continuo na página "Minhas Reservas"
    And Recebo a mensagem "Reserva Excluída"
    And Não existe mais a reserva do quarto "540" na minha lista de reservas