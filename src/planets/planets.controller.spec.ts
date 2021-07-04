import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PlanetsModel } from './planets.model';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const dateMock = new Date('01.01.2020');

const createPlanetMock = (name = 'Alderaan') => {
  return {
    name
  }
}

const createdPlanetMock = (id = 1, name = 'Alderaan', createdAt = dateMock, updatedAt = dateMock) => {
  return {
    id,
    name,
    createdAt,
    updatedAt
  }
}

describe('PlanetsController', () => {
  let prismaService: PrismaService;
  let planetsModel: PlanetsModel;
  let planetsService: PlanetsService;
  let planetsController: PlanetsController;

  beforeEach(() => {
    prismaService = new PrismaService();
    planetsModel = new PlanetsModel(prismaService);
    planetsService = new PlanetsService(planetsModel);
    planetsController = new PlanetsController(planetsService);
  })
  describe('Create planet', () => {
    it('should create and return planet', async () => {
      const planet = createdPlanetMock();
      jest.spyOn(planetsModel, 'add').mockImplementation(async () => planet)
      expect(await planetsController.createPlanet(createPlanetMock())).toStrictEqual(planet);
    })
  })
  describe('Get planets', () => {
    it('should return all planets', async () => {
      const planet = createdPlanetMock();
      jest.spyOn(planetsModel, 'findMany').mockImplementation(async () => [planet])
      expect(await planetsController.getAllPlanets()).toStrictEqual([planet]);
    })
  })
  describe('Get planet', () => {
    it('should return planet', async () => {
      const planet = createdPlanetMock();
      jest.spyOn(planetsModel, 'findOne').mockImplementation(async () => planet);
      expect(await planetsController.getPlanet({ planetId: 1 })).toStrictEqual(planet);
    })
    it('should return 404 when planet not found', async (done) => {
      jest.spyOn(planetsModel, 'findOne').mockImplementation(async () => null);
      try {
        await planetsController.getPlanet({ planetId: 1});
      } catch (err) {
        expect(err.status).toBe(404)
        expect(err.message).toBe('Planet not found.')
        done();
      }
    })
  })
  describe('Delete planet', () => {
    it('shoud delete planet', async () => {
      const planet = createdPlanetMock();
      jest.spyOn(planetsService, 'planetExists').mockImplementation(async () => true);
      jest.spyOn(planetsModel, 'delete').mockImplementation(async () => planet);
      expect(await planetsController.deletePlanet({ planetId: 1 })).toStrictEqual(planet);
    })
    it('should return 404 when planet not found', async (done) => {
      jest.spyOn(planetsModel, 'findOne').mockImplementation(async () => null);
      try {
        await planetsController.deletePlanet({ planetId: 1});
      } catch (err) {
        expect(err.status).toBe(404)
        expect(err.message).toBe('Planet not found.')
        done();
      }
    })
  })
})
