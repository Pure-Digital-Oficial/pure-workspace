import { RegisterHistoryShotDto } from '../../../../dtos';

export interface RegisterHistoryShotRepository {
  register(input: RegisterHistoryShotDto): Promise<string>;
}
