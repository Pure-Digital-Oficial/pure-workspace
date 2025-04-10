import { CreateSystemUserDto } from "@/dtos";
import { CreateSystemUserRepository, FindAppByIdRepository, FindUserByIdRepository, FindUserByNicknameRepository } from "@/repositories";
import { AppMock, UserMock } from "@/test/entities";
import { CreateSystemUserRepositoryMock, FindAppByIdRepositoryMock, FindUserByIdRepositoryMock, FindUserByNickNameRepositoryMock } from "@/test/repositories";
import { CreateSystemUser } from "@/use-cases";

interface SutTypes {
  sut: CreateSystemUser;
  createSystemUserDto: CreateSystemUserDto;
  findAppByIdRepository: FindAppByIdRepository;
  findUserByIdRepository: FindUserByIdRepository;
  findUserByNicknameRepository: FindUserByNicknameRepository;
  createSystemUserRepository: CreateSystemUserRepository;
}

const makeSut = (): SutTypes => {
  const findAppByIdRepository = new FindAppByIdRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findUserByNicknameRepository = new FindUserByNickNameRepositoryMock();
  const createSystemUserRepository = new CreateSystemUserRepositoryMock();

  const createSystemUserDto: CreateSystemUserDto = {
    appId: AppMock.id,
    loggedUserId: UserMock.id,
    loggedUserType: UserMock.type,
    body: {
      name: UserMock.name,
      nickname: UserMock.nickname,
    },
  };

  const sut = new CreateSystemUser(
    findAppByIdRepository,
    findUserByIdRepository,
    findUserByNicknameRepository,
    createSystemUserRepository
  );

  return {
    sut,
    createSystemUserDto,
    findAppByIdRepository,
    findUserByIdRepository,
    findUserByNicknameRepository,
    createSystemUserRepository,
  };
};

describe('CreateSystemUser', () => {
  it('should return User ID when pass correct CreateSystemUserDto object', async () => {
    const { createSystemUserDto, sut } = makeSut();

    const result = await sut.execute(createSystemUserDto);

    expect(result.isLeft).toBeFalsy();
    expect(result.isRight).toBeTruthy();
    expect(result.value).toStrictEqual(UserMock.id);
  });

});
