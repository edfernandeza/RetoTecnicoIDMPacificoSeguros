import { Page, Locator, BrowserContext, expect } from '@playwright/test';

export  default class PlaywrightWrapper {
    constructor(private page: Page) { }


    async goto(url: string, fixedDelay?: number): Promise<void> {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        });
        if (fixedDelay !== undefined) {
            await this.page.waitForTimeout(fixedDelay);
        }
    } 

    async waitForRedirect(url: string | RegExp | ((url: URL) => boolean), time: number = 30000): Promise<void> {
        await this.page.waitForURL(url,{timeout: time})
    }

    async waitForTimeout( fixedDelay: number): Promise<void> {
        await this.page.waitForTimeout(fixedDelay);
    }

    public getContext(): BrowserContext {
        return this.page.context();
    }

    // Método para maximizar la ventana
    async maximizeWindow(): Promise<void> {
        await this.page.setViewportSize({ width: 1920, height: 1080 });
        console.log("Ventana maximizada a 1920x1080.");
    }


}