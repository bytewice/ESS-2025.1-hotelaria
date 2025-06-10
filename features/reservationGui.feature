Feature: Realizar, deletar e editar Reservas de Usuários no sistema
    As a usuário comum no sistema de hotelária
    I want to utilizar a interface para Realizar, deletar e editar Reservas
    So that eu possa gerenciar as minhas Reservas dentro do sistema

Scenario: Realizar Reserva com sucesso pela interface
    Given Estou na página de nome "Reservar Quarto"
    And Tenho "cartao 1" adicionado nos meus métodos de pagamento
    When Seleciono o quarto "232" do tipo "suíte"
    And Preencho o campo check in com "10/10/2025"
    And Preencho o campo check out com "14/10/2025"
    And Seleciono o método de pagamento "cartao 1"
    And Seleciono a opção "Realizar Reserva"
    Then Sou redirecionado para a página "Minhas Reservas"
    And Vejo a mensagem "Reserva realizada"
    And Vejo na minha lista de reservas o quarto "232"
    And O tipo quarto é "suíte"
    And A data de check in é "10/10/2025"
    And A data de check out é "14/10/2025" 
    And O método de Pagamento associado é "cartao 1"

Scenario: Editar Reserva com Sucesso pela interface
    Given Estou na página "Minhas Reservas"
    And Tenho a reserva do quarto "234" 
    And O tipo do quarto é "suíte" 
    And A data do check in é "10/10/2025"
    And A data do check out é "14/10/2025"
    And o método de pagamento é "cartao 2"
    When Seleciono a opção "Editar" na reserva do quarto "234"
    And Altero a data do Check out para "15/10/2025"
    And Seleciono a opção "Confirmar"
    Then Contínuo na página "Minhas Reservas"
    And Vejo a mensagem "Reserva Editada"
    And Minha reserva do quarto "234" contínua existindo
    And O tipo do quarto contínua sendo "suíte"
    And A data de check in contínua sendo "10/10/2025"
    And O Método de Pagamenteo contínua sendo "cartao 2"
    And A data de check out agora é "15/10/2025"

Scenario: Excluir Reserva com Sucesso pela interface
    Given Estou na página "Minhas Reservas"
    And Tenho a reserva do quarto "540"
    When Seleciono a opção "Excluir" na reserva do quarto "540"
    Then Continuo ná pagina "Minhas Reservas"
    And Recebo a mensagem "Reserva Excluída"
    And Não existe mais a reserva do quarto "540" na lista 