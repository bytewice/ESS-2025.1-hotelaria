Feature: pagamento

Scenario: Adicionar cartão como forma de pagamento
    Given o usuário comum "João" está na página "meus cartões"
    When o usuario "João" clica em "adicionar cartão"
    And adiciona os dados "dados do cartão 1"
    And aperta o botão "adicionar"
    Then o sistema exibe a mensagem "cartão adicionado com sucesso"

Scenario: Adicionar cartão já existente
    Given o usuário comum "João" está na página "meus cartões"
    And o cartão "cartão 1" já está cadastrado
    When o usuário "João" clica em "adicionar cartão"
    And adiciona os dados "dados do cartão 1"
    And aperta o botão "adicionar"
    Then o sistema exibe a mensagem "cartão já cadastrado"

Scenario: Cadastro de promoção 
    Given o usuário administrador "Leandro" está na página "Cadastro e Manutenção de Promoção"
    When o administrador "Leandro" clicar em "criar promoção"
    And adicionar o período da promoção "7 dias" e o valor do desconto "10%"
    And clicar no botão "criar"
    Then o sistema exibirá a mensagem: "promoção criada com sucesso"

Scenario: Manutenção de promoção 
    Given o usuário administrador "Leandro" está na página "Cadastro e Manutenção de Promoção"
    When o administrador "Leandro" clicar em "atualizar promoção"
    And atualizar o período da promoção de "7 dias" para "1 dia" e o valor do desconto de "10%" para "20%"
    And clicar no botão "criar"
    Then o sistema exibirá a mensagem: "promoção atualizada com sucesso"

Scenario: Disparo de e-mail após confirmar reserva
    Given o usuário comum "João" está na página "reserva de quarto"
    When o usuário "João" confirma a "reserva do quarto"
    Then o usuário recebe um e-mail "reserva confirmada"

Scenario: Disparo de e-mail após reserva compartilhada
    Given o usuário comum "João" está na página "reserva de quarto"
    When o usuário "João" compartilha a "reserva do quarto" com o usuário comum "Leandro"
    Then o usuário "Leandro" recebe um e-mail "reserva compartilhada"

