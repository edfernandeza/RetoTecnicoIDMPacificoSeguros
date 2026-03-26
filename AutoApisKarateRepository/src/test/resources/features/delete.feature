@eliminarUsuario
Feature: Eliminar usuario


  Background:
    * def endpoint = "https://serverest.dev/usuarios"
    * def eliminarSchema = call read('classpath:Schemas/eliminar.js')

  @esc1
  Scenario Outline: ObtenerUsuarioPorId
    Given url endpoint + "/" + <id>
    When method DELETE
    Then status 200
    And match response == eliminarSchema

    Examples:
      | id                      |
      | "ip5OMZlAPEsPliPC"      |