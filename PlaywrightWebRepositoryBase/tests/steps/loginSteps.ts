import { Given, Then, When,  setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import LoginScreen from '../controller/loginScreen';


Given('Usuario ingresa a la pagina de Swag Labs', async  function () {
    expect(await LoginScreen.navigateURL()).toBeTruthy();
});



When(/^Usuario ingresa con el usuario (.+)$/, async function (user: string) {
    expect(await LoginScreen.setCredentials(user)).toBeTruthy();
});

Then(/^Se valida casuistica de login del usuario (.+)$/, async function (user: string) {
   expect(await LoginScreen.validCasuiticaLoginUser(user)).toBeTruthy();
}); 

When(/^Usuario agrega los productos \[(.+)\] al carrito de compras$/, async function(productList: string) {
    const products = productList.split(',').map(product => product.trim());
    expect(await LoginScreen.addProductsToCart(products)).toBeTruthy();
});

Then('Valida productos en el carrito de compras', async  function () {
    expect(await LoginScreen.validProductsInCart()).toBeTruthy();
});

When('Usuario realiza checkout con los datos', async function (dataTable) {
    
    const datos = dataTable.hashes(); 
    const { Nombre, Apellido, CodigoPostal } = datos[0];
    await LoginScreen.checkout(Nombre, Apellido, CodigoPostal);
});


Then('Se valida que la compra se haya realizado exitosamente', async  function () {
    expect(await LoginScreen.validShop()).toBeTruthy();
});