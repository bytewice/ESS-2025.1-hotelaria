Feature: atrações

  As a hóspede,
  I want to visualizar a lista de atrações disponíveis e classificar as que já visitei,
  So that eu possa organizar minhas experiências e descobrir novas atrações para aproveitar

#  Scenario: Entrando em uma página de uma atração
#    Given que o usuario de cpf "08622635480" esta na pagina de "Atrações"
#    When o usuario seleciona "Spa"
#    Then o usuario e movido para página "Spa"
#
#  Scenario: Entrando na página de avaliação
#    Given que o usuario de cpf "08622635480" esta na pagina de "Spa"
#    When o usuario seleciona "Avaliar"
#    Then o usuario e movido para página "Avaliar Spa"
#
#  Scenario: Preenchendo a página de avaliação com campos válidos
#    Given que o usuário de CPF "08622635480" está na página "Avaliar Spa"
#    And visualiza os seguintes campos a serem preenchidos:
#      | Campo      | Valor            |
#      | Nome       | Ana              |
#      | Nota       | 5                |
#      | Comentário | Muito Relaxante  |
#      | Data       | <data atual>     |
#    When o usuário preenche os campos e seleciona "Confirmar"
#    Then o usuário é movido para a página "Avaliar Spa"
#    And visualiza sua avaliação
#
#  Scenario: Preenchendo a página de avaliação sem preencher nome
#    Given que o usuário de CPF "08622635480" está na página "Avaliar Spa"
#    And visualiza os seguintes campos a serem preenchidos:
#      | Campo      | Valor            |
#      | Nome       |                  |
#      | Nota       | 5                |
#      | Comentário | Muito Relaxante  |
#      | Data       | <data atual>     |
#    When o usuário preenche os campos e seleciona "Confirmar"
#    Then o usuário recebe uma mensagem de erro "Campos inválidos"
#
#  Scenario: Preenchendo a página de avaliação sem preencher nota
#    Given que o usuário de CPF "08622635480" está na página "Avaliar Spa"
#    And visualiza os seguintes campos a serem preenchidos:
#      | Campo      | Valor            |
#      | Nome       | Ana              |
#      | Nota       |                  |
#      | Comentário | Muito Relaxante  |
#      | Data       | <data atual>     |
#    When o usuário preenche os campos e seleciona "Confirmar"
#    Then o usuário recebe uma mensagem de erro "Campos inválidos" 

  @service
  Scenario:Avaliação válida de atração
    Given a atração "Spa" existe no sistema
    When é enviada uma avaliação com os seguintes dados:
      | nome       | nota | comentario      | data         |  
      | Ana        | 5    | Muito Relaxante | <data_atual> |  
    Then o sistema retorna status "201 Created"
    And a avaliação é registrada

#  /*@service
#  Scenario: Falha ao enviar avaliação sem nota
#    Given o usuário de CPF "08622635480"
#    And a atração "Spa" existe no sistema
#    When é enviada uma requisição POST com os dados:
#      | nome       | Ana              |
#      | comentario | Muito Relaxante  |
#    Then o sistema retorna status "400 Bad Request"
#    And a resposta contém a mensagem "Campo nota é obrigatório"
#
#  @service
#  Scenario: Listar atrações disponíveis com sucesso
#    Given existem as seguintes atrações cadastradas no sistema:
#      | Nome     | Categoria | Localização |
#      | Spa      | Relax     | Bloco A     |
#      | Piscina  | Lazer     | Bloco B     |
#      | Academia | Fitness   | Bloco C     |
#    When é realizada uma requisição GET para a rota "/api/atracoes"
#    Then o sistema retorna o status "200 OK"
#    And o corpo da resposta contém uma lista com as atrações:
#      | Nome     | Categoria | Localização |
#      | Spa      | Relax     | Bloco A     |
#      | Piscina  | Lazer     | Bloco B     |
#      | Academia | Fitness   | Bloco C     |
#
#  @service
#  Scenario: Visualizar detalhes da atração "Spa"
#    Given a atração com nome "Spa" está cadastrada no sistema com os seguintes dados:
#      | Nome       | Categoria | Localização | Descrição                 |
#      | Spa        | Relax     | Bloco A     | Ambiente calmo e relaxante |
#    When é realizada uma requisição GET para a rota "/api/atracoes/Spa"
#    Then o sistema retorna o status "200 OK"
#    And o corpo da resposta contém:
#      | Nome       | Spa                         |
#      | Categoria  | Relax                       |
#      | Localização| Bloco A                     |
#      | Descrição  | Ambiente calmo e relaxante  |
#
#  @service
#  Scenario: Listar avaliações da atração "Spa"
#    Given existem as seguintes avaliações cadastradas para a atração "Spa":
#      | Nome do Avaliador | Nota | Comentário        | Data       |
#      | Ana               | 5    | Muito relaxante   | 2025-07-04 |
#      | Bruno             | 4    | Bom atendimento   | 2025-07-03 |
#    When é realizada uma requisição GET para a rota "/api/atracoes/Spa/avaliacoes"
#    Then o sistema retorna o status "200 OK"
#    And o corpo da resposta contém a lista de avaliações:
#      | Nome do Avaliador | Nota | Comentário        | Data       |
#      | Ana               | 5    | Muito relaxante   | 2025-07-04 |
#      | Bruno             | 4    | Bom atendimento   | 2025-07-03 |
#