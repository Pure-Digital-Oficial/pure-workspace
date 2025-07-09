import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  RegisterHistoryShotDto,
  ErrorMessageResult,
  historyShotBodySchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { RegisterHistoryShotService } from './register-history-shot.service';

@Controller('register-history-shot')
export class RegisterHistoryShotController {
  constructor(private registerHistoryShotService: RegisterHistoryShotService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: historyShotBodySchema,
    })
  )
  async create(
    @Query() query: { userId: string },
    @Body()
    input: Omit<RegisterHistoryShotDto, 'loggedUserId'>
  ) {
    const result = await this.registerHistoryShotService.register({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { historyShotId: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
