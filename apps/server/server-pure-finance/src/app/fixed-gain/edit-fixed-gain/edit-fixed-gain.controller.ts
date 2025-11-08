import {
  Body,
  Controller,
  Param,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  EditFixedGainDto,
  ErrorMessageResult,
  fixedGainBodySchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { EditFixedGainService } from './edit-fixed-gain.service';
import { ZodValidationPipe } from '../../pipes';

@Controller('fixed-gain/edit-fixed-gain')
export class EditFixedGainController {
  constructor(private editFixedGainService: EditFixedGainService) {}

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: fixedGainBodySchema,
    })
  )
  async edit(
    @Param('id') id: string,
    @Query() query: { userId: string },
    @Body() input: Omit<EditFixedGainDto, 'loggedUserId' | 'id'>
  ) {
    const result = await this.editFixedGainService.edit({
      ...input,
      loggedUserId: query?.userId ?? '',
      id,
    });

    if (result.isRight()) return { fixed_gain_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
