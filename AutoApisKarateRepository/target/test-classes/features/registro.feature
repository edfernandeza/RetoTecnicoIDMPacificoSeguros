@registroUsuario
Feature: Registro
  Background:
    * def endpoint = "https://serverest.dev/usuarios"
    * def registroSchema = call read('classpath:Schemas/registro.js')

  @esc1
  Scenario Outline: CreaUsuario
    Given url endpoint
    When  request { "nome": <nome>, "email": <email>,"password": <a>,"administrador": "<adm>"}
    And method POST
    Then status 201
    And match response == registroSchema

  Examples:
    |nome|email|pass|adm|
    |Fulano da Silva|ssssno@qa.com.br|teste|true|

