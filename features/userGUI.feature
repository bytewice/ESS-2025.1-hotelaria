Feature: Interação com a interface de cadastro, edição e exclusão de usuários
    As a usuário comum do sistema de hotelaria
    I want to utilizar a interface gráfica para cadastrar, editar e deletar minha conta
    So that eu possa gerenciar minhas informações diretamente pelo sistema

Scenario: Cadastro de usuário com sucesso pela interface
    Given estou na página de "Cadastro de Usuário"
    And preencho os campos obrigatórios com:
        | Nome     | João               |
        | Login    | pepino             |
        | Senha    | senha10            |
        | CPF      | 123.123.123-12     |
        | E-mail   | dggb@cin.ufpe.br   |
        | Telefone | 8199555-5555       |
    When seleciono a opção "Cadastrar"
    Then Vejo a mensagem "Usuário cadastrado!"
    And Sou redirecionado para a página de "Login"

Scenario: Falha no cadastro por falta de informações obrigatórias pela interface
    Given estou na página de "Cadastro de Usuário"
    And preencho os campos:
        | Nome     | Fernan             |
        | Login    | tangerina          |
        | Senha    | senha11            |
        | E-mail   | dfer@cin.ufpe.br   |
    And deixo o campo "CPF" e "Telefone" vazios
    When seleciono a opção "Cadastrar"
    Then permaneço na página de "Cadastro de Usuário"
    And vejo a mensagem de erro "CPF e Login são obrigatórios"

Scenario: Falha no cadastro por informações únicas repetidas pela interface
    Given já existe um usuário com CPF "113.113.113-11"
    And estou na página de "Cadastro de Usuário"
    When preencho os campos:
        | Nome     | Valdemar           |
        | Login    | abacate            |
        | Senha    | senha12            |
        | E-mail   | plok@cin.ufpe.br   |
        | CPF      | 113.113.113-11     |
        | Telefone | 8193333-3333       |
    And seleciono a opção "Cadastrar"
    Then permaneço na página "Cadastro de Usuário"
    And vejo a mensagem de erro "Já existe um usuário com este CPF"

Scenario: Falha no cadastro por Senha pequena pela interface
    Given estou na página de "Cadastro de Usuário"
    When preencho os campos:
    | Nome     | Neymar             |
    | Login    | Uva                |
    | Senha    | senha              |
    | E-mail   | uva@cin.ufpe.br    |
    | CPF      | 777.777.777-77     |
    | Telefone | 8197777-7777       |
    And seleciono a opção "Cadastrar"
    Then permaneço na página "Cadastro de Usuário"
    And vejo a mensagem de erro "A senha deve ter 6 ou mais caracteres"

Scenario: Autorremoção de usuário com sucesso pela interface
    Given estou logado como o usuário com CPF "234.234.234-23"
    And estou na página de "Perfil do Usuário"
    When seleciono a opção "Excluir conta"
    And confirmo a exclusão
    Then vejo a mensagem "Removido com Sucesso"
    And sou redirecionado para a "Página Inicial"

Scenario: Edição de usuário com sucesso pela interface
    Given estou logado como o usuário de CPF "345.345.345-34"
    And minha senha é "senhasenha"
    And estou na página de "Perfil do Usuário"
    When seleciono a opção "Editar Usuário"
    And altero o campo senha para "123456789"
    Then vejo a mensagem "Edição Concluída"
    And permaneço na página de "Perfil do Usuário"
    And o campo senha agora é "123456789"

Scenario: Falha na edição por informações repetidas entre usuários pela interface
    Given estou logado como o usuário de login "dggb"
    And existe um usuário de login "mfg2"
    And estou na página de "Perfil do Usuário"
    When seleciono a opção "Editar Usuário"
    And altero o campo login para "mfg2"
    Then vejo a mensagem "Login já existe"
    And permaneço na página de "Perfil do Usuário"
    And o campo login continua sendo "dggb"

Scenario: Falha na edição por tentar alterar senha para uma inválida pela interface
    Given estou logado como o usuário de login "dggb" com a senha "1234567"
    And estou na página de "Perfil do Usuário"
    When seleciono a opção "Editar Usuário"
    And Altero o campo senha para "1234"
    Then vejo a mensagem "A senha deve ter 6 ou mais caracteres"
    And permaneço na página de "Perfil do Usuário"
    And o campo senha continua sendo "1234567"

