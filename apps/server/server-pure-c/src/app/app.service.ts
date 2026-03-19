import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return {
      message: 'Do we really have to strive so hard to achieve freedom?',
    };
  }
}
