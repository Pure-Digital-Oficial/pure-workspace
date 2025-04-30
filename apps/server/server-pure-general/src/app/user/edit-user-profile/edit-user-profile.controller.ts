import { Body, Controller, Put, Query } from '@nestjs/common';
import { EditUserProfileDto, ErrorMessageResult } from '@pure-workspace/domain';
import { EditUserProfileService } from './edit-user-profile.service';

@Controller('edit-user-profile')
export class EditUserProfileController {
  constructor(
    private readonly editUserProfileService: EditUserProfileService
  ) {}

  @Put()
  //@UsePipes(new ZodValidationPipe({ body: editUserBodySchema }))
  //@UseGuards(JwtAdminGuard)
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
