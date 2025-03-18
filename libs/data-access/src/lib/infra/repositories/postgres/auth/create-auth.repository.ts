import { Inject } from '@nestjs/common';
import { CreateAuthDto, CreateAuthRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class CreateAuthRepositoryImpl implements CreateAuthRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
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
