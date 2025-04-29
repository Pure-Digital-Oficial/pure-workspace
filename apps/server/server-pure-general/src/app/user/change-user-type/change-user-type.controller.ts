import { Body, Controller, Param, Put, UsePipes } from '@nestjs/common';
import {
  changeUserTypeBodySchema,
  ErrorMessageResult,
  idInParamSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { ChangeUserTypeService } from './change-user-type.service';

@Controller('change-user-type')
export class ChangeUserTypeController {
  constructor(private readonly changeUserTypeService: ChangeUserTypeService) {}

  @Put(':id')
  @UsePipes(
    new ZodValidationPipe({
      param: idInParamSchema,
      body: changeUserTypeBodySchema,
    })
  )
  //@UseGuards(JwtAdminGuard)
  async change(
    @Body() input: { type: string },
    @Param() param: { id: string }
  ) {
    const result = await this.changeUserTypeService.change({
      type: input?.type ?? '',
      userId: param?.id ?? '',
    });

    if (result.isRight()) return { userId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
