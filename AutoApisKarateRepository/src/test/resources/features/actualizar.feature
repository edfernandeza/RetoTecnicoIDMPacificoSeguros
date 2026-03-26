@actualizarUsuario
Feature: Actualizar usuario


  Background:
    * def endpoint = "https://serverest.dev/usuarios"
    * def actualizarSchema = call read('classpath:Schemas/actualizar.js')

  @esc1
  Scenario Outline: ObtenerUsuarioPorId
    Given url endpoint + "/" + <id>
    And request
      """
      {
        "nome": "Fulano da Silva",
        "email": "ttttt@qa.com.br",
        "password": "teste",
        "administrador": "true"
      }
      """
    When method PUT
    Then status 200
    And match response == buscarUsSchema

    Examples:
      | id                      |
      | "0uxuPY0cbmQhpEz1"      |