export interface UserPrismaResponseDto {
  id: string;
  name: string;
  nickname: string;
  type: string;
  picture: string;
  data: {
    birth_date: Date | null;
  }[];
  auth: {
    email: string;
    id: string;
  }[];
}
