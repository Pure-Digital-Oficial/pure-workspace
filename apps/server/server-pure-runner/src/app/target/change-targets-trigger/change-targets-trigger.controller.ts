import {
  Body,
  Controller,
  Put,
  Query,
  //   UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ChangeTargetsTriggerService } from './change-targets-trigger.service';
import {
  ChangeTargetsTriggerDto,
  triggerBodySchema,
  ErrorMessageResult,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes';
// import { JwtAuthGuard } from '@pure-workspace/data-access';

@Controller('change-targets-trigger')
export class ChangeTargetsTriggerController {
  constructor(
    private readonly changeTargetTriggerService: ChangeTargetsTriggerService
  ) {}

  @Put()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: triggerBodySchema,
    })
  )
  //   @UseGuards(JwtAuthGuard)
  async edit(
    @Query() query: { userId: string },
    @Body() input: Omit<ChangeTargetsTriggerDto, 'loggedUserId'>
  ) {
    const result = await this.changeTargetTriggerService.change({
      ...input,
      loggedUserId: query.userId ?? '',
    });

    if (result.isRight()) return { targetsIds: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
