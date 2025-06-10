Feature: Realizar, deletar e editar Reservas de Usuários no sistema
    As a usuário comum no sistema de hotelária
    I want to Realizar, deletar e editar Reservas
    So that eu possa utilizar a aplicação do sistema e gerenciar as minhas Reservas

Scenario: Realizar reserva com sucesso
    Given O user de login "pedd" está no sistema
    And Ele tem o método de pagamento "cartao 5" cadastrado
    When É enviado uma requesição para o sistema com o quarto de número "232" do tipo "comum"
    And A data de check in "05/05/2025"
    And A data de check out "07/05/2025"
    And O método de pagamento "Cartao 5"
    Then O sistema retorna a mensagem "Reserva realizada"
    And A reserva do quarto "232" com a data de check in "05/05/2025" e checkout "07/05/2025" é registrada no banco de dados

Scenario: Editar reserva com Sucesso
    Given O user de login "jpp" está no sistema
    And Ele tem o método de pagamento "cartao 0" cadastrado
    And Ele tem uma reserva do quarto "604" do tipo "suíte"
    And A reserva tem check in em "20/03/2025"
    And A reserva tem check out em "25/03/2025"
    And o método de pagamento da reserva é "cartao 0" 
    When É enviado uma requesição para o sistema com A data de check out "27/03/2025"
    Then O sistema retorna a mensagem "Reserva Editada"
    And A reserva do quarto "604" com a data de check in "05/05/2025" e checkout "07/05/2025" é atualizada no banco de dados

Scenario: Excluir reserva com Sucesso
    Given O user de login "pedd" está no sistema
    And Ele tem uma reserva do quarto "502" do tipo "suíte"
    When É enviado uma requesição para o sistema com o número do quarto "502"
    Then O sistema retorna a mensagem "Reserva Excluída"
    And A reserva do quarto "502" com a data de check in "05/05/2025" e checkout "07/05/2025" é excluída do banco de dados