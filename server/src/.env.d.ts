declare namespace NodeJS {
  export interface ProcessEnv {
    DB_NAME: string,
    DB_USER: string,
    DB_PASSWORD: string,
    USER_EMAIL: string,
    USER_PASSWORD: string,
    USER_NAME: string,
    SECRET: string,
  }
}