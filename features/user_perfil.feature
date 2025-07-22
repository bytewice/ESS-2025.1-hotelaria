Feature: Interação com a interface de cadastro, edição e exclusão de usuários
    As a usuário comum do sistema de hotelaria
    I want to utilizar a interface gráfica para cadastrar, editar e deletar minha conta
    So that eu possa gerenciar minhas informações diretamente pelo sistema


@gui @cadastro_sucesso
Scenario: Cadastro de usuário com sucesso pela interface
    Given estou na página de "Cadastro de Usuário"
    When preencho os campos obrigatórios com:
        | Nome     | João               |
        | Senha    | senha10            |
        | CPF      | 123123123-12     |
        | E-mail   | dggb@cin.ufpe.br   |
        | Telefone | 8199555-5555       |
    And seleciono a opção "Cadastrar"
    Then Vejo a mensagem "Usuário cadastrado!"
    And Sou redirecionado para a página de "Login"

@gui @cadastro_falha_falta
Scenario: Falha no cadastro por falta de informações obrigatórias pela interface
    Given estou na página de "Cadastro de Usuário"
    When preencho os campos:
        | Nome     | Fernan             |
        | Senha    | senha11            |
        | E-mail   | dfer@cin.ufpe.br   |
    And seleciono a opção "Cadastrar"
    Then permaneço na página de "Cadastro de Usuário"
    And vejo a mensagem de erro "CPF é obrigatorio"

@gui @cadastro_falha_existe
Scenario: Falha no cadastro por informações únicas repetidas pela interface
    Given já existe um usuário com CPF "113113113-11" no sistema
    And estou na página de "Cadastro de Usuário"
    When preencho os campos:
        | Nome     | Valdemar           |
        | Senha    | senha12            |
        | E-mail   | plok@cin.ufpe.br   |
        | CPF      | 113113113-11     |
        | Telefone | 8193333-3333       |
    And seleciono a opção "Cadastrar"
    Then permaneço na página "Cadastro de Usuário"
    And vejo a mensagem de erro "Já existe um usuário com este CPF"

@gui @cadastro_falha_senha
Scenario: Falha no cadastro por Senha pequena pela interface
    Given estou na página de "Cadastro de Usuário"
    When preencho os campos:
    | Nome     | Neymar             |
    | Senha    | senha              |
    | E-mail   | uva@cin.ufpe.br    |
    | CPF      | 777777777-77     |
    | Telefone | 8197777-7777       |
    And seleciono a opção "Cadastrar"
    Then permaneço na página "Cadastro de Usuário"
    And vejo a mensagem de erro "A senha deve ter 6 ou mais caracteres"

@gui @delecao_sucesso
Scenario: Autorremoção de usuário com sucesso pela interface
    Given estou logado como o usuário com CPF "234234234-23"
    And estou na página de "Perfil do Usuário"
    When seleciono a opção "Excluir conta"
    And confirmo a exclusão
    Then vejo a mensagem "Removido com Sucesso"
    And sou redirecionado para a "Página Inicial"

@gui @edicao_sucesso
Scenario: Edição de usuário com sucesso pela interface
    Given estou logado como o usuário de CPF "345345345-34"
    And minha senha é "senhasenha"
    And estou na página de "Perfil do Usuário"
    When seleciono a opção "Editar Usuário"
    And altero o campo senha para "123456789"
    Then vejo a mensagem "Edição Concluída"
    And permaneço na página de "Perfil do Usuário"
    And o campo senha agora é "123456789"

@gui @edicao_falha_repetido
Scenario: Falha na edição por informações repetidas entre usuários pela interface
    Given estou logado como o usuário de CPF "123456789-12"
    And existe um usuário de CPF "234567890-21" no sistema
    And estou na página de "Perfil do Usuário"
    When seleciono a opção "Editar Usuário"
    And altero o campo CPF para "234567890-21"
    Then vejo a mensagem "CPF já cadastrado"
    And permaneço na página de "Perfil do Usuário"
    And o campo CPF continua sendo "123456789-12"

@gui @edicao_falha_senha
Scenario: Falha na edição por tentar alterar senha para uma inválida pela interface
    Given estou logado como o usuário de CPF "123456789-12" com a senha "1234567"
    And estou na página de "Perfil do Usuário"
    When seleciono a opção "Editar Usuário"
    And Altero o campo senha para "1234"
    Then vejo a mensagem "A senha deve ter 6 ou mais caracteres"
    And permaneço na página de "Perfil do Usuário"
    And o campo senha continua sendo "1234567"


@api @cadastro_sucesso
Scenario: Cadastro de usuário com sucesso
    Given não existe usuário com CPF "123123123-12" no sistema
    When é enviada uma requisição para cadastrar um novo user com:
        | Nome      | João              |
        | Senha     | senha10           |
        | CPF       | 123.123.123-12    |
        | E-mail    | dggb@cin.ufpe.br  |
    Then o sistema retorna a mensagem "Usuário cadastrado!"
    And o novo usuário de CPF "123123123-12" faz parte do sistema

@api @cadastro_falha_falta
Scenario: Falha no cadastro por falta de informações
    Given não existe um usuário com CPF "321321321-24" no sistema
    When é enviada uma requisição para cadastrar um novo user com:
        | Nome      | Fernando          |
        | Senha     | senha11           |
        | E-mail    | dfer@cin.ufpe.br  |
        | Telefone  | 8194444-4444      |
    Then o sistema retorna a mensagem "CPF é obrigatório"
    And não existe usuário de CPF "321321321-24" cadastrado no sistema

@api @cadastro_falha_senha
Scenario: Falha no cadastro por Senha pequena
    Given não existe um usuário de CPF "343343343-34" no sistema
    When é enviada uma requisição para cadastrar um novo user com:
        | Nome      | Rafael            |
        | Senha     | senha             |
        | E-mail    | mfg2@cin.ufpe.br  |
        | CPF       | 444444444-44      |
        | Telefone  | 8190000-1111      |
    Then o sistema retorna a mensagem "A senha deve ter 6 ou mais caracteres"
    And o usuário de CPF "343343343-34" não está cadastrado no sistema

@api @cadastro_falha_repetir
Scenario: Falha no cadastro por informações repetidas entre usuários
    Given existe um usuário de CPF "113113113-11" no sistema
    When é enviada uma requisição para cadastrar um novo user com CPF igual a "113113113-11"
    Then o sistema retorna a mensagem "Já existe usuário com este CPF"
    And o usuário de Email "plok@cin.ufpe.br" não está cadastrado no sistema

@api @delecao_sucesso
Scenario: Autorremoção de usuário com sucesso
    Given existe um usuário de CPF "234234234-23" no sistema
    When é enviada uma requesição para remover o usuário com CPF igual à "234234234-23"
    Then o sistema retorna a mensagem "Removido com sucesso"
    And não existe usuário de CPF "234234234-23" no sistema

@api @edicao_sucesso
Scenario: Edição de usuário com sucesso
    Given existe um usuário com nome "Valdermar" e CPF "121121121-12" no sistema
    When é enviada uma requesição para mudar o seu nome para "jorge10"
    Then o campo nome do usuário de CPF "121121121-12" é alterado para "jorge10"
    And o sistema retorna a mensagem "Edição concluída" 

@api @edicao_falha_repetir
Scenario: Falha na edição por informações repetidas entre usuários
    Given existe um usuário de CPF "100100100-10" no sistema
    And existe um usuário de CPF "120120120-12" no sistema
    When o usuário de CPF "100100100-10" envia um requesição para editar seu CPF para "120120120-12"
    Then o usuário continua com o CPF "100100100-10"
    And o sistema retorna a mensagem "Já existe usuário com esse CPF"

@api @edicao_falha_senha
Scenario: Falha na edição por tentar alterar senha para uma inválida
    Given existe um usuário de CPF "300300300-30" e de senha "123456" no sistema
    When ele envia uma requesição para editar sua senha para "12345"
    Then o usuário de CPF "300300300-30" continua com a senha "123456"
    And o sistema retorna a mensagem "A senha deve ter 6 ou mais caracteres"