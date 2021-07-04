import { Module } from '@nestjs/common';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { PrismaService } from '../prisma/prisma.service';
import { EpisodesModel } from './episodes.model';

@Module({
  controllers: [EpisodesController],
  providers: [EpisodesService, PrismaService, EpisodesModel]
})
export class EpisodesModule {}
