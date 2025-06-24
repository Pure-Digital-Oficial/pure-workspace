import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CreateUniqueTargetDto,
  CreateUniqueTargetRepository,
} from '@pure-workspace/domain';

export class CreateUniqueTargetRepositoryImpl
  implements CreateUniqueTargetRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async create({
    content,
    triggerId,
    loggedUserId,
  }: CreateUniqueTargetDto): Promise<string> {
    const targetCreated = await this.prismaService['target_reference'].create({
      data: {
        content,
        user_id: loggedUserId,
        trigger_id: triggerId,
      },
    });

    return targetCreated?.id ?? '';
  }
}
