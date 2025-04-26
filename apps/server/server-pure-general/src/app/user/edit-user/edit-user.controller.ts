import { Body, Controller, Put, UseGuards, UsePipes } from '@nestjs/common';
import { EditUserService } from './edit-user.service';
import {
  UserBodyDto,
  editUserBodySchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { JwtAdminGuard } from '@pure-workspace/data-access';

@Controller('edit-user')
export class EditUserController {
  constructor(private readonly editUserService: EditUserService) {}

  @Put()
  @UsePipes(new ZodValidationPipe({ body: editUserBodySchema }))
  @UseGuards(JwtAdminGuard)
  async edit(@Body() input: Omit<UserBodyDto, 'type' | 'nickname'>) {
    const result = await this.editUserService.edit({
      body: input,
    });

    if (result.isRight()) return { userId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
