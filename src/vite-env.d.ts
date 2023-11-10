/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare namespace JSX {
    interface IntrinsicElements {
        "tgs-player": any;
    }
}
