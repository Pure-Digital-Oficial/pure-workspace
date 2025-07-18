import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EditShotDto, EditShotRepository } from '@pure-workspace/domain';

export class EditShotRepositoryImpl implements EditShotRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async edit(input: EditShotDto): Promise<string> {
    const { id, title, modelId, scheduleDate } = input;

    const editedShot = await this.prismaService['shot'].update({
      where: {
        id,
      },
      data: {
        model_id: modelId,
        title,
        updated_at: new Date(),
        ...(scheduleDate
          ? {
              schedule_date: scheduleDate,
              scheduled: true,
            }
          : {
              scheduled: false,
            }),
      },
    });

    return editedShot?.id ?? '';
  }
}
