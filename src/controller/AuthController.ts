import { Get, JsonController } from "routing-controllers";

@JsonController("/auth")
export class AuthController {
    @Get("/check")
    check() {
        return {
            valid: true
        };
    }
}
