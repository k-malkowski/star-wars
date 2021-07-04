import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CharactersModel } from './characters.model';
import { CreateCharacterDTO, UpdateCharacterDTO } from './characters.types';
import { Character } from '@prisma/client';
import { PlanetsService } from '../planets/planets.service';
import { EpisodesService } from '../episodes/episodes.service';

@Injectable()
export class CharactersService {
  constructor(private readonly charactersModel: CharactersModel, private readonly planetsService: PlanetsService, private readonly episodesService: EpisodesService) {}

  async createCharacter(characterData: CreateCharacterDTO): Promise<Character> {
    try {
      return await this.charactersModel.add(characterData);
    } catch ({ status, message }) {
      throw new HttpException(message, status);
    }
  }

  async characterExists(characterUuid: string): Promise<boolean> {
    try {
      return !!(await this.charactersModel.findOne({ uuid: characterUuid }))
    } catch ({ status, message }) {
      throw new HttpException(message, status);
    }
  }

  async addPlanetToCharacter(characterUuid: string, planetId: number): Promise<Character> {
    try {
      if (!(await this.characterExists(characterUuid))) {
        throw new NotFoundException('Character not found.')
      }
      if (!(await this.planetsService.planetExists(planetId))) {
        throw new NotFoundException('Planet not found.')
      }
      return await this.charactersModel.addPlanet(characterUuid, planetId);
    } catch ({ status, message }) {
      throw new HttpException(message, status);
    }
  }

  async addEpisodeToCharacter(characterUuid: string, episodesId: number): Promise<Character> {
    try {
      if (!(await this.characterExists(characterUuid))) {
        throw new NotFoundException('Character not found.')
      }
      if (!(await this.episodesService.episodeExists(episodesId))) {
        throw new NotFoundException('Episode not found.')
      }
      return await this.charactersModel.addEpisode(characterUuid, episodesId);
    } catch ({ status, message }) {
      throw new HttpException(message, status);
    }
  }

  async deleteCharacter(characterUuid: string): Promise<Character> {
    try {
      if (!(await this.characterExists(characterUuid))) {
        throw new NotFoundException('Character not found.')
      }
      return await this.charactersModel.delete(characterUuid);
    } catch ({ status, message }) {
      throw new HttpException(message, status);
    }
  }

  async getCharacter(characterUuid: string): Promise<Character> {
    try {
      if (!(await this.characterExists(characterUuid))) {
        throw new NotFoundException('Character not found.')
      }
      return this.charactersModel.findOne({ uuid: characterUuid });
    } catch ({ status, message }) {
      throw new HttpException(message, status);
    }
  }

  async getCharacters(): Promise<Character[] | []> {
    try {
      return this.charactersModel.findMany({});
    } catch ({ status, message }) {
      throw new HttpException(message, status);
    }
  }

  async updateCharacter(characterData: UpdateCharacterDTO, characterUuid: string): Promise<Character> {
    try {
       if (!(await this.characterExists(characterUuid))) {
         throw new NotFoundException('Character not found.')
       }
       return await this.charactersModel.update(characterData, characterUuid);
    } catch ({ status, message }) {
      throw new HttpException(message, status);
    }
  }
}
