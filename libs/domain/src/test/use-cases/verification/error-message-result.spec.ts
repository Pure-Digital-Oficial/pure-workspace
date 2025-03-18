import { BadRequestException } from '@nestjs/common';
import { ErrorMessageResult } from '@/utils';

const makeSut = (name: string, message: string) => {
  const sut = ErrorMessageResult(name, message);

  return {
    sut,
  };
};

describe('ErrorMessageResult', () => {
  it('Should return BadRequestException when pass name and message', async () => {
    const { sut } = makeSut('any_name', 'any_message');

    await expect(sut).rejects.toThrow(BadRequestException);
  });
});
