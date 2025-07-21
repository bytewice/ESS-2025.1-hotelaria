Feature: pagamento

Scenario: Adicionar cartão como forma de pagamento
    Given: o usuário comum "João" está na página "meus cartões"
    And: Não há um cartão cadastrado com o apelido "cartão 1" 
    When: o usuario "João" vai para a página "adicionar cartão"
    And: adiciona o apelido "cartão 1", nome " Jõao Silva", Número do cartão "1234 5678 0123 4567", validade "07/26" e CVV "231"
    And: envia para o sistema os dados do cartão com apelido cartão 1
    Then: o sistema exibe a mensagem "cartão adicionado com sucesso"

Scenario: Adicionar cartão já existente
    Given: o usuário comum "João" está na página "meus cartões"
    And: o cartão com apelido "cartão 1" já está cadastrado
    When: o usuário "João" vai para a página "adicionar cartão"
    And: adiciona o apelido "cartão 1", nome " Jõao Silva", Número do cartão "1234 5678 0123 4567", validade "07/26" e CVV "231"
    And: envia para o sistema os dados do cartão com apelido "cartão 1"
    Then: o sistema exibe a mensagem "cartão já cadastrado"

Scenario: Cadastro de promoção 
    Given: o usuário administrador "Leandro" está na página "Cadastro e Manutenção de Promoção"
    And: A promoção com ID "1" não está cadastrada
    When: o sistema recebe uma solicitação para criar uma nova promoção
    And: o usuário adiciona a Promoção com ID "1" data de inicio "05/06", data de término "12/06" e o valor do desconto "10%"
    And: o sistema receber  a promoção com ID "1" data de inicio "05/06", data de término "12/06" e o valor do desconto "10%"
    Then: o sistema exibirá a mensagem: "promoção criada com sucesso"

Scenario: Manutenção de promoção 
    Given: o usuário administrador "Leandro" está na página "Cadastro e Manutenção de Promoção"
    And: A promoção com ID "1" está cadastrada
    When: o sistema recebe uma requisição para editar a promoção com ID "1"
    And: o usuário administrador edita a Promoção para data de inicio "05/06", data de término "19/06" e o valor do desconto "15%"
    And: o sistema recebe a edições feitas na promoção com ID "1"
    Then: o sistema exibirá a mensagem: "promoção atualizada com sucesso"

