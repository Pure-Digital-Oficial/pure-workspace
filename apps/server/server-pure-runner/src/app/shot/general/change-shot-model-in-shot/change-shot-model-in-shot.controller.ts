import {
  Body,
  Controller,
  Param,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ChangeShotModelInShotService } from './change-shot-model-in-shot.service';
import {
  ChangeShotModelInShotDto,
  ErrorMessageResult,
  userIdQuerySchema,
  changeShotModelInShotBodySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes';
import { JwtAuthGuard } from '@pure-workspace/data-access';

@Controller('change-shot-model-in-shot')
export class ChangeShotModelInShotController {
  constructor(
    private readonly changeShotModelInShotService: ChangeShotModelInShotService
  ) {}

  @Put(':id')
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: changeShotModelInShotBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async change(
    @Param() param: { id: string },
    @Query() query: { userId: string },
    @Body() input: Omit<ChangeShotModelInShotDto, 'loggedUserId' | 'shotId'>
  ) {
    const result = await this.changeShotModelInShotService.change({
      ...input,
      shotId: param.id ?? '',
      loggedUserId: query.userId ?? '',
    });

    if (result.isRight()) return { shotId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
