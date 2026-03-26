import { fixture } from '../../src/hooks/fixture';

class LoginPage {

    get TXT_USERNAME() {
        return fixture.page.locator('#user-name');
    }

    get TXT_PASSWORD() { 
        return fixture.page.locator('#password');
    }       
	
	get BTN_LOGIN() {
		return fixture.page.locator('#login-button');
	}

    get MSG_ERROR_LOCKED_OUT_USER() {
        return fixture.page.locator('//div[contains(@class, "error-message-container")]/h3[text()="Epic sadface: Sorry, this user has been locked out."]');
    }

    get TITLE_PRODUCTS() {
        return fixture.page.locator('//span[text()="Products"]');
    }

    get BTN_CARRITO() {
        return fixture.page.locator('#shopping_cart_container');
    }

    get BTN_CHECKOUT() {
        return fixture.page.locator('#checkout');
    }

    get TXT_FIRST_NAME() {
        return fixture.page.locator('#first-name');
    }

    get TXT_LAST_NAME() {
        return fixture.page.locator('#last-name');
    }

    get TXT_ZIP_CODE() {
        return fixture.page.locator('#postal-code');
    }

    get BTN_CONTINUE() {
        return fixture.page.locator('#continue');
    }

    get BTN_FINISH() {
        return fixture.page.locator('#finish');
    }
    
    get MSN_FINISH() {
        return fixture.page.locator('//h2[text()="Thank you for your order!"]');
    }

    BTN_ADD_TO_CART_DINAMIC(productName: string) {
        return fixture.page.locator(
            `//div[contains(@class,'inventory_item')][.//div[text()='${productName}']]//button`
            );
    }

    TXT_PRODUCT_NAME_DINAMIC(productName: string) {
        return fixture.page.locator(
            `//div[contains(@class,'cart_item')]/a/div[text()='${productName}']`
        );
    }
}

export default new LoginPage();
