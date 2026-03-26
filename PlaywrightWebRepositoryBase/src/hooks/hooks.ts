import { Before, BeforeAll, After, AfterAll, Status, BeforeStep, AfterStep } from "@cucumber/cucumber"
import { fixture } from "./fixture";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { launchBrowser } from "../util/browserManager";
import { getEnv } from "../config/env";
import { createLogger } from "winston";
import { options } from "../config/logger";
import { Pickle } from "@cucumber/messages";


const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;
let resultPath= "./test-results";
let videoPath: string;

BeforeAll(async function () {
    getEnv(process.env.npm_config_env || "qa");
    const browserType =  process.env.npm_config_tbrowser  || process.env.BROWSER || "chrome";
    let headlessOption: boolean = process.env.HEADLESS === 'true';
    console.log("=====================================");
    console.log("Environment: ", process.env.ENV);
    console.log("Headless: ", headlessOption);
    console.log("Browser: ", browserType);
    console.log("=====================================") ;
    browser = await launchBrowser(browserType, headlessOption);
});

Before({tags:"not @auth"},async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id;
    context = await browser.newContext(await configureContextOptions(scenarioName, false));
    await startTracing(scenarioName, pickle);
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));


});

Before({ tags: "@auth"}, async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id;
    context = await browser.newContext(await configureContextOptions(scenarioName, true));
    await startTracing(scenarioName, pickle);
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});

AfterStep({tags:"not @auth"},async function ({ pickle, result }) {
    if (result?.status == Status.FAILED) {
        await takeScreenshotAndAttach(fixture.page, pickle, this.attach);
        await handleTraceAndVideo(fixture.page, pickle, this.attach);
    }
    
});

AfterStep({ tags: "@auth"}, async function ({ pickle, result }) {
    if (result?.status == Status.FAILED) {
        await takeScreenshotAndAttach(fixture.page, pickle, this.attach);
        await handleTraceAndVideo(fixture.page, pickle, this.attach);
    }
});

After(async function ({result }) {
    await fixture.page.close();
    await context.close();
    
    if (process.env.RECORD_VIDEO === 'true' && result?.status == Status.FAILED){
        await this.attach(fs.readFileSync(videoPath),'video/webm');
    }  
})

AfterAll(async function() {
    await browser.close();
});

async function startTracing(scenarioName: string, pickle:Pickle) {
    if (process.env.RECORD_LOGS === 'true') {
        await context.tracing.start({
            name: scenarioName,
            title: pickle.name,
            sources: true,
            screenshots: true,
            snapshots: true
        });
    }
}

function configureContextOptions(scenarioName: string, isAuth:boolean): any {
    let contextOptions: any = {};

    if (isAuth) {
        contextOptions.storageState= "resources/auth/auth.json";
    }

    if (process.env.RECORD_HAR === 'true') {
        contextOptions.recordHar = { path: `${resultPath}/har/${scenarioName}.har` };
    }

    if (process.env.RECORD_VIDEO === 'true') {
        contextOptions.recordVideo = { dir: `${resultPath}/videos/${scenarioName}` };
    }

    return contextOptions;
}

async function takeScreenshotAndAttach(page: Page, pickle: Pickle, attach: any) {
    const screenshotPath = `${resultPath}/screenshots/${pickle.name}_${Date.now()}.png`;
    const img = await page.screenshot({ path: screenshotPath, type: 'png' });
    await attach(img, 'image/png');
}

async function handleTraceAndVideo(page: Page, pickle:Pickle, attach:any) {
    const tracePath = `${resultPath}/trace/${pickle.id}.zip`;

    if (process.env.RECORD_LOGS === 'true') {
        await context.tracing.stop({ path: tracePath });
        await attach(`Trace file: ${tracePath}`, 'text/html');
    }

    if (process.env.RECORD_VIDEO === 'true') {
        videoPath = await page.video().path();
    }
}