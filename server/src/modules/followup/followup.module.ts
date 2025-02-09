import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { FollowUpController } from './controllers/followup.controller';
import { FollowUpService } from './services/followup.service';
import { FollowUpRepository } from './repositories/followup.repository';

@Module({
  controllers: [FollowUpController],
  providers: [FollowUpService, PrismaService, FollowUpRepository],
})
export class FollowUpModule {}
