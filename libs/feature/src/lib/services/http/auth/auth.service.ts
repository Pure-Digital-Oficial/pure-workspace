import { AuthDto } from "@pure-workspace/domain";
import { HttpClient, pureGeneralApi } from "../axios-config";

export const authService = {
    async login(authDto: AuthDto) {
        return HttpClient(pureGeneralApi, {
            method: 'POST',
            url: 'auth/login',
            data: {
                email: authDto.email,
                password: authDto.password
            },
            params: {
                appId: authDto.appId,
            }
        })
    }
}