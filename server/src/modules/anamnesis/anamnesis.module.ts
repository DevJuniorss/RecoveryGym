import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { AnamnesisController } from './controllers/anamnesis.controller';
import { AnamnesisService } from './services/anamnesis.service';
import { AnamnesisRepository } from './repositories/anamnesis.repository';

@Module({
  controllers: [AnamnesisController],
  providers: [AnamnesisService, PrismaService, AnamnesisRepository],
})
export class AnamnesisModule {}
