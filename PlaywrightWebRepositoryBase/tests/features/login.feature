Feature: Login

@loginExitoso @Regression
Scenario Outline: login exitoso
    Given Usuario ingresa a la pagina de Swag Labs
    When Usuario ingresa con el usuario <user>
    Then Se valida casuistica de login del usuario <user>
    Examples:
    |user|
    |standard_user|

@failed @Regression
Scenario Outline: login no exitoso
    Given Usuario ingresa a la pagina de Swag Labs
    When Usuario ingresa con el usuario <user>
    Then Se valida casuistica de login del usuario <user>
    Examples:
    |user|
    |locked_out_user|
