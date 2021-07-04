import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { PlanetsModule } from './planets/planets.module';
import { CharactersModule } from './characters/characters.module';

@Module({
  imports: [EpisodesModule, PlanetsModule, CharactersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
