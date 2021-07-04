import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { PlanetsModule } from './planets/planets.module';

@Module({
  imports: [EpisodesModule, PlanetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
