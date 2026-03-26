export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: "Chrome" | "Firefox" | "Webkit" | "Edge";
            ENV: "dev" | "qa" | "prod";
            BASEURL: string;
            RECORD_VIDEO: 'true' | 'false';
            RECORD_HAR: 'true' | 'false';
            RECORD_LOGS: 'true' | 'false';
            HEADLESS: 'true' | 'false';
            JIRABASEURL:string;
            QMETRYBASEURL:string;
            B2C_DOMAIN: string;
            SEGURO_VIDA_URL: string;
            PLATAFORMA: string;
            JIRAPROJECTID: string;
            TESTCASEFORLDERID: string;
            COMPONENTS: string;
            QUARTER: string;
            SPRINT: string;
            SQUAD: string;
            JIRAUSERID: string;
            USERSTORY: string;
            TESTCYCLEFOLDERID: string;
            ENVIRONMENT: string;
            JIRAUSEREMAIL: string;
            JIRAAPITOKEN: string;
        }
    }
}