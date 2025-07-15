import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  RegisterHistoryShotsDto,
  ErrorMessageResult,
  historyShotsBodySchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { RegisterHistoryShotsService } from './register-history-shots.service';

@Controller('register-history-shots')
export class RegisterHistoryShotsController {
  constructor(
    private registerHistoryShotsService: RegisterHistoryShotsService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: historyShotsBodySchema,
    })
  )
  async register(
    @Query() query: { userId: string },
    @Body()
    input: Omit<RegisterHistoryShotsDto, 'loggedUserId'>
  ) {
    const result = await this.registerHistoryShotsService.register({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { historyShotsIds: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
