import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import {
  ErrorMessageResult,
  CreateUserDto,
  createUserSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes';

@Controller('create-user')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe({ body: createUserSchema }))
  async create(@Body() input: CreateUserDto) {
    const result = await this.createUserService.create(input);
    if (result.isRight()) return { user_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
