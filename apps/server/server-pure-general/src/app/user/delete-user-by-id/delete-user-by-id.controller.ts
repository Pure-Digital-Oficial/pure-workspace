import {
  Body,
  Controller,
  Delete,
  Param,
  Query,
  UsePipes,
} from '@nestjs/common';
import { DeleteUserByIdService } from './delete-user-by-id.service';
import {
  userIdQuerySchema,
  ErrorMessageResult,
  deleteUserByIdBodySchema,
  idInParamSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('delete-user-by-id')
export class DeleteUserByIdController {
  constructor(private readonly deleteUserByIdService: DeleteUserByIdService) {}

  @UsePipes(
    new ZodValidationPipe({
      param: idInParamSchema,
      query: userIdQuerySchema,
      body: deleteUserByIdBodySchema,
    })
  )
  @Delete(':id')
  async delete(
    @Body() input: { description: string },
    @Param() param: { id: string },
    @Query() query: { userId: string }
  ) {
    const result = await this.deleteUserByIdService.delete({
      id: param?.id ?? '',
      loggedUserId: query?.userId ?? '',
      description: input?.description ?? '',
    });

    if (result.isRight()) return { userId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
