import { Module } from '@nestjs/common';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { PrismaService } from '../prisma/prisma.service';
import { PlanetsModel } from './planets.model';

@Module({
  controllers: [PlanetsController],
  providers: [PlanetsService, PrismaService, PlanetsModel]
})
export class PlanetsModule {}
