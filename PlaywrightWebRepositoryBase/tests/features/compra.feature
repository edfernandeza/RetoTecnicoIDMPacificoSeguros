Feature: Compra de productos en Swag Labs

@CompraExitosa @Regression
Scenario Outline: Usuario Compra un producto exitosamente
    Given Usuario ingresa a la pagina de Swag Labs
    When Usuario ingresa con el usuario <user>
    Then Se valida casuistica de login del usuario <user>
    When Usuario agrega los productos [Sauce Labs Backpack, Sauce Labs Bike Light] al carrito de compras
    Then Valida productos en el carrito de compras
    When Usuario realiza checkout con los datos
        | Nombre        | Apellido      | CodigoPostal          |
        | <nombre>      | <apellido>    | <codigoPostal>        |
    Then Se valida que la compra se haya realizado exitosamente
    Examples:
        | user          |  nombre   | apellido  | codigoPostal  |
        | standard_user | Juan      | Perez     | 12345         |

