import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDTO, DeleteEpisodeDTO, GetEpisodeDTO } from './episodes.types';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
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

  @ApiOkResponse({
    description: 'The episode has been successfully returned.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request (validation error?).',
  })
  @ApiNotFoundResponse({
    description: 'Episode not found.'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':episodeId')
  async getEpisode(@Param() params: GetEpisodeDTO) {
    return await this.episodesService.getEpisode(Number(params.episodeId));
  }

  @ApiOkResponse({
    description: 'The episode has been successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request (validation error?).',
  })
  @ApiNotFoundResponse({
    description: 'Episode not found.'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Delete(':episodeId')
  async deleteEpisode(@Param() params: DeleteEpisodeDTO) {
    return await this.episodesService.deleteEpisode(Number(params.episodeId));
  }
}
