Feature: ADMINISTRADOR

Scenario: administrador tenta criar um usuário para o cliente com um CPF já registrado
  Given o usuário "Bob" está logado no sistema com perfil "administrador"
  And o cliente "Charles" não possui cadastro no sistema
  And o CPF "120120120-14" está registrado no sistema
  And "Bob" está na tela "Gerenciamento de usuários"
  When "Bob" inicia o cadastro do novo usuário
  And "Bob" preenche os dados do cliente:  
    | Campo         | Valor           |  
    | Nome          | Charles         |  
    | CPF           | 120120120-14    |  
    | Quarto        | Quarto 232      |  
  And confirma o cadastro
  Then o sistema exibe a mensagem: "CPF:120120120-14 já está associado a outro usuário. Por favor verifique se os dados estão corretos."  
  And o cliente cujo CPF é "120120120-14" continua com seus dados inalterados no sistema
  And o usuário "Charles" não foi registrado no sistema. 

# Estou em um dilema sobre como remover um usuário é diferente de deletá-lo...
# Vou continuar partindo do pressuposto que remover seja remover de um Quarto
# e deletar seja apagar todos os dados do usuário do sistema (histórico de pagamento e dados pessoais)

Scenario: Remover associação de usuário a um quarto
  Given o usuário "Bob" está logado no sistema com perfil "administrador"
  And o cliente "Daniel" está cadastrado com CPF "232232232-23"
  And "Daniel" está associado ao quarto "233"
  When "Bob" acessa a função "Remover Usuário de Quarto"
  And seleciona o usuário "Daniel" (CPF "232232232-23")
  And confirma a remoção
  Then o sistema exibe a mensagem: "Usuário Daniel (CPF: 232232232-23) foi desassociado do quarto 233"
  And o quarto "233" aparece como disponível no sistema
  And "Daniel" permanece cadastrado no sistema sem quarto associado

# Começar editando CPF porque é o único campo que é único de cada pessoa
Scenario: administrador edita o CPF de um usuário
  Given o usuário "Bob" está logado no sistema com perfil "administrador"
  And o cliente "Eduardo" está cadastrado com:
    | Nome   | Eduardo      |
    | CPF    | 123456789-10 |
    | Quarto | 101          |
  And "Eduardo" aparece na lista de usuários com CPF "123456789-10"
  And o CPF "123456789-11" não está registrado no sistema
  When "Bob" atualiza o CPF de "Eduardo" para "123456789-11"
  Then o sistema exibe a mensagem: "Usuário Eduardo (CPF:123456789-11) foi atualizado com sucesso"
  And "Eduardo" aparece na lista de usuários com CPF "123456789-11"
  And todos os outros dados de "Eduardo" permanecem inalterados
  And o quarto "101" continua associado a "Eduardo"

  Scenario: administrador tenta mudar o CPF de um usuário para o CPF de outro usuário (falha)
  Given o usuário "Bob" está logado no sistema com perfil "administrador"
  And o cliente "Eduardo" está cadastrado com:
    | Nome   | Eduardo      |
    | CPF    | 123456789-10 |
    | Quarto | 101          |
  And "Eduardo" aparece na lista de usuários com CPF "123456789-10"
  And o CPF "123456789-11" está registrado no sistema como:
    | Nome   | Fabiano      |
    | CPF    | 123456789-11 |
    | Quarto | 102          |
  When "Bob" atualiza o CPF de "Eduardo" para "123456789-11"
  Then o sistema exibe a mensagem: "CPF:123456789-11"
  And "Eduardo" aparece na lista de usuários com CPF "123456789-11 já registrado como Fabiano! Por favor verifique se o novo CPF está correto."
  And todos os dados de "Eduardo" e "Fabiano" permanecem inalterados

Scenario: administrador deleta a conta de um usuário
  Given o usuário "Bob" está logado no sistema com perfil "administrador"
   And o usuário "Felipe" está cadastrado com:
    | Campo | Valor               |
    | Nome  | Felipe              |
    | CPF   | 000000000-00        |
    | Email | felipe@exemplo.com  |
  And "Felipe" aparece na lista de usuários ativos
  When "Bob" solicita a exclusão permanente da conta de "Felipe"
  And confirma a ação na caixa de diálogo "Tem certeza que deseja deletar permanentemente esta conta?"
  Then o sistema exibe a mensagem: "Conta de Felipe (CPF: 000000000-00) foi permanentemente removida"
  And "Felipe" não aparece mais na lista de usuários
  And nenhum registro contendo CPF "000000000-00" permanece no banco de dados
  And um registro de auditoria é criado com:
    | Ação         | Exclusão de usuário  |
    | Responsável  | Bob                  |
    | CPF afetado  | 000000000-00         |

# tratar o cenário de tentar criar um usuário com um CPF deletado anteriormente

Scenario: Administrador visualiza a tabela de usuários
  Given que o usuário "Bob" está autenticado no sistema com o perfil de "administrador"
  And está na tela "Gerenciamento de usuários"
  When Bob clica na opção "Tabela de usuários"
  Then o sistema deve exibir uma tabela com os dados dos usuários
  And a tabela deve conter, para cada usuário, as colunas:
    | Nome  |
    | CPF   |
    | Email |
  And cada linha da tabela deve exibir as informações correspondentes de cada usuário


=======
Scenario: administrador remove um usuário
  Given o usuário "Bob" está logado no sistema com perfil "administrador"
  And o cliente "Daniel" possui cadastro no sistema com o CPF "232232232-23"
  And "Bob" está na tela "Gerenciamento de usuários"
  When "Bob" acessa a tela "Remover usuário"
  And seleciona o CPF "232232232-23"

Scenario: administrador edita um usuário

Scenario: administrador deleta a conta de um usuário

Scenario (GUI): Edição de reserva bem sucedida
    Given estou na página “Lista De Reservas” logado como “admin”
    And a reserva de código "12345" do hóspede "01828392300" tem check-out em "15/07/2025" 
    When altero a data de check-out da reserva "12345" para "17/07/2025"  
    And salvo alterações  
    Then vejo a mensagem "Reserva atualizada com sucesso"
    And a reserva "12345" mostra check-out em "17/07/2025"

Scenario (GUI): Exclusão de reserva bem-sucedida  
    Given estou na página "Lista De Reservas" logado como "admin"  
    And existe uma reserva de código "12345" do hóspede "01828392300" 
    When excluo a reserva de código "12345"  
    And confirmo a exclusão na janela de confirmação  
    And salvo alterações 
    Then vejo a mensagem "Reserva excluída com sucesso"
    And a reserva de código "12345" não aparece mais na lista   

Scenario (GUI): Edição de reserva mal sucedida
  Given estou logado como "admin" na página "Lista de Reservas"
  And a reserva de código "12345" do hóspede "01828392300" tem check-out em "15/07/2025"
  And há outra reserva conflitante entre "15/07/2025" e "17/07/2025"
  When tento alterar o check-out da reserva "12345" para "17/07/2025" 
  Then vejo a mensagem "Conflito de data detectado"
  And a reserva "12345" mantém check-out em "15/07/2025"

Scenario (GUI): Visualização de estatísticas gerais de reservas  
    Given estou na página "Lista de Reservas" logado como "admin"
    When clico na opção "Ver Estatísticas Gerais"
    Then um pop-up é exibido contendo a taxa de ocupação, número total de reservas, número de usuários e número de check-ins

Scenario (Service): Obter taxa de ocupação em um intervalo de datas
    Given o sistema tem reservas entre 01/07/2025 e 31/07/2025
    And o total de dias disponíveis no mês de julho é "31"
    And o total de dias ocupados por reservas ativas ou finalizadas é "23"
    When consulto a taxa de ocupação para o período de "01/07/2025" a "31/07/2025"
    Then o sistema retorna "73%" como taxa de ocupação

Scenario (Service): Identificar conflitos de reserva para um mesmo quarto
  Given o sistema possui uma reserva no quarto “305” com check-in em “10/08/2025” e check-out em “15/08/2025”
  When tento cadastrar uma nova reserva para o quarto "305" de "12/08/2025" a "17/08/2025"
  Then o sistema retorna "Conflito detectado entre reservas de 10/08/2025 a 15/08/2025 e 12/08/2025 a 17/08/2025"  
  And impede o cadastro da nova reserva
