import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CharactersModel } from './characters.model';
import { PlanetsModel } from '../planets/planets.model';
import { PlanetsService } from '../planets/planets.service';
import { EpisodesModel } from '../episodes/episodes.model';
import { EpisodesService } from '../episodes/episodes.service';

const dateMock = new Date('01.01.2020');

const createCharacterMock = (name = 'Luke Skywalker') => {
  return {
    name
  }
}

const createdCharacterMock = (uuid = 'mocked', name = 'Luke Skywalker', createdAt = dateMock, updatedAt = dateMock, planetId = 1) => {
  return {
    uuid,
    name,
    createdAt,
    updatedAt, planetId
  }
}

describe('PlanetsController', () => {
  let prismaService: PrismaService;
  let charactersModel: CharactersModel;
  let charactersService: CharactersService;
  let charactersController: CharactersController;
  let planetsModel: PlanetsModel;
  let planetsService: PlanetsService;
  let episodesModel: EpisodesModel;
  let episodesService: EpisodesService;
  beforeEach(() => {
    prismaService = new PrismaService();
    planetsModel = new PlanetsModel(prismaService);
    planetsService = new PlanetsService(planetsModel);
    episodesModel = new EpisodesModel(prismaService);
    episodesService = new EpisodesService(episodesModel);
    charactersModel = new CharactersModel(prismaService);
    charactersService = new CharactersService(charactersModel, planetsService, episodesService);
    charactersController = new CharactersController(charactersService);
  })
  describe('Create character', () => {
    it('should create and return character', async () => {
      const character = createdCharacterMock();
      jest.spyOn(charactersModel, 'add').mockImplementation(async () => character)
      expect(await charactersController.createCharacter(createCharacterMock())).toStrictEqual(character);
    })
  })
  describe('Get characters', () => {
    it('should return all characters', async () => {
      const characterFromDb = {
        uuid: 'mocked',
        name: 'Luke Skywalker',
        createdAt: dateMock,
        updatedAt: dateMock,
        planet: {
          name: 'Alderaan',
        },
        episodes: [
          { title: 'JEDI' }
        ]
      }
      const createdCharacter = {
        name: 'Luke Skywalker',
        planet: 'Alderaan',
        episodes: ['JEDI']
      };
      jest.spyOn(charactersModel, 'findMany').mockImplementation(async () => [characterFromDb])
      expect(await charactersController.getCharacters({ limit: 5, from: 0 })).toStrictEqual([createdCharacter]);
    })
  })
  describe('Get character', () => {
    it('should return character', async () => {
      const character = createdCharacterMock();
      jest.spyOn(charactersModel, 'findOne').mockImplementation(async () => character);
      expect(await charactersController.getCharacter({ characterUuid: 'mocked' })).toStrictEqual(character);
    })
    it('should return 404 when character not found', async (done) => {
      jest.spyOn(charactersModel, 'findOne').mockImplementation(async () => null);
      try {
        await charactersController.getCharacter({ characterUuid: 'mocked' })
      } catch (err) {
        expect(err.status).toBe(404)
        expect(err.message).toBe('Character not found.')
        done();
      }
    })
  })
  describe('Delete character', () => {
    it('should delete character', async () => {
      const character = createdCharacterMock();
      jest.spyOn(charactersService, 'characterExists').mockImplementation(async () => true);
      jest.spyOn(charactersModel, 'delete').mockImplementation(async () => character);
      expect(await charactersController.deleteCharacter({ characterUuid: 'mocked' })).toStrictEqual(character);
    })
    it('should return 404 when character not found', async (done) => {
      jest.spyOn(charactersModel, 'findOne').mockImplementation(async () => null);
      try {
        await charactersController.deleteCharacter({ characterUuid: 'mocked' })
      } catch (err) {
        expect(err.status).toBe(404)
        expect(err.message).toBe('Character not found.')
        done();
      }
    })
  })
})
