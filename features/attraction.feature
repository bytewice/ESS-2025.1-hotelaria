Feature: atrações

  As a hóspede,
  I want to visualizar a lista de atrações disponíveis e classificar as que já visitei,
  So that eu possa organizar minhas experiências e descobrir novas atrações para aproveitar
#
  @service
  Scenario:Avaliação válida de atração
    Given a atração "Spa" existe no sistema
    When é enviada uma avaliação com os seguintes dados:
      | nome       | nota | comentario      | data         |  
      | Ana        | 5    | Muito Relaxante | <data_atual> |  
    Then o sistema retorna status "201 Created"
    And a avaliação é registrada
#
#  /*@service
Scenario:Falha ao enviar avaliação sem nota
    Given a atração "Spa" existe no sistema
    When é enviada uma avaliação com os seguintes dados:
      | nome | comentario       |
      | Ana  | Muito Relaxante  |
    Then o sistema retorna status "400 Bad Request"
#  @service
  Scenario:Listar todas atrações
    Given que so existem as atrações "Spa" "Piscina" "Academia" no sistema:
    When é questionado as atrações existentes
    Then o sistema retorna as atrações "Spa" "Piscina" "Academia"
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