import { CreateTimeClockDto } from "../../dtos";

export interface CreateTimeClockRepository {
  create(input: CreateTimeClockDto): Promise<string>;
}
