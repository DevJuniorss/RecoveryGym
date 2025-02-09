import { Controller, Get } from '@nestjs/common';
import { isPublic } from './common/decorators/is-public.decorator';

@Controller('')
export class AppController {
  @isPublic()
  @Get()
  getTest() {
    return 'Server is running';
  }
}
