interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly MODE: string
    readonly VITE_BACKEND_URL_DEV: string;
    readonly VITE_BACKEND_URL_PROD: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}



