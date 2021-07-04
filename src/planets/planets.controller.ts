import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import {
  CreatePlanetDTO,
  DeletePlanetDTO,
  GetPlanetDTO, UpdatePlanetDTO,
  UpdatePlanetParamDTO,
} from './planets.types';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateCharacterDTO, UpdateCharacterParamDTO } from '../characters/characters.types';

@ApiTags('planets')
@Controller('api/v1/planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @ApiCreatedResponse({
    description: 'The planet has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request (validation error?).',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('')
  async createPlanet(@Body() planetData: CreatePlanetDTO) {
    return await this.planetsService.createPlanet(planetData);
  }

  @ApiOkResponse({
    description: 'All planets has been successfully returned.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('')
  async getAllPlanets() {
    return await this.planetsService.getAllPlanets();
  }

  @ApiOkResponse({
    description: 'The planet has been successfully returned.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request (validation error?).',
  })
  @ApiNotFoundResponse({
    description: 'Planet not found.'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':planetId')
  async getPlanet(@Param() params: GetPlanetDTO) {
    return await this.planetsService.getPlanet(Number(params.planetId));
  }

  @ApiOkResponse({
    description: 'The planet has been successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request (validation error?).',
  })
  @ApiNotFoundResponse({
    description: 'Planet not found.'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Delete(':planetId')
  async deletePlanet(@Param() params: DeletePlanetDTO) {
    return await this.planetsService.deletePlanet(Number(params.planetId));
  }

  @ApiOkResponse({
    description: 'The resource updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request (validation error?).',
  })
  @ApiNotFoundResponse({
    description: 'Planet not found.'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Put(':planetId')
  async updatePlanet(@Param() params: UpdatePlanetParamDTO, @Body() planetData: UpdatePlanetDTO) {
    return await this.planetsService.updatePlanet(planetData, Number(params.planetId));
  }
}
