import { FindUserInShotDto } from '../../../dtos';

export interface FindUserInShotRepository {
    find(input: FindUserInShotDto): Promise<string>;
}