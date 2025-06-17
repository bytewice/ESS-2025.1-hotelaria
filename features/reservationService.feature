Feature: Realizar, deletar e editar Reservas de Usuários no sistema
    As a usuário comum no sistema de hotelária
    I want to Realizar, deletar e editar Reservas
    So that eu possa utilizar a aplicação do sistema e gerenciar as minhas Reservas

Scenario: Realizar reserva com sucesso
    Given O user de CPF "12312312312" está no sistema
    And Ele tem o método de pagamento "cartao 5" cadastrado
    And Existe quarto de número "232" que nunca foi reservado
    When É enviado para o sistema a reserva do quarto "232"
    And A data de check in "05/05/2025"
    And A data de check out "07/05/2025"
    And O método de pagamento "Cartao 5"
    Then O sistema retorna a mensagem "Reserva realizada"
    And A reserva do quarto "232" com a data de check in "05/05/2025" e checkout "07/05/2025" é registrada no banco de dados

Scenario: Falha ao realizar rerseva por falta de parâmetros
    Given O user de CPF "12312312312" está no sistema
    And Ele tem o método de pagamento "cartao 5" cadastrado
    And Existe quarto de número "232"
    When É enviado para o sistema a reserva do quarto de número "232"
    And A data de check in "06/07/2025"
    And A data de check out "08/07/2025"
    Then O sistema retorna a mensagem "Reserva não realizada: Preencha todos os campos"

# Depende da implementação de busca de quarto.
Scenario: Falha ao realizar uma reserva de quarto já reservado
    Given O user de CPF "14414414414" está no sistema
    And Ele tem o método de pagamento "cartao 5" cadastrado
    And O quarto de número "500" já foi reservado nas datas de check in "10/10/2025" e check out "14/10/2025"
    When É enviado uma requesição para o sistema com o quarto de número "500"
    And A data de check in "09/10/2025"
    And A data de check out "12/10/2025"
    And Método de pagamento "cartao 5"
    Then O sistema retorna a mensagem "Reserva não realizada: Intervalo de Datas conflitante"

Scenario: Editar reserva com Sucesso
    Given O user de CPF "14414414414" está no sistema
    And Ele tem uma reserva do quarto "604"
    And A reserva tem check out em "25/03/2025"
    And Nenhuma outra reserva existe para o quarto "604" entre "25/03/2025" e "27/03/2025"
    When É enviado uma requesição para o sistema com A data de check out "27/03/2025"
    Then O sistema retorna a mensagem "Reserva Editada"
    And A reserva do quarto "604" feita pelo user de CPF "14414414414" tem data de check out "27/03/2025"

# Um user pode ter mais de uma reserva agendada para o mesmo quarto?
Scenario: Excluir reserva com Sucesso
    Given O user de CPF "14414414414" está no sistema
    And Ele tem uma reserva do quarto "502"
    When É enviado para o sistema a exclusão da reserva feita pelo user de CPF "14414414414" para o quarto "502"
    Then O sistema retorna a mensagem "Reserva Excluída"
    And A reserva do quarto "502" do user de CPF "14414414414" não existe