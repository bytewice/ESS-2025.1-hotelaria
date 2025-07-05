Feature: atrações

As a hóspede,
I want to visualizar a lista de atrações disponíveis e classificar as que já visitei,
So that eu possa organizar minhas experiências e descobrir novas atrações para aproveitar
	
Scenariorio:Entrando em uma página de uma atração

Given que o usuario de cpf "08622635480" esta na pagina de "Atrações"
When o usuario seleciona “Spa”
Then o usuario e movido para página "Spa"

Scenario:Entrando na página de avaliação

Given que o usuario de cpf "08622635480" esta na pagina de “Spa”
When o usuario seleciona "Avaliar"
Then o usuario e movido para página "Avaliar Spa"

Scenario:Preenchendo a página de avaliação com campos validos

Given que o usuario de cpf "08622635480" esta na pagina de “Avaliar Spa”
And visualiza os campos a serem preenchidos “Nome”,“Nota”,”Comentario” e o campo ”Data” com o dia atual 
When prenche o campo “nota” com “5”
And prenche o campo “comentário” com  “Muito Relaxante”
And prenche o campo “nome” com  “Ana”
And o usuario seleciona “Confirmar”
Then o usuario e movido para página "Avaliar Spa"  
And visualiza sua avaliação

Scenario:Preenchendo a página de avaliação sem prencher nome

Given que o usuario de cpf "08622635480" esta na pagina de “Avaliar Spa”
And visualiza os campos a serem preenchidos “Nome”,“Nota”,”Comentario” e o campo ”Data” com o dia atual 
When prenche o campo “nota” com “5”
And prenche o campo “comentário” com  “Muito Relaxante”
And o usuario seleciona “Confirmar”
Then o usuario recebe uma mensagem de erro “Campos invalidos”

Scenario:Preenchendo a página de avaliação sem prencher nota

Given que o usuario de cpf "08622635480" esta na pagina de “Avaliar Spa”
And visualiza os campos a serem preenchidos “Nome”,“Nota”,”Comentario” e o campo ”Data” com o dia atual 
When prenche o campo “nome” com “Ana”
And prenche o campo “comentário” com  “Muito Relaxante”
And o usuario seleciona “Confirmar”
Then o usuario recebe uma mensagem de erro “Campos invalidos”
