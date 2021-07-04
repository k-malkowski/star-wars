import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CharactersService } from './characters.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags,
} from '@nestjs/swagger';
import {
  AddEpisodeToCharacterDTO,
  AddPlanetToCharacterDTO,
  CreateCharacterDTO, DeleteCharacterDTO, GetCharacterDTO,
} from './characters.types';
import { DeletePlanetDTO, GetPlanetDTO } from '../planets/planets.types';

@ApiTags('characters')
@Controller('api/v1/characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @ApiCreatedResponse({
    description: 'The character has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request (validation error?).',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('')
  async createCharacter(@Body() characterData: CreateCharacterDTO) {
    return await this.charactersService.createCharacter(characterData);
  }

  @ApiOkResponse({
    description: 'The resource updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request (validation error?).',
  })
  @ApiNotFoundResponse({
    description: 'Character or planet not found.'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Patch(':characterUuid/planetId/:planetId')
  async addPlanetToCharacter(@Param() params: AddPlanetToCharacterDTO) {
    return await this.charactersService.addPlanetToCharacter(params.characterUuid, Number(params.planetId));
  }

  @ApiOkResponse({
    description: 'The resource updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request (validation error?).',
  })
  @ApiNotFoundResponse({
    description: 'Character or episode not found.'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Patch(':characterUuid/episodeId/:episodeId')
  async addEpisodeToCharacter(@Param() params: AddEpisodeToCharacterDTO) {
    return await this.charactersService.addEpisodeToCharacter(params.characterUuid, Number(params.episodeId));
  }

  @ApiOkResponse({
    description: 'The character has been successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request (validation error?).',
  })
  @ApiNotFoundResponse({
    description: 'Character not found.'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Delete(':characterUuid')
  async deleteCharacter(@Param() params: DeleteCharacterDTO) {
    return await this.charactersService.deleteCharacter(params.characterUuid);
  }

  @ApiOkResponse({
    description: 'The character has been successfully returned.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request (validation error?).',
  })
  @ApiNotFoundResponse({
    description: 'Character not found.'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':characterUuid')
  async getCharacter(@Param() params: GetCharacterDTO) {
    return await this.charactersService.getCharacter(params.characterUuid);
  }

  @ApiOkResponse({
    description: 'Characters has been successfully returned.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('')
  async getCharacters() {
    return await this.charactersService.getCharacters();
  }
}
