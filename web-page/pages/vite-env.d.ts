/// <reference types="vite/client" />

declare const process: {
    env: {
        [key: string]: string | undefined;
        API_KEY?: string;
        GEMINI_API_KEY?: string;
    }
};
