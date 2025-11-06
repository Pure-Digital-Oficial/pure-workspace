import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import {
  ErrorMessageResult,
  userIdQuerySchema,
  ListFixedGainsDto,
  listFixedGainsBodySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes';
import { ListFixedGainsService } from './list-fixed-gains.service';

@Controller('fixed-gain/list-fixed-gains')
export class ListFixedGainsController {
  constructor(private listFixedGainsService: ListFixedGainsService) {}

  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: listFixedGainsBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async list(
    @Query() query: { userId: string },
    @Body() input: Omit<ListFixedGainsDto, 'loggedUserId'>
  ) {
    const result = await this.listFixedGainsService.list({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return result.value;
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
