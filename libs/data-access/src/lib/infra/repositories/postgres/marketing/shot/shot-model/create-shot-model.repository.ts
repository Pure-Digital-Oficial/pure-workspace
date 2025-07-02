import {
  CreateShotModelDto,
  CreateShotModelRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../../application';
import { Inject } from '@nestjs/common';

export class CreateShotModelRepositoryImpl
  implements CreateShotModelRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async create(input: CreateShotModelDto): Promise<string> {
    const { body, loggedUserId, subject, title, attachment } = input;

    const createdShotModel = await this.prismaService['shot_model'].create({
      data: {
        body,
        subject,
        title,
        created_at: new Date(),
        user_id: loggedUserId,
        ...(attachment
          ? {
              image: attachment,
            }
          : {
              image: '',
            }),
      },
    });

    return createdShotModel?.id ?? '';
  }
}
