import { Get, JsonController, QueryParams } from "routing-controllers";
import { TestRequestQueryParams } from "circledata-common/lib/api/request";
import { TestResponse } from "circledata-common/lib/api/response";
import { ResponseSchema } from "routing-controllers-openapi";

@JsonController("/test")
export class TestController {
    @Get("/test")
    @ResponseSchema(TestResponse)
    test(@QueryParams() testObj: TestRequestQueryParams): TestResponse {
        return {
            someTesting: `Hello ${testObj.name}!! 42!`,
            isWow: true
        };
    }
}
