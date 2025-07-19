import {
  Body,
  Controller,
  Param,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { EditShotService } from './edit-shot.service';
import {
  shotBodySchema,
  ErrorMessageResult,
  idInParamSchema,
  userIdQuerySchema,
  EditShotDto,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes';
import { JwtAuthGuard } from '@pure-workspace/data-access';

@Controller('edit-shot')
export class EditShotController {
  constructor(private readonly editShotService: EditShotService) {}

  @Put(':id')
  @UsePipes(
    new ZodValidationPipe({
      param: idInParamSchema,
      query: userIdQuerySchema,
      body: shotBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async edit(
    @Param() param: { id: string },
    @Query() query: { userId: string },
    @Body() input: Omit<EditShotDto, 'id' | 'loggedUserId'>
  ) {
    const result = await this.editShotService.edit({
      ...input,
      id: param?.id ?? '',
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { shotId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
