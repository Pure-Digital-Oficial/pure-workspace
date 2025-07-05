import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  EditShotModelDto,
  EditShotModelRepository,
} from '@pure-workspace/domain';

export class EditShotModelRepositoryImpl implements EditShotModelRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async edit(input: EditShotModelDto): Promise<string> {
    const { id, body, subject, title, attachment } = input;

    const editedShotModel = await this.prismaService['shot_model'].update({
      where: {
        id,
      },
      data: {
        body,
        subject,
        title,
        updated_at: new Date(),
        ...(attachment
          ? {
              image: attachment,
            }
          : {
              image: '',
            }),
      },
    });

    return editedShotModel?.id ?? '';
  }
}
