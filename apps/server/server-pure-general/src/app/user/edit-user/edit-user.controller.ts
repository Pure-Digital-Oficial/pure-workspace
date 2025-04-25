import { Body, Controller, Put, UsePipes } from '@nestjs/common';
import { EditUserService } from './edit-user.service';
import {
  UserBodyDto,
  editUserBodySchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('edit-user')
export class EditUserController {
  constructor(private readonly editUserService: EditUserService) {}

  @Put()
  @UsePipes(new ZodValidationPipe({ body: editUserBodySchema }))
  async edit(@Body() input: Omit<UserBodyDto, 'type' | 'nickname'>) {
    const result = await this.editUserService.edit({
      body: input,
    });

    if (result.isRight()) return { userId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
