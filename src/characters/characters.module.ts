import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { PrismaService } from '../prisma/prisma.service';
import { CharactersModel } from './characters.model';
import { PlanetsService } from '../planets/planets.service';
import { EpisodesService } from '../episodes/episodes.service';
import { PlanetsModel } from '../planets/planets.model';
import { EpisodesModel } from '../episodes/episodes.model';

@Module({
  controllers: [CharactersController],
  providers: [CharactersService, PrismaService, CharactersModel, PlanetsService, PlanetsModel, EpisodesService, EpisodesModel]
})
export class CharactersModule {}
