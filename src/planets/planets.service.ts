import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PlanetsModel } from './planets.model';
import { Planet } from '@prisma/client';
import { CreatePlanetDTO, UpdatePlanetDTO } from './planets.types';

@Injectable()
export class PlanetsService {
  constructor(private readonly planetsModel: PlanetsModel) {}

  async createPlanet(planetData: CreatePlanetDTO): Promise<Planet> {
    try {
      return await this.planetsModel.add(planetData);
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }

  async getAllPlanets(): Promise<Planet[] | []> {
    try {
      return await this.planetsModel.findMany({});
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }

  async planetExists(planetId: number): Promise<boolean> {
    try {
      return !!(await this.planetsModel.findOne({ id: planetId }))
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }

  async getPlanet(planetId: number): Promise<Planet> {
    try {
      if (!(await this.planetExists(planetId))) {
        throw new NotFoundException('Planet not found.');
      }
      return await this.planetsModel.findOne({ id: planetId })
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }

  async deletePlanet(planetId: number): Promise<Planet> {
    try {
      if (!(await this.planetExists(planetId))) {
        throw new NotFoundException('Planet not found.');
      }
      return await this.planetsModel.delete(planetId);
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }

  async updatePlanet(planetData: UpdatePlanetDTO, planetId: number): Promise<Planet> {
    try {
      if (!(await this.planetExists(planetId))) {
        throw new NotFoundException('Planet not found.');
      }
      return await this.planetsModel.update(planetData, planetId);
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }
}
