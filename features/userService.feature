Feature: Cadastro, deletar e atualização de Usuários no sistema
    As a usuário comum no sistema de hotelária
    I want to Cadastrar, deletar e editar contas
    So that eu possa entrar no sistema com minhas informações

Scenario: Cadastro de usuário com sucesso
    Given não existe usuário com CPF "123.123.123-12"
    And não existe usuário com Login igual a "pepino"
    When é enviada uma requisição para cadastrar um novo user com:
        | Nome      | João              |
        | Login     | pepino            |
        | Senha     | senha10           |
        | CPF       | 123.123.123-12    |
        | E-mail    | dggb@cin.ufpe.br  |
        | Telefone  | 8199555-5555      |
    Then o sistema retorna a mensagem "Usuário cadastrado!"
    And o novo usuário de CPF "123.123.123-12" faz parte do sistema

Scenario: Falha no cadastro por falta de informações
    Given não existe usuário com login "tangerina"
    When é enviada uma requisição para cadastrar um novo user com:
        | Nome      | Fernando            |
        | Login     | tangerina         |
        | Senha     | senha11           |
        | E-mail    | dfer@cin.ufpe.br  |
        | Telefone  | 8194444-4444      |
    Then o sistema retorna a mensagem "CPF e Login são obrigatórios"
    And o usuário de login "tangerina" não está cadastrado no sistema

Scenario: Falha no cadastro por Senha pequena
    Given não existe um usuário de CPF "343.343.343-34" cadastrado no sistema
    When é enviada uma requisição para cadastrar um novo user com:
        | Nome      | Rafael            |
        | Login     | laranja           |
        | Senha     | senha             |
        | E-mail    | mfg2@cin.ufpe.br  |
        | CPF       | 444.444.444-44    |
        | Telefone  | 8190000-1111      |
    Then o sistema retorna a mensagem "A senha deve ter 6 ou mais caracteres"
    And o usuário de CPF "343.343.343-34" não está cadastrado no sistema

Scenario: Falha no cadastro por informações repetidas entre usuários
    Given existe um usuário de CPF "113.113.113-11"
    When é enviada uma requisição para cadastrar um novo user com:
        | Nome      | Valdemar          |
        | Login     | abacate           |
        | Senha     | senha12           |
        | E-mail    | plok@cin.ufpe.br  |
        | CPF       | 113.113.113-11    |
        | Telefone  | 8193333-3333      |
    Then o sistema retorna a mensagem "Já existe usuário com este CPF"
    And o usuário de login "abacate" não está cadastrado no sistema

Scenario: Autorremoção de usuário com sucesso
    Given existe um usuário de CPF "234.234.234-23" no sistema
    When é enviada uma requesição para remover o usuário com identificador CPF igual à "234.234.123-19"
    Then o sistema retorna a mensagem "Removido com sucesso"
    And não existe usuário de CPF "234.234.234-23" no sistema

Scenario: Edição de usuário com sucesso
    Given existe um usuário com:
        | Nome      | Valdemar          |
        | Login     | melão             |
        | Senha     | senha13           |
        | CPF       | 121.121.121-12    |
        | E-mail    | minu@cin.ufpe.br  |
        | Telefone  | 8192222-2222      |
    When é enviada uma requesição para mudar a senha do usuário de CPF "121.121.121-12" para "jorge10"
    Then o campo senha do usuário de CPF "121.121.121-12" é alterado para "jorge10"
    And o sistema retorna a mensagem "Edição concluída" 

Scenario: Falha na edição por informações repetidas entre usuários
    Given existe um usuário de login "Marcelo"
    And existe um outro usuário de login "Breno"
    When o usuário "Breno" envia um requesição para editar seu login para "Marcelo"
    Then o usuário continua com o login "Breno"
    And o sistema retorna a mensagem "Edição inválida por informações repetidas"

Scenario: Falha na edição por tentar alterar senha para uma inválida
    Given existe um usuário de login "bggb" e de senha "123456"
    When ele envia uma requesição para editar sua senha para "12345"
    Then o usuário continua com a senha "123456"
    And o sistema retorna a mensagem "A senha deve ter 6 ou mais caracteres"
