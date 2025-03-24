import { Inject } from "@nestjs/common";
import { Either, left, right, UseCase } from "../../bases";
import { CreateTimeClockDto } from "../../dtos";
import { EntityNotCreated, EntityNotEmpty } from "../../errors";
import { CreateTimeClockRepository } from "../../repositories";

export class CreateTimeClock implements UseCase<CreateTimeClockDto, Either<EntityNotEmpty, string>> {
  constructor(
    @Inject('CreateTimeClockRepository')
    private createTimeClockRepository: CreateTimeClockRepository
  ){}

  async execute(
    input: CreateTimeClockDto
  ): Promise<Either<EntityNotEmpty, string>> {

    const {
      user,
      date,
      startTime,
      endTime,
      modality,
      Features,
      Project,
      completed
    } = input;

    if(Object.keys(user).length === 0) {
      return left(new EntityNotEmpty('user'));
    }

    if(Object.keys(date).length === 0) {
      return left(new EntityNotEmpty('date'));
    }

    if(Object.keys(startTime).length === 0) {
      return left(new EntityNotEmpty('startTime'));
    }

    if(Object.keys(endTime).length === 0) {
      return left(new EntityNotEmpty('endTime'));
    }

    if(Object.keys(modality).length === 0) {
      return left(new EntityNotEmpty('modality'));
    }

    if(Object.keys(Features).length === 0) {
      return left(new EntityNotEmpty('Features'));
    }

    if(Object.keys(Project).length === 0) {
      return left(new EntityNotEmpty('Project'));
    }

    if(Object.keys(completed).length === 0) {
      return left(new EntityNotEmpty('completed'));
    }

    const result = await this.createTimeClockRepository.create(input);

  if(Object.keys(result).length === 0) {
    return left(new EntityNotCreated('time-clock'));
  }

    return right(result);
  }
}
