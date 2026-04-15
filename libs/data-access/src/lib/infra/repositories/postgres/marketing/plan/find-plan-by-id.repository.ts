import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  FindPlanByIdRepository,
  PlanResponseDto,
} from '@pure-workspace/domain';

export class FindPlanByIdRepositoryImpl implements FindPlanByIdRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(id: string): Promise<PlanResponseDto> {
    try {
      const findedPlan = await this.prismaService['plan'].findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          title: true,
          description: true,
          amount: true,
          frequency: true,
          status: true,
          created_at: true,
          updated_at: true,
          user: {
            select: {
              nickname: true,
            },
          },
        },
      });

      return {
        id: findedPlan?.id ?? '',
        title: findedPlan?.title ?? '',
        amount: findedPlan?.amount ?? 0,
        frequency: findedPlan?.frequency ?? '',
        description: findedPlan?.description ?? '',
        createdAt: findedPlan?.created_at ?? new Date(),
        updatedAt: findedPlan?.updated_at ?? new Date(),
        createdBy: findedPlan?.user.nickname ?? '',
        status: findedPlan?.status ?? '',
      };
    } catch (error) {
      console.error('Error finding plan by id:', error);

      return {
        id: '',
        title: '',
        amount: 0,
        frequency: '',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: '',
        status: '',
      };
    }
  }
}
