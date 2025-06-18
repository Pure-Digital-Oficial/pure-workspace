import { Inject } from '@nestjs/common';
// import { PrismaService } from 'nestjs-prisma';
import { PrismaGeneralService } from '../../../../../application';
import {
  CreateTriggerDto,
  CreateTriggerRepository,
  TriggerType,
} from '@pure-workspace/domain';

export class CreateTriggerRepositoryImpl implements CreateTriggerRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async create({
    name,
    content,
    description,
    loggedUserId,
    type,
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
