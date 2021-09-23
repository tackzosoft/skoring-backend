export interface APIInterface {
    version: string,
    name: string,
    host: string,
    port: string,
    base?: string
    check: {
        isEmailEnabled: boolean,
        isOTPBypassEnabled: boolean
    }
}


export interface CommonInterface {
    secret: string,
    privateKey: string,
    publicKey: string,
    jwtValidity: string,
    jwtIssuer: string
}


export interface DatabaseInterface {
    host: string,
    port: string,
    user: string,
    password: string,
    name: string,
}

export interface AuthInterface {
    type: string,
    user: string,
    pass: string,
}
