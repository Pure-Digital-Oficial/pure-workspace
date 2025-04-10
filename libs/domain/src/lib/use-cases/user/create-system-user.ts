import { Inject } from "@nestjs/common";
import { Either, left, right, UseCase } from "../../bases";
import { CreateSystemUserDto } from "../../dtos";
import { EntityAlreadyExists, EntityNotAccess, EntityNotCreated, EntityNotExists, InsufficientCharacters } from "../../errors";
import { CreateSystemUserRepository, FindAppByIdRepository, FindUserByIdRepository, FindUserByNicknameRepository } from "../../repositories";

export class CreateSystemUser
  implements UseCase<CreateSystemUserDto, Either<InsufficientCharacters, string>>
{
  constructor(
    @Inject("FindAppByIdRepository")
    private findAppByIdRepository: FindAppByIdRepository,
    @Inject("FindUserByIdRepository")
    private FindUserByIdRepository: FindUserByIdRepository,
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
      loggedUserId,
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

    if (Object.keys(loggedUserId).length < 1) {
      return left(new InsufficientCharacters("logged user ID"));
    }

    const filteredLoggedUserId = await this.FindUserByIdRepository.find(loggedUserId);

    if (Object.keys(filteredLoggedUserId).length < 1 || filteredLoggedUserId?.id.length < 1) {
      return left(new EntityNotExists("logged user ID"));
    }

    if (filteredLoggedUserId?.type !== "ADMIN") {
      return left(new EntityNotAccess("user"));
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
