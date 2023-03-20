declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: string;
      LOG_LEVEL: string;
      JWT_SECRET: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      POSTGRES_DB: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
    }
  }
}

export {}
