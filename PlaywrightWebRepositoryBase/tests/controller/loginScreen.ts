import { fixture } from '../../src/hooks/fixture';
import LoginPage from '../pages/loginPage';
import userData from '../data/userData.json';

class LoginScreen {

    private productsToAdd: string[] = [];

    async navigateURL(): Promise<boolean> {
        try {
            await fixture.page.goto('https://www.saucedemo.com/', {
                waitUntil: 'domcontentloaded'
            });

            const isVisible = await LoginPage.BTN_LOGIN.isVisible();

            return isVisible;
        } catch (error) {
            return false;
        }
    }

    async setCredentials(user: string): Promise<boolean> {
        try {
            const userInfo = userData.users.find((u: { username: string }) => u.username === user);
            if (!userInfo) {
                return false;
            }
            const password = userInfo.password;

            await LoginPage.TXT_USERNAME.fill(user);
            await LoginPage.TXT_PASSWORD.fill(password);
            await LoginPage.BTN_LOGIN.click();

            return true;
        } catch (error) {
            return false;
        }
    }

    async validCasuiticaLoginUser(user: string): Promise<boolean> {
        try {
            const userInfo = userData.users.find((u: { username: string }) => u.username === user);
            if (!userInfo) {
                return false;
            }   
            if (userInfo.type === 'standard_user') {
                const valid = await LoginPage.TITLE_PRODUCTS.isVisible();
                return valid;
            }   else if (userInfo.type === 'locked_out_user') {
                const valid = await LoginPage.MSG_ERROR_LOCKED_OUT_USER.isVisible();
                return valid;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    async addProductsToCart(productList: string[]): Promise<boolean> {

    this.productsToAdd = productList;
    console.log('Productos a agregar (this.productsToAdd):', this.productsToAdd);
    // Espera fija de 3 segundos
    await fixture.page.waitForTimeout(3000);

        try {
            for (const product of this.productsToAdd) {
                const addButton = LoginPage.BTN_ADD_TO_CART_DINAMIC(product);
                const visible = await addButton.isVisible();
                console.log(`Botón 'Add to cart' para '${product}' visible:`, visible);
                if (!visible) {
                    // Si no es visible, imprime el XPath usado
                    console.log(`no salio`);
                }
                await addButton.click();
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    async validProductsInCart(): Promise<boolean> {
        try {
            await LoginPage.BTN_CARRITO.click();
            for (const product of this.productsToAdd) {
                
                const isVisible = await LoginPage.TXT_PRODUCT_NAME_DINAMIC(product);
                if (!isVisible) {
                    return false;
                }
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    async checkout(firstName: string, lastName: string, zipCode: string): Promise<boolean> {
        try {

            await LoginPage.BTN_CHECKOUT.click();
            await LoginPage.TXT_FIRST_NAME.fill(firstName);
            await LoginPage.TXT_LAST_NAME.fill(lastName);
            await LoginPage.TXT_ZIP_CODE.fill(zipCode);
            await LoginPage.BTN_CONTINUE.click();

            return true;
        } catch (error) {
            return false;
        }
    }

    async validShop(): Promise<boolean> {
        try {
            await LoginPage.BTN_FINISH.click();
            const isVisible = await LoginPage.MSN_FINISH.isVisible();
            return isVisible;
        } catch (error) {
            return false;
        }
    }

}

export default new LoginScreen();