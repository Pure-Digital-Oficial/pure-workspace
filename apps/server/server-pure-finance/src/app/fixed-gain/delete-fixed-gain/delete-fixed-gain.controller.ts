import {
  Controller,
  Delete,
  Param,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ErrorMessageResult, userIdQuerySchema } from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { ZodValidationPipe } from '../../pipes';
import { DeleteFixedGainService } from './delete-fixed-gain.service';

@Controller('fixed-gain/delete-fixed-gain')
export class DeleteFixedGainController {
  constructor(private deleteFixedGainService: DeleteFixedGainService) {}

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
    })
  )
  async delete(@Param('id') id: string, @Query() query: { userId: string }) {
    const result = await this.deleteFixedGainService.delete({
      loggedUserId: query?.userId ?? '',
      id,
    });

    if (result.isRight()) return { fixed_gain_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
