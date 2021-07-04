import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Planet } from '@prisma/client';

@Injectable()
export class PlanetsModel {
  constructor(private prisma: PrismaService) {}

  async add(planetData: Prisma.PlanetCreateInput): Promise<Planet> {
    try {
      return await this.prisma.planet.create({
        data: planetData
      })
    } catch (e) {
      throw e;
    }
  }

  async update(planetFields: Prisma.PlanetUpdateInput, planetId: number): Promise<Planet> {
    try {
      return await this.prisma.planet.update({
        where: {
          id: planetId,
        },
        data: planetFields
      })
    } catch (e) {
      throw e;
    }
  }

  async delete(planetId: number): Promise<Planet> {
    try {
      return await this.prisma.planet.delete({
        where: {
          id: planetId
        }
      })
    } catch (e) {
      throw e;
    }
  }

  async findOne(planetFields: Prisma.PlanetWhereUniqueInput): Promise<Planet> {
    try {
      return await this.prisma.planet.findUnique({
        where: planetFields
      })
    } catch (e) {
      throw e;
    }
  }

  async findMany(planetFields: Prisma.PlanetWhereInput): Promise<Planet[]> {
    try {
      return await this.prisma.planet.findMany({
        where: planetFields
      })
    } catch (e) {
      throw e;
    }
  }
}
