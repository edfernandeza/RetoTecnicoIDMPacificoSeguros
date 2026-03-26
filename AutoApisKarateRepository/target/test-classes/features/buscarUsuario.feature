@obtenerUsuario
Feature: Obtener usuario por ID

  Background:
    * def endpoint = "https://serverest.dev/usuarios"
    * def buscarUsSchema = call read('classpath:Schemas/buscarUsuario.js')

  @esc1
  Scenario Outline: ObtenerUsuarioPorId
    Given url endpoint + "/" + <id>
    When method GET
    Then status 200
    And match response == buscarUsSchema

    Examples:
      | id                      |
      | "0uxuPY0cbmQhpEz1"      |