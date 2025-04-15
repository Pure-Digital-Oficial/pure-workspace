import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CreateSystemUserService } from "./create-system-user.service";
import { CreateSystemUserDto, createSystemUserSchema, ErrorMessageResult } from "@pure-workspace/domain";
import { ZodValidationPipe } from "../../pipes";
import { JwtAuthGuard } from "@pure-workspace/data-access";

@Controller()
export class CreateSystemUserController {
  constructor(private createSystemUserService: CreateSystemUserService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe({ body: createSystemUserSchema }))
  async create(@Body() input: CreateSystemUserDto){
    const result = await this.createSystemUserService.create(input);
    if(result.isRight()) return { user_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
