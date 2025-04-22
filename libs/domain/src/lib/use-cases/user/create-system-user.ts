import { Inject } from "@nestjs/common";
import { Either, left, right, UseCase } from "../../bases";
import { CreateSystemUserDto } from "../../dtos";
import { EntityAlreadyExists, EntityNotCreated, EntityNotExists, InsufficientCharacters } from "../../errors";
import { CreateSystemUserRepository, FindAppByIdRepository, FindUserByNicknameRepository } from "../../repositories";

export class CreateSystemUser
  implements UseCase<CreateSystemUserDto, Either<InsufficientCharacters, string>>
{
  constructor(
    @Inject("FindAppByIdRepository")
    private findAppByIdRepository: FindAppByIdRepository,
    @Inject("FindUserByNicknameRepository")
    private findUserByNicknameRepository: FindUserByNicknameRepository,
    @Inject('CreateSystemUserRepository')
    private createSystemUserRepository: CreateSystemUserRepository
  ) {}
  async execute(
    input: CreateSystemUserDto
  ): Promise<Either<InsufficientCharacters, string>> {
    const {
      appId,
      body: { name, nickname },
    } = input;
    if (Object.keys(name).length < 1 || name.length < 3) {
      return left(new InsufficientCharacters("name"));
    }
    if (Object.keys(nickname).length < 1 || nickname.length < 3) {
      return left(new InsufficientCharacters("nickName"));
    }

    if (Object.keys(appId).length < 1) {
      return left(new InsufficientCharacters("app id"));
    }

    const filteredAppId = await this.findAppByIdRepository.find(appId);
    if (
      Object.keys(filteredAppId).length < 1 ||
      Object.keys(filteredAppId?.id).length < 1
    ) {
      return left(new EntityNotExists("app ID"));
    }

    const filteredUser = await this.findUserByNicknameRepository.find(nickname);

    if (Object.keys(filteredUser?.id ?? filteredUser).length > 0) {
      return left(new EntityAlreadyExists(nickname));
    }

    const createdSystemUser = await this.createSystemUserRepository.create(input);

    if (!createdSystemUser) {
      return left(new EntityNotCreated("system user"));
    }

    return right(createdSystemUser);
  }
}
