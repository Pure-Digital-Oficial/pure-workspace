import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CreateTriggerDto,
  CreateTriggerRepository,
  TriggerType,
} from '@pure-workspace/domain';

export class CreateTriggerRepositoryImpl implements CreateTriggerRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async create({
    body: { name, content, description, type },
    loggedUserId,
  }: CreateTriggerDto): Promise<string> {
    const triggerCreated = await this.prismaService['trigger'].create({
      data: {
        name,
        content,
        description,
        type: type as TriggerType,
        user_id: loggedUserId,
      },
    });

    return triggerCreated?.id ?? '';
  }
}
