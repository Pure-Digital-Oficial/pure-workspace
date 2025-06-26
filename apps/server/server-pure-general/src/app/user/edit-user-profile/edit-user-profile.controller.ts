import {
  Body,
  Controller,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  editUserProfileBodySchema,
  EditUserProfileDto,
  ErrorMessageResult,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { EditUserProfileService } from './edit-user-profile.service';
import { ZodValidationPipe } from '../../pipes';
import { JwtAuthGuard } from '@pure-workspace/data-access';

@Controller('edit-user-profile')
export class EditUserProfileController {
  constructor(
    private readonly editUserProfileService: EditUserProfileService
  ) {}

  @Put()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: editUserProfileBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async edit(
    @Query() query: { userId: string },
    @Body() input: Omit<EditUserProfileDto, 'loggedUserId'>
  ) {
    const result = await this.editUserProfileService.edit({
      email: input?.email ?? '',
      id: input?.id ?? '',
      loggedUserId: query?.userId ?? '',
      name: input?.name ?? '',
      birthDate: input?.birthDate ?? ('' as unknown as Date),
      picture: input?.picture ?? '',
    });

    if (result.isRight()) return { userId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
