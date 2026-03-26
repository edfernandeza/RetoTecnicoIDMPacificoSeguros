import { LaunchOptions, chromium, firefox, webkit,devices } from "@playwright/test";


const BROWSERS = {
    CHROME: "Chrome",
    FIREFOX: "Firefox",
    WEBKIT: "Webkit",
    EDGE: "Edge",
    GOOGLE_CHROME: "google chrome",
};


function getLaunchOptions(browserType: string, headlessOption: boolean): LaunchOptions {
    const baseOptions: LaunchOptions = { headless: headlessOption };
    switch (browserType) {
        case BROWSERS.EDGE:
            return {
                ...baseOptions,
                ...devices['Desktop Edge'],
                channel: 'msedge',
            };
        case BROWSERS.GOOGLE_CHROME:
            return {
                ...baseOptions,
                ...devices['Desktop Chrome'],
                channel: 'chrome',
            };
        default:
            return baseOptions;
    }
}

export function launchBrowser(browserType: string, headlessOption: boolean) {
    const options = getLaunchOptions(browserType, headlessOption);
    switch (browserType) {
        case BROWSERS.CHROME:
        case BROWSERS.EDGE:
        case BROWSERS.GOOGLE_CHROME:
            return chromium.launch(options);
        case BROWSERS.FIREFOX:
            return firefox.launch(options);
        case BROWSERS.WEBKIT:
            return webkit.launch(options);
        default:
            throw new Error("Browser not supported");
    }
}