Feature: atrações

As a hóspede,
I want to visualizar a lista de atrações disponíveis e classificar as que já visitei,
So that eu possa organizar minhas experiências e descobrir novas atrações para aproveitar
	
Scenariorio:Entrando em uma página de uma atração

Given que a hóspede "Ana" está na página de "Atrações"
When a hóspede "Ana" seleciona “Spa”
Then a hóspede "Ana" e movida para  página "Spa"
And na página “Spa” visualiza informações  “Aguas termais,andar 20”
And visualiza imagens “Spa.png” e avaliações “5 estrelas,muito relaxante”
And Tem a opção de “Avaliar”
