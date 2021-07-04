import { Body, Controller, Get, Post } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDTO } from './episodes.types';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('episodes')
@Controller('api/v1/episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @ApiCreatedResponse({
    description: 'The episode has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request (validation error?).',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('')
  async createEpisode(@Body() episodeData: CreateEpisodeDTO) {
    return await this.episodesService.createEpisode(episodeData);
  }

  @ApiOkResponse({
    description: 'All episodes has been successfully returned.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('')
  async getAllEpisodes() {
    return await this.episodesService.getAllEpisodes();
  }
}
