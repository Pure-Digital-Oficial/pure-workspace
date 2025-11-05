import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  CreateFixedGainDto,
  ErrorMessageResult,
  fixedGainBodySchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { ZodValidationPipe } from '../../pipes';
import { CreateFixedGainService } from './create-fixed-gain.service';

@Controller('fixed-gain/create-fixed-gain')
export class CreateFixedGainController {
  constructor(private createFixedGainService: CreateFixedGainService) {}

  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: fixedGainBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async create(
    @Query() query: { userId: string },
    @Body() input: Omit<CreateFixedGainDto, 'loggedUserId'>
  ) {
    const result = await this.createFixedGainService.create({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { fixed_gain_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
