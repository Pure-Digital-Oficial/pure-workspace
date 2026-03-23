import {
  Body,
  Controller,
  Get,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import {
  ErrorMessageResult,
  userIdQuerySchema,
  listPlansBodySchema,
  ListPlansDto,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes';
import { ListPlansService } from './list-plans.service';

@Controller('plan/list-plans')
export class ListPlansController {
  constructor(private listPlansService: ListPlansService) {}

  @Get()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: listPlansBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async list(
    @Query() query: { userId: string },
    @Body() input: Omit<ListPlansDto, 'loggedUserId'>
  ) {
    const result = await this.listPlansService.list({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return result.value;
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
