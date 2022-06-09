export type signInType = {
    email: string,
    password: string
};
export type signInResponse = {
    accessToken: string,
    user: {
        email: string
    }
}