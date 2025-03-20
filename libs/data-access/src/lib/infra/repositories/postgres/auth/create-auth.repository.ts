import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateAuthDto, CreateAuthRepository } from '@pure-workspace/domain';

export class CreateAuthRepositoryImpl implements CreateAuthRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async create(input: CreateAuthDto): Promise<string> {
    const { email, password, userId } = input;

    const createdAuth = await this.prismaService['auth'].create({
      data: {
        email,
        password,
        user_id: userId,
      },
    });

    return createdAuth?.id ?? '';
  }
}
