export interface AuthenticationUserState {
    isAuthenticated: boolean
    token: String
    refreshToken: String
    tokenExpires: number
    keepSign: boolean
    user?: any
}

export interface AuthLoginInputState {
    username: String
    password: String
    keepSign: boolean
}
