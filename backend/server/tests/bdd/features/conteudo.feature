Funcionalidade: conteudo

Scenario: Buscar quarto barato com filtro de preço abaixo de 200
  Given que estou na página "conteudo"
  And existem os seguintes quartos cadastrados no sistema:
    | tipo               | número | curtidas | preço |
    | Suíte Casal        | 101    | 150      | 300   |
    | Quarto 1 pessoa    | 201    | 250      | 200   |
    | Quarto 4 pessoas   | 301    | 50       | 180   |
  When eu busco quartos disponíveis entre "01/01/2023" e "05/01/2023"
  And filtro por "valor abaixo de" "200"
  Then eu devo ver os quartos:
    | tipo             | número | curtidas | preço |
    | Quarto 4 pessoas | 301    | 50       | 180   |

Scenario: Buscar quartos com filtro de preço acima de 250
  Given que estou na página "conteudo"
  And existem os seguintes quartos cadastrados no sistema:
    | tipo               | número | curtidas | preço |
    | Suíte Casal        | 101    | 150      | 300   |
    | Quarto 1 pessoa    | 201    | 250      | 200   |
    | Quarto 4 pessoas   | 301    | 50       | 180   |
  When eu busco quartos disponíveis entre "10/02/2023" e "15/02/2023"
  And filtro por "valor acima de" "250"
  Then eu devo ver os quartos:
    | tipo          | número | curtidas | preço |
    | Suíte Casal   | 101    | 150      | 300   |

# ALTERAÇÃO: Cenário ajustado para testar o caso onde reservas existentes bloqueiam a disponibilidade.
Scenario: Nenhum quarto disponível no período
  Given que estou na página "conteudo"
  And existem os seguintes quartos cadastrados no sistema:
    | tipo               | número | curtidas | preço |
    | Suíte Casal        | 101    | 150      | 300   |
  And o quarto "101" tem uma reserva de "01/03/2023" a "10/03/2023"
  When eu busco quartos disponíveis entre "05/03/2023" e "12/03/2023"
  Then eu devo ver a mensagem "Nenhum quarto disponível para os filtros selecionados"

# ALTERAÇÃO: Cenário ajustado para usar o número do quarto.
Scenario: Curtir um quarto
  Given que estou na página "conteudo"
  And existe o quarto "Suíte Casal" de número "101" com "150" curtidas
  When eu busco quartos e vejo o quarto "101"
  And eu curto o quarto "101"
  Then eu devo ver "151" curtidas no quarto "101"

# ALTERAÇÃO: Cenário ajustado.
Scenario: Salvar um quarto
  Given que estou na página "conteudo"
  And estou logado como "Bruno"
  And existem os seguintes quartos disponíveis entre "01/05/2023" e "05/05/2023":
    | tipo               | número | curtidas | preço |
    | Suíte Casal        | 101    | 150      | 300   |
    | Quarto 1 pessoa    | 201    | 250      | 200   |
  When eu busco quartos disponíveis entre "01/05/2023" e "05/05/2023"
  And eu salvo o quarto "101"
  And vou para a minha lista de quartos salvos
  Then eu devo ver o quarto:
    | tipo          | número | curtidas | preço |
    | Suíte Casal   | 101    | 150      | 300   |

Scenario: Salvar quartos sem estar logado
  Given que estou na página "conteudo"
  And existem os seguintes quartos disponíveis entre "01/06/2023" e "05/06/2023":
    | tipo               | número | curtidas | preço |
    | Suíte Casal        | 101    | 150      | 300   |
  When eu busco quartos disponíveis entre "01/06/2023" e "05/06/2023"
  And eu tento salvar o quarto "101"
  Then eu devo ver um erro "você deve estar logado para salvar quartos"

# ALTERAÇÃO: Cenário ajustado.
Scenario: Fazer uma avaliação não anônima
  Given que estou na página "conteudo"
  And estou logado como "Bruno"
  And eu fiz uma reserva no quarto "101" para "01/07/2023" - "05/07/2023"
  When eu escrevo uma avaliação para o quarto "101" com o texto "Ótimo quarto, cama confortável e serviço de qualidade."
  Then eu vejo a avaliação "Ótimo quarto, cama confortável e serviço de qualidade.", feita por "Bruno" no quarto "101"

# ALTERAÇÃO: Cenário ajustado.
Scenario: Fazer uma avaliação anônima
  Given que estou na página "conteudo"
  And estou logado como "Bruno"
  And eu fiz uma reserva no quarto "101" para "01/08/2023" - "05/08/2023"
  When eu escrevo uma avaliação anônima para o quarto "101" com o texto "Cama desconfortável, banheiro pequeno."
  Then eu vejo a avaliação "Cama desconfortável, banheiro pequeno.", feita por "Anônimo" no quarto "101"

Scenario: Fazer avaliação sem ter feito reserva
  Given que estou na página "conteudo"
  And estou logado como "Bruno"
  And o quarto "101" existe
  When eu tento escrever uma avaliação para o quarto "101" com o texto "Ótimo quarto, cama confortável e serviço de qualidade."
  Then eu devo ver um erro "você deve ter feito uma reserva neste quarto para escrever avaliações"

# NOVO E ATUALIZADO: Cenário de compartilhamento de reserva.
Scenario: Compartilhar reservas
  Given que estou na página "conteudo"
  And estou logado como "Bruno"
  And o usuário "Alvaro" com email "alvaro@email.com" existe no sistema
  And "Bruno" fez uma reserva de id "reserva123" no quarto "101" para "01/10/2023" - "05/10/2023"
  When eu compartilho a reserva "reserva123" com o usuário de email "alvaro@email.com"
  Then o usuário "Alvaro" deve poder fazer uma avaliação no quarto "101"